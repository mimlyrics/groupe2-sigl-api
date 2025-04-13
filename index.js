import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello world");
});

//creer un vehicule
app.post('/vehicule/:id', (req, res) => {
    res.send("Route pour creer un vehicule");
});

//afficher les information des vehicule
app.get('/vehicules', (req, res) => {
    res.send("afficher les information des vehicule")
})

//mise a jour des informations d'un vehicule
app.put('/vehicule/:id', (req, res)=>{
    res.send("Mise a jour du vehicule")
});

//supprimer le vehicule
app.delete('/vehicule/:id', (req, res)=> {
    res.send("suppression du vehicule")
});

//Lire les informations d'un vehicule
app.get('/vehicule/:id', (req, res) => {
    res.send("Lire les informations du vehicule");
});


//Lire les informations d'un vehicule a l'aide de son immatriculation
app.get('/vehicule/search/:immatriculation', (req, res) => {
    res.send("Lire les informations d'un vehicule a l'aide de son immatriculation");
});


//Filtre les informations d'un vehicule a l'aide du prix de location
app.get('/vehicule/price/:priceMax', (req, res) => {
    res.send("Filtre les informations d'un vehicule a l'aide du prix de location")
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});