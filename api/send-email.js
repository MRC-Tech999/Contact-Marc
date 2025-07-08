require('dotenv').config(); // Charger les variables d'environnement

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    // Crée un transporteur avec les données Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Ton adresse e-mail
        pass: process.env.EMAIL_PASS  // Le mot de passe d'application Gmail
      }
    });

    const mailOptions = {
      from: email,
      to: 'ton-email@example.com',  // L'email où tu veux recevoir les messages
      subject: `Nouveau message de ${name}: ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nSujet: ${subject}\nMessage: ${message}`
    };

    try {
      // Envoi de l'email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
