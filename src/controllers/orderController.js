const Order = require('../models/Order');
const User = require('../models/User');
const Plan = require('../models/Plan');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, country, planName } = req.body;

  try {
    const order = new Order({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      planName, // On stocke simplement le nom du plan fourni
      // Le prix et les crédits seront déterminés à la validation
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

    // On recherche le plan correspondant au nom stocké dans la commande
    const plan = await Plan.findOne({ name: order.planName });
    if (!plan) {
        // Ce cas est peu probable si la logique de création est correcte, mais c'est une sécurité
        return res.status(404).json({ message: `Le plan '${order.planName}' associé à cette commande est introuvable.` });
    }

    // Vérifier si un utilisateur avec cet email existe déjà
    let user = await User.findOne({ email: order.email });

    if (user) {
      // Si l'utilisateur existe, on met à jour ses crédits et son plan
      user.creditsRemaining += order.credits;
      user.activePlanId = plan._id; // On utilise l'ID du plan trouvé
      user.orders.push(order._id);
    } else {
      // Sinon, on crée un nouvel utilisateur
      user = new User({
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phoneNumber: order.phoneNumber,
        country: order.country,
        status: 'active',
        activePlanId: plan._id, // On utilise l'ID du plan trouvé
        creditsRemaining: order.credits, // On utilise les crédits de la commande
        orders: [order._id],
      });
    }

    await user.save();

    // Mettre à jour la commande avec les informations du plan et le statut
    order.credits = plan.credits;
    order.amount = plan.price;
    order.status = 'validée';
    order.validatedAt = Date.now();
    order.user = user._id; // Lier la commande à l'utilisateur créé/mis à jour
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
