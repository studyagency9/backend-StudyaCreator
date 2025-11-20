// Importation des modules nécessaires
require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importation des modèles Mongoose (non plus nécessaire ici, géré dans les contrôleurs)

// Connexion à la base de données MongoDB
connectDB();

// Initialisation de l'application Express
const app = express();

// Configuration de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Activation de CORS pour autoriser les requêtes cross-origin
app.use(cors());
// Activation du parsing des requêtes JSON
app.use(express.json());

// Définition des routes de l'API
app.use('/api/users', require('./routes/users'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/generations', require('./routes/generations'));
app.use('/api/admin', require('./routes/admin'));

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Définition du port d'écoute du serveur
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Importation et lancement des tâches planifiées
const { cleanupPendingUsers } = require('./services/cronJobs');
cleanupPendingUsers();
