const express = require('express');
const router = express.Router();
const { 
  createPlan, 
  getAllPlans, 
  getPlanById, 
  updatePlan, 
  deletePlan 
} = require('../controllers/planController');

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: Gestion des plans d'abonnement
 */

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Crée un nouveau plan
 *     tags: [Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plan'
 *     responses:
 *       201:
 *         description: Le plan a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       400:
 *         description: Erreur lors de la création du plan.
 */
router.post('/', createPlan);

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Récupère la liste de tous les plans
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: La liste des plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 */
router.get('/', getAllPlans);

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Récupère un plan par son ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du plan
 *     responses:
 *       200:
 *         description: Les détails du plan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       404:
 *         description: Plan non trouvé.
 */
router.get('/:id', getPlanById);

/**
 * @swagger
 * /plans/{id}:
 *   put:
 *     summary: Met à jour un plan
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plan'
 *     responses:
 *       200:
 *         description: Le plan a été mis à jour.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       404:
 *         description: Plan non trouvé.
 */
router.put('/:id', updatePlan);

/**
 * @swagger
 * /plans/{id}:
 *   delete:
 *     summary: Supprime un plan
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du plan
 *     responses:
 *       200:
 *         description: Plan supprimé avec succès.
 *       404:
 *         description: Plan non trouvé.
 */
router.delete('/:id', deletePlan);

module.exports = router;
