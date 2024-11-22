const sendEmail = (clientInfo) => {
  // Envoi des informations client au backend
  fetch('http://localhost:5000/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientInfo), // Envoyer les infos client dans le corps de la requête
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      toast.success(data.message);  // Affiche un toast de succès
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    toast.error('Erreur lors de l\'envoi de l\'email');
  });
};
