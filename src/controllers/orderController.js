const Order = require('../models/Order');
const User = require('../models/User');
const Plan = require('../models/Plan');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, country, planName } = req.body;

  try {
    // Trouver le plan par son nom (insensible à la casse)
    const plan = await Plan.findOne({ name: { $regex: new RegExp(`^${planName}$`, 'i') } });
    if (!plan) {
      return res.status(404).json({ message: `Le plan nommé '${planName}' est introuvable.` });
    }

    const order = new Order({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      plan: plan._id,
      credits: plan.credits,
      amount: plan.price,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Valider une commande et créer un utilisateur
// @route   PUT /api/orders/:id/validate
// @access  Private/Admin
exports.validateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    if (order.status === 'validée') {
      return res.status(400).json({ message: 'Cette commande a déjà été validée.' });
    }

    // Vérifier si un utilisateur avec cet email existe déjà
    let user = await User.findOne({ email: order.email });

    if (user) {
      // Si l'utilisateur existe, mettre à jour ses crédits et son plan
      user.creditsRemaining += order.credits;
      user.activePlanId = order.plan;
      user.orders.push(order._id);
    } else {
      // Sinon, créer un nouvel utilisateur
      user = new User({
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phoneNumber: order.phoneNumber,
        country: order.country,
        status: 'active',
        activePlanId: order.plan,
        creditsRemaining: order.credits,
        orders: [order._id],
      });
    }

    await user.save();

    // Mettre à jour la commande
    order.status = 'validée';
    order.validatedAt = Date.now();
    order.user = user._id; // Lier la commande au nouvel utilisateur
    await order.save();

    res.status(200).json({ message: 'Commande validée et utilisateur créé/mis à jour.', order, user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer toutes les commandes
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'firstName lastName email').populate('plan', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// @desc    Récupérer les commandes d'un utilisateur
// @route   GET /api/orders/user/:userId
// @access  Private
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('plan', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
