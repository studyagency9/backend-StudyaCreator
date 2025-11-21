const express = require('express');
const router = express.Router();
const { createOrder, validateOrder, getAllOrders, getUserOrders } = require('../controllers/orderController');
const { verifyAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestion des commandes
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Créer une nouvelle commande (point d'entrée pour un nouvel utilisateur)
 *     tags: [Orders]
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
 *               - planName
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
 *               planName:
 *                 type: string
 *                 description: Le nom du plan (ex: 'Starter' ou 'Professionnel').
 *     responses:
 *       201:
 *         description: Commande créée avec succès, en attente de validation.
 *       404:
 *         description: Plan non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/', createOrder);

/**
 * @swagger
 * /api/orders/{id}/validate:
 *   put:
 *     summary: Valider une commande, créer/mettre à jour l'utilisateur et attribuer les crédits
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la commande à valider.
 *     responses:
 *       200:
 *         description: Commande validée et utilisateur créé/mis à jour.
 *       400:
 *         description: La commande a déjà été validée.
 *       404:
 *         description: Commande non trouvée.
 *       500:
 *         description: Erreur serveur.
 */
router.put('/:id/validate', verifyAdmin, validateOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les commandes.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', verifyAdmin, getAllOrders);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Récupérer les commandes d'un utilisateur spécifique
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur.
 *     responses:
 *       200:
 *         description: Liste des commandes de l'utilisateur.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/user/:userId', verifyAdmin, getUserOrders);

module.exports = router;
