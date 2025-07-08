require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    // Création du transporteur avec Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Ton adresse email
        pass: process.env.EMAIL_PASS   // Le mot de passe d'application
      }
    });

    const mailOptions = {
      from: email,
      to: 'emprerorsukuna@gmail.com',  // Email où tu veux recevoir le message
      subject: `Nouveau message de ${name}: ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nNuméro de téléphone: ${phone}\nSujet: ${subject}\nMessage: ${message}`
    };

    try {
      // Envoi de l'email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
      console.log(error);  // Afficher l'erreur dans les logs
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
