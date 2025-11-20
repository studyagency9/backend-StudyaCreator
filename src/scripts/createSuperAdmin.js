require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

const createSuperAdmin = async () => {
  await connectDB();

  try {
    const superAdminExists = await Admin.findOne({ role: 'superadmin' });
    if (superAdminExists) {
      console.log('Un superadmin existe déjà.');
      process.exit();
    }

    const superAdmin = new Admin({
      firstName: 'Emmanuel',
      lastName: 'De Song',
      email: 'admin@studyagency.com', // Remplacez par un email sécurisé
      password: '2486', // Remplacez par un mot de passe fort
      role: 'superadmin',
    });

    await superAdmin.save();
    console.log('Superadmin créé avec succès !');
    process.exit();
  } catch (error) {
    console.error('Erreur lors de la création du superadmin:', error);
    process.exit(1);
  }
};

createSuperAdmin();
