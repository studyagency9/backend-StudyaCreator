const User = require('../models/User');
const Plan = require('../models/Plan');
const { v4: uuidv4 } = require('uuid');

// @desc    Pré-enregistrer un utilisateur
// @route   POST /api/users/pre-register
// @access  Public
exports.preRegisterUser = async (req, res) => {
  try {
    // Crée un nouvel utilisateur avec les valeurs par défaut pour un compte en attente
    const user = new User({
      ...req.body,
      status: 'pending',
      creditsRemaining: 0,
      activePlanId: null,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors du pré-enregistrement', error });
  }
};

// @desc    Activer le plan d'un utilisateur
// @route   PUT /api/users/:id/activate
// @access  Private // (Logique de paiement à ajouter)
exports.activateUserPlan = async (req, res) => {
  const { planId } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan non trouvé' });
    }

    // Génère un code d'activation unique
    const activationCode = uuidv4();

    // Met à jour l'utilisateur
    user.status = 'active';
    user.activePlanId = planId;
    user.creditsRemaining = plan.credits;
    user.activationCode = activationCode;

    await user.save();

    // Retourne le code d'activation pour que le frontend puisse le gérer
    res.status(200).json({ 
      message: 'Utilisateur activé avec succès',
      activationCode: user.activationCode 
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer tous les utilisateurs
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('activePlanId', 'name price');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer un utilisateur par son ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('activePlanId');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Supprimer un utilisateur
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
