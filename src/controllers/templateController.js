const Template = require('../models/Template');

// @desc    Créer un nouveau template
// @route   POST /api/templates
// @access  Private/Admin
exports.createTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du template', error });
  }
};

// @desc    Récupérer tous les templates
// @route   GET /api/templates
// @access  Public
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer un template par son ID
// @route   GET /api/templates/:id
// @access  Public
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template non trouvé' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Mettre à jour un template
// @route   PUT /api/templates/:id
// @access  Private/Admin
exports.updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!template) {
      return res.status(404).json({ message: 'Template non trouvé' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du template', error });
  }
};

// @desc    Supprimer un template
// @route   DELETE /api/templates/:id
// @access  Private/Admin
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template non trouvé' });
    }
    res.status(200).json({ message: 'Template supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer les templates par thème
// @route   GET /api/templates/theme/:theme
// @access  Public
exports.getTemplatesByTheme = async (req, res) => {
  try {
    const templates = await Template.find({ theme: req.params.theme });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer les templates par catégorie
// @route   GET /api/templates/category/:category
// @access  Public
exports.getTemplatesByCategory = async (req, res) => {
  try {
    const templates = await Template.find({ category: req.params.category });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
