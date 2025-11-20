const express = require('express');
const router = express.Router();
const { 
  preRegisterUser,
  activateUserPlan,
  getAllUsers,
  getUserById,
  deleteUser
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs et de leur cycle de vie
 */

/**
 * @swagger
 * /users/pre-register:
 *   post:
 *     summary: Crée un nouvel utilisateur avec un statut "pending"
 *     tags: [Users]
 *     description: Endpoint pour le pré-enregistrement. Crée un utilisateur avec des crédits à 0 et aucun plan actif.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - country
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               country:
 *                 type: string
 *           example:
 *             firstName: Jane
 *             lastName: Doe
 *             email: jane.doe@example.com
 *             phoneNumber: "+237688888888"
 *             country: Cameroon
 *     responses:
 *       201:
 *         description: Utilisateur pré-enregistré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Données d'entrée invalides.
 */
router.post('/pre-register', preRegisterUser);

/**
 * @swagger
 * /users/{id}/activate:
 *   put:
 *     summary: Active le plan d'un utilisateur
 *     tags: [Users]
 *     description: Met à jour le statut de l'utilisateur à "active", lui assigne un plan et des crédits, et génère un code d'activation unique.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: string
 *                 description: L'ID du plan à activer.
 *           example:
 *             planId: 60c72b2f9b1d8c001f8e4c8b
 *     responses:
 *       200:
 *         description: Utilisateur activé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 activationCode:
 *                   type: string
 *       404:
 *         description: Utilisateur ou plan non trouvé.
 */
router.put('/:id/activate', activateUserPlan);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: La liste des utilisateurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Les détails de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.delete('/:id', deleteUser);

module.exports = router;
