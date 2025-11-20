// Importation des modules nécessaires de Mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de l'utilisateur.
 *         firstName:
 *           type: string
 *           description: Le prénom de l'utilisateur.
 *         lastName:
 *           type: string
 *           description: Le nom de famille de l'utilisateur.
 *         email:
 *           type: string
 *           description: L'adresse email de l'utilisateur (doit être unique).
 *         phoneNumber:
 *           type: string
 *           description: Le numéro de téléphone de l'utilisateur.
 *         country:
 *           type: string
 *           description: Le pays de l'utilisateur.
 *         status:
 *           type: string
 *           enum: [pending, active, inactive]
 *           description: Le statut du compte utilisateur.
 *         activationCode:
 *           type: string
 *           description: Le code unique utilisé pour l'authentification après activation.
 *         activePlanId:
 *           type: string
 *           description: L'ID du plan actuellement actif pour l'utilisateur.
 *         creditsRemaining:
 *           type: number
 *           description: Le nombre de crédits restants pour l'utilisateur.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création du compte.
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         phoneNumber: "+237699999999"
 *         country: Cameroon
 *         status: active
 *         creditsRemaining: 95
 */

// Définition du schéma pour le modèle User
const UserSchema = new Schema({
  // Prénom de l'utilisateur, obligatoire
  firstName: {
    type: String,
    required: true,
  },
  // Nom de famille de l'utilisateur, obligatoire
  lastName: {
    type: String,
    required: true,
  },
  // Adresse email de l'utilisateur, obligatoire et unique
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Numéro de téléphone de l'utilisateur, obligatoire
  phoneNumber: {
    type: String,
    required: true,
  },
  // Pays de l'utilisateur, obligatoire
  country: {
    type: String,
    required: true,
  },
  // Statut de l'utilisateur (en attente, actif, etc.)
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending',
  },
  // Code d'activation unique pour l'utilisateur
  activationCode: {
    type: String,
    unique: true,
    sparse: true, // Permet plusieurs documents avec une valeur null
  },
  // ID du plan actif, référence à la collection 'Plan'
  activePlanId: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    default: null,
  },
  // Nombre de crédits restants pour l'utilisateur
  creditsRemaining: {
    type: Number,
    default: 0,
    min: 0,
  },
  // Date de création du compte, par défaut la date actuelle
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Création et exportation du modèle User à partir du schéma
module.exports = mongoose.model('User', UserSchema);
