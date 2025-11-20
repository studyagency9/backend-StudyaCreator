// Importation de Mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');

// Fonction asynchrone pour se connecter à la base de données
const connectDB = async () => {
  try {
    // Tentative de connexion à MongoDB avec l'URI fourni dans les variables d'environnement
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...'); // Affiche un message en cas de succès
  } catch (err) {
    console.error(err.message); // Affiche l'erreur en cas d'échec
    process.exit(1); // Arrête le processus de l'application avec un code d'erreur
  }
};

// Exporte la fonction pour l'utiliser dans d'autres parties de l'application
module.exports = connectDB;
