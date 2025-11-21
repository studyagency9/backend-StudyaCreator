const cron = require('node-cron');
const Order = require('../models/Order');

// Tâche Cron pour annuler les commandes en attente depuis plus de 48h
const cancelPendingOrders = () => {
  // Exécute la tâche toutes les heures
  cron.schedule('0 * * * *', async () => {
    console.log('Running cron job to cancel pending orders...');
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    try {
      const result = await Order.updateMany(
        { status: 'en cours', createdAt: { $lte: fortyEightHoursAgo } },
        { $set: { status: 'annullée' } }
      );

      if (result.nModified > 0) {
        console.log(`${result.nModified} pending orders have been cancelled.`);
      }
    } catch (error) {
      console.error('Error cancelling pending orders:', error);
    }
  });
};

module.exports = { cancelPendingOrders };
