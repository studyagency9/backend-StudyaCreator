const Plan = require('../models/Plan');

// @desc    Créer un nouveau plan
// @route   POST /api/plans
// @access  Private/Admin
exports.createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du plan', error });
  }
};

// @desc    Récupérer tous les plans
// @route   GET /api/plans
// @access  Public
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer un plan par son ID
// @route   GET /api/plans/:id
// @access  Public
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan non trouvé' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Mettre à jour un plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan non trouvé' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du plan', error });
  }
};

// @desc    Supprimer un plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan non trouvé' });
    }
    res.status(200).json({ message: 'Plan supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
