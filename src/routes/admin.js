const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  createAdmin,
  getAdminProfile,
} = require('../controllers/adminController');
const { verifyAdmin, verifySuperAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestion des administrateurs et de l'authentification
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Connecte un administrateur
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: superadmin@studyacreator.com
 *             password: supersecretpassword
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne les informations de l'admin et un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Email ou mot de passe invalide.
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Crée un nouvel administrateur (Superadmin requis)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, superadmin]
 *           example:
 *             firstName: John
 *             lastName: Admin
 *             email: john.admin@studyacreator.com
 *             password: newpassword123
 *             role: admin
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès.
 *       403:
 *         description: Accès refusé.
 */
router.post('/create', verifyAdmin, verifySuperAdmin, createAdmin);

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Récupère le profil de l'administrateur connecté
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'administrateur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Non autorisé.
 */
router.get('/profile', verifyAdmin, getAdminProfile);

module.exports = router;
