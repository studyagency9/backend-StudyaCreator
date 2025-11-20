const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de l'administrateur.
 *         firstName:
 *           type: string
 *           description: Le prénom de l'administrateur.
 *         lastName:
 *           type: string
 *           description: Le nom de l'administrateur.
 *         email:
 *           type: string
 *           description: L'adresse email unique de l'administrateur.
 *         role:
 *           type: string
 *           enum: [superadmin, admin]
 *           description: Le rôle de l'administrateur.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création du compte.
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière connexion.
 */

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Veuillez entrer une adresse email valide'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

// Middleware pour hacher le mot de passe avant de sauvegarder
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer le mot de passe entré avec celui haché
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
