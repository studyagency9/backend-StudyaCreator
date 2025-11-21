const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - country
 *         - plan
 *       properties:
 *         firstName:
 *           type: string
 *           description: Le prénom du client.
 *         lastName:
 *           type: string
 *           description: Le nom de famille du client.
 *         email:
 *           type: string
 *           description: L'adresse email du client.
 *         phoneNumber:
 *           type: string
 *           description: Le numéro de téléphone du client.
 *         country:
 *           type: string
 *           description: Le pays du client.
 *         user:
 *           type: string
 *           description: L'ID de l'utilisateur créé après validation de la commande.
 *         plan:
 *           type: string
 *           description: L'ID du plan choisi.
 *         credits:
 *           type: number
 *           description: Le nombre de crédits achetés avec le plan.
 *         amount:
 *           type: number
 *           description: Le montant de la commande.
 *         currency:
 *           type: string
 *           description: La devise de la commande.
 *           default: 'FCFA'
 *         status:
 *           type: string
 *           description: Le statut de la commande.
 *           enum: [en cours, validée, annullée]
 *           default: 'en cours'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création de la commande.
 *         validatedAt:
 *           type: string
 *           format: date-time
 *           description: La date de validation de la commande.
 */
const OrderSchema = new Schema({
  // Informations client capturées à la commande
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },

  // Référence à l'utilisateur qui sera créé après validation
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'FCFA',
  },
  status: {
    type: String,
    enum: ['en cours', 'validée', 'annullée'],
    default: 'en cours',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  validatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
