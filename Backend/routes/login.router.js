const express = require('express');
const router = express.Router();
const Login = require('../models/login.model');
const jwt = require('jsonwebtoken');

//Generar token
const generarToken = (usuario) => {
    return jwt.sign(usuario, process.env.CLAVETOKEN)
}

//Validar token
const validarToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token, "token");

    if(!token){
        res.status(500).send({
            mensaje: "Acceso denegado"
        });
    }else{
        jwt.verify(token, process.env.CLAVETOKEN, (err, usuario) => {
            if(err){
                res.status(500).send({
                    mensaje: "Token expirado o incorrecto"
                });
            }else{
                req.user = usuario;
                next();
            }
        })
    }
}




//Creamos la ruta de registro.
router.post('/registro', async (req, res, next) => {
    const { usuario, contrasena } = req.body;

    const crearUsuario = new Login({
        usuario: usuario,
        contrasena: contrasena
    })

    crearUsuario.save(err => {
        if(err){
            res.status(500).send({
                mensaje:"Error al registrar usuario",
                error: err
            })
        }else{
            res.status(200).send({
                mensaje:"Usuario registrado correctamente"
            });
        }
    })
})

//Metodo get
router.get('/', validarToken ,async (req, res, next) => {
    usuario = req.user;

    try {
        const data = await Login.find();
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send({
            mensaje:"Error al enviar los datos",
            error: error.message
        })
    }
})

//Metodo get registro
router.get('/registro/comprobacion', validarToken ,async (req, res, next) => {
    usuario = req.user;

    try {
        const data = await Login.find();

        //Creamos un map con solo los nombres de los usuarios.
        let usuarios = data.map(function(element){
            return element.usuario;
        })

        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send({
            mensaje:"Error al enviar los datos",
            error: error.message
        })
    }
})


//Autenticacion.
router.post('/autenticacion', async (req, res, next) => {
    const { usuario, contrasena } = req.body;

    //Buscamos al usuario en la base de datos.
    const usuarioDatos = await Login.findOne({ usuario: usuario });

    //Creamos un if que si el usuario no se encuentra mande el mensaje, si lo encuentra que compruebe si la contraseña es correcta y si lo es devuelva el token al front, si no que devuelva un mensaje que se equivoco al introducir los datos.
    if (!usuarioDatos) {
    res.status(500).send({
        mensaje: "Este usuario no existe"
    });
    }else{
        usuarioDatos.laContraseñaEsCorrecta(contrasena)
        .then(result => {

            if(result){

                const usuarioParaToken = { usuario:usuario };

                const token = generarToken(usuarioParaToken);


                res.set({
                    'Content-Type': 'application/json',
                    'Authorization': token
                    });


                res.status(200).send({
                mensaje: "Usuario autenticado correctamente"
                });
            }else{
                res.status(200).send({
                mensaje: "Usuario y contrasena incorrectos"
                });
            }
        })
        .catch(err => {
            console.log(err, "err");
            res.status(500).send({
            mensaje: "Error al autenticar"
            });
        });
    }
});




module.exports = router;



