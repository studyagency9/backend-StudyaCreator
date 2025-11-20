const express = require('express');
const router = express.Router();
const { 
  createTemplate, 
  getAllTemplates, 
  getTemplateById, 
  updateTemplate, 
  deleteTemplate,
  getTemplatesByTheme,
  getTemplatesByCategory
} = require('../controllers/templateController');

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Gestion des templates de contenu
 */

/**
 * @swagger
 * /templates:
 *   post:
 *     summary: Crée un nouveau template
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Template'
 *     responses:
 *       201:
 *         description: Le template a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       400:
 *         description: Erreur lors de la création du template.
 */
router.post('/', createTemplate);

/**
 * @swagger
 * /templates:
 *   get:
 *     summary: Récupère la liste de tous les templates
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: La liste des templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
router.get('/', getAllTemplates);

/**
 * @swagger
 * /templates/{id}:
 *   get:
 *     summary: Récupère un template par son ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du template
 *     responses:
 *       200:
 *         description: Les détails du template.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template non trouvé.
 */
router.route('/:id')
  .get(getTemplateById)
  .put(updateTemplate)
  .delete(deleteTemplate);

// Ajout des routes pour le filtrage par thème et catégorie
/**
 * @swagger
 * /api/templates/theme/{theme}:
 *   get:
 *     summary: Récupérer les templates par thème
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: theme
 *         schema:
 *           type: string
 *         required: true
 *         description: Le thème des templates à récupérer
 *     responses:
 *       200:
 *         description: Liste des templates correspondant au thème
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       500:
 *         description: Erreur serveur
 */
router.get('/theme/:theme', getTemplatesByTheme);

/**
 * @swagger
 * /api/templates/category/{category}:
 *   get:
 *     summary: Récupérer les templates par catégorie
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: La catégorie des templates à récupérer
 *     responses:
 *       200:
 *         description: Liste des templates correspondant à la catégorie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       500:
 *         description: Erreur serveur
 */
router.get('/category/:category', getTemplatesByCategory);

module.exports = router;
