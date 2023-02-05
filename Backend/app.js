const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

// Middleware para manejar solicitudes JSON
app.use(express.json());


const PORT = process.env.PORT || 5000;
const CONECCIONDB_STRING = process.env.CONECCIONDB;



//Conexion a la base de datos
mongoose.set("strictQuery", false);
mongoose.connect(CONECCIONDB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Conectado a la base de datos"))

    .catch((err) => console.log(`Hubo un error al conectar con mongo: ${err}`))



//Importacion de enrutadores.
const login = require('./routes/login.router');


//Enrutamiento
app.use('/login', login);



// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Ha ocurrido un error en el servidor.' });
});


// Escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor funcionando correctamente y conectado al puerto ${PORT}`)
});
