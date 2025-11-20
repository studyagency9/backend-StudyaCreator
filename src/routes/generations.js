const express = require('express');
const router = express.Router();
const { useTemplate } = require('../controllers/generationController');

/**
 * @swagger
 * tags:
 *   name: Generations
 *   description: Processus de génération de contenu
 */

/**
 * @swagger
 * /generations/use-template:
 *   post:
 *     summary: Utilise un template et déduit les crédits de l'utilisateur
 *     tags: [Generations]
 *     description: Endpoint principal pour la génération de contenu. Vérifie les crédits de l'utilisateur, les déduit, et (en théorie) lance le processus de génération.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - templateId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: L'ID de l'utilisateur qui effectue l'action.
 *               templateId:
 *                 type: string
 *                 description: L'ID du template à utiliser.
 *           example:
 *             userId: 60c72b2f9b1d8c001f8e4c8a
 *             templateId: 60c72b3a9b1d8c001f8e4c8d
 *     responses:
 *       200:
 *         description: Template utilisé avec succès et crédits déduits.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 creditsRemaining:
 *                   type: number
 *       400:
 *         description: Crédits insuffisants.
 *       404:
 *         description: Utilisateur ou template non trouvé.
 */
router.post('/use-template', useTemplate);

module.exports = router;
