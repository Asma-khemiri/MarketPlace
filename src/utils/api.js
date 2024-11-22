// src/utils/api.js
export const sendConfirmationEmail = async (email, orderDetails) => {
    const emailData = {
      to: email,
      subject: "Confirmation de commande",
      text: `Votre commande a bien été enregistrée. Voici les détails : ${JSON.stringify(orderDetails)}`,
    };
  
    try {
      const response = await fetch('https://your-email-api.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }
  
      const data = await response.json();
      console.log('Email envoyé avec succès:', data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  };
  