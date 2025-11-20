// Importation des modules nécessaires de Mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Plan:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - credits
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré du plan.
 *         name:
 *           type: string
 *           description: Le nom du plan.
 *         price:
 *           type: number
 *           description: Le prix du plan.
 *         credits:
 *           type: number
 *           description: Le nombre de crédits inclus dans le plan.
 *         description:
 *           type: string
 *           description: Une description optionnelle du plan.
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: Une liste des avantages du plan.
 *         highlight:
 *           type: boolean
 *           description: Indique si le plan doit être mis en avant.
 *       example:
 *         name: Premium
 *         price: 29.99
 *         credits: 100
 *         description: Accès complet à toutes les fonctionnalités.
 *         features: ["Templates illimités", "Support prioritaire"]
 *         highlight: true
 */

// Définition du schéma pour le modèle Plan
const PlanSchema = new Schema({
  // Nom du plan, obligatoire
  name: {
    type: String,
    required: true,
  },
  // Prix du plan, obligatoire
  price: {
    type: Number,
    required: true,
  },
  // Nombre de crédits inclus dans le plan, obligatoire
  credits: {
    type: Number,
    required: true,
  },
  // Description du plan, optionnelle
  description: {
    type: String,
  },
  // Liste des avantages du plan, optionnelle
  features: {
    type: [String],
  },
  // Indique si le plan doit être mis en avant, optionnel
  highlight: {
    type: Boolean,
    default: false,
  },
});

// Création et exportation du modèle Plan à partir du schéma
module.exports = mongoose.model('Plan', PlanSchema);
