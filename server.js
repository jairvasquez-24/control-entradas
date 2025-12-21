const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Ruta guardar datos
app.post('/guardar', (req, res) => {
    const { usuario, latitud, longitud, fecha } = req.body;

    const linea = `${usuario},${latitud},${longitud},${fecha}\n`;
    const archivo = path.join(__dirname, 'registros.csv');

    fs.appendFile(archivo, linea, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).send('Error al guardar los datos');
        } else {
            res.send('Datos guardados correctamente');
        }
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});