const User = require('../models/User');
const Template = require('../models/Template');

// @desc    Utiliser un template et déduire les crédits
// @route   POST /api/generations/use-template
// @access  Private
exports.useTemplate = async (req, res) => {
  const { userId, templateId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template non trouvé' });
    }

    // Le coût d'utilisation d'un template est maintenant fixé à 1 crédit
    const CREDITS_COST = 1;

    // Vérifier si l'utilisateur a suffisamment de crédits
    if (user.creditsRemaining < CREDITS_COST) {
      return res.status(400).json({ message: 'Crédits insuffisants' });
    }

    // Déduire le coût fixe
    user.creditsRemaining -= CREDITS_COST;
    await user.save();

    // Ici, vous pourriez ajouter la logique pour générer l'image/contenu final
    // Pour l'instant, nous confirmons simplement la déduction des crédits

    res.status(200).json({
      message: 'Template utilisé avec succès, crédits déduits.',
      creditsRemaining: user.creditsRemaining,
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
