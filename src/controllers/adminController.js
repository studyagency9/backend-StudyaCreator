const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Connecter un administrateur
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      admin.lastLogin = Date.now();
      await admin.save();

      res.json({
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id, admin.role),
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Créer un nouvel administrateur
// @route   POST /api/admin/create
// @access  SuperAdmin
exports.createAdmin = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Cet administrateur existe déjà' });
    }

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(400).json({ message: 'Données invalides' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// @desc    Récupérer le profil de l'admin connecté
// @route   GET /api/admin/profile
// @access  Private (Admin)
exports.getAdminProfile = async (req, res) => {
  // req.admin est attaché par le middleware verifyAdmin
  const admin = await Admin.findById(req.admin._id).select('-password');

  if (admin) {
    res.json(admin);
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
};
