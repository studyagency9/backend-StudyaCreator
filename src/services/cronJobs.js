const cron = require('node-cron');
const User = require('../models/User');

// Tâche planifiée pour s'exécuter tous les jours à minuit
const cleanupPendingUsers = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Exécution de la tâche de nettoyage des utilisateurs en attente...');
    try {
      const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

      const result = await User.deleteMany({
        status: 'pending',
        createdAt: { $lte: fortyEightHoursAgo },
      });

      if (result.deletedCount > 0) {
        console.log(`${result.deletedCount} utilisateurs en attente ont été supprimés.`);
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage des utilisateurs en attente:', error);
    }
  });
};

module.exports = { cleanupPendingUsers };
