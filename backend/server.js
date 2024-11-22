const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'votre-email@gmail.com',
    pass: 'votre-mot-de-passe',
  },
});

// Route pour envoyer l'email
app.post('/send-email', (req, res) => {
  const { fullName, email, phone, address, city, postalCode } = req.body;

  const mailOptions = {
    from: 'votre-email@gmail.com',
    to: 'email-destinataire@gmail.com',
    subject: 'Nouvelle commande',
    text: `Nom : ${fullName}\nEmail : ${email}\nTéléphone : ${phone}\nAdresse : ${address}\nVille : ${city}\nCode Postal : ${postalCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email envoyé avec succès');
  });
});

app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});
