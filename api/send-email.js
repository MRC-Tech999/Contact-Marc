// api/send-email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Ton adresse e-mail
        pass: process.env.EMAIL_PASS   // Le mot de passe d'application
      }
    });

    const mailOptions = {
      from: email,
      to: 'ton-email@example.com',  // Ton adresse e-mail pour recevoir les messages
      subject: `Nouveau message de ${name}: ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nNuméro de téléphone: ${phone}\nSujet: ${subject}\nMessage: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
};
