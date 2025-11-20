const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Middleware pour vérifier si un administrateur est connecté
const verifyAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupère le token de l'en-tête
      token = req.headers.authorization.split(' ')[1];

      // Vérifie et décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Trouve l'admin correspondant à l'ID du token et l'attache à la requête
      req.admin = await Admin.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

// Middleware pour vérifier si l'administrateur est un superadmin
const verifySuperAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé, rôle superadmin requis' });
  }
};

module.exports = { verifyAdmin, verifySuperAdmin };
