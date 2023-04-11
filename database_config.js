// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdd_ia_story'
  });
  
  // Ouvrir la connexion
connection.connect((erreur) => {
    if (erreur) {
      console.error('Erreur de connexion: ', erreur);
      return;
    }
  
    console.log('Connecté à la base de données MySQL');
  });

  // Fermer la connexion lorsque vous avez terminé
connection.end();