// Importation des modules nécessaires de Mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       required:
 *         - theme
 *         - category
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré du template.
 *         theme:
 *           type: string
 *           description: "Le thème général du template (ex: Beauté, Marketing)."
 *         category:
 *           type: string
 *           description: "La catégorie spécifique du template (ex: Manicure, Social Media)."
 *         imageUrl:
 *           type: string
 *           description: L'URL de l'image du template.
 *         ratio:
 *           type: string
 *           description: "Le ratio de l'image (ex: \"1:1\", \"16:9\")."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Une liste de mots-clés pour la recherche.
 *         description:
 *           type: string
 *           description: Une description optionnelle du template.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création du template.
 *       example:
 *         theme: Beauté
 *         category: Manicure
 *         imageUrl: https://example.com/image.png
 *         ratio: "1:1"
 *         tags: ["nailart", "beauty", "salon"]
 *         description: Un template élégant pour les salons de manucure.
 */

// Définition du schéma pour le modèle Template
const TemplateSchema = new Schema({
  // Thème du template, obligatoire
  theme: {
    type: String,
    required: true,
  },
  // Catégorie du template, obligatoire
  category: {
    type: String,
    required: true,
  },
  // URL de l'image du template, obligatoire
  imageUrl: {
    type: String,
    required: true,
  },
  // Ratio de l'image (ex: "1:1", "16:9")
  ratio: {
    type: String,
  },
  // Mots-clés associés au template
  tags: {
    type: [String],
  },
  // Description du template, optionnelle
  description: {
    type: String,
  },
  // Date de création du template, par défaut la date actuelle
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Création et exportation du modèle Template à partir du schéma
module.exports = mongoose.model('Template', TemplateSchema);
