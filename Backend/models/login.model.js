const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


//Creamos el esquema.
const loginSquema = new Schema({
    usuario: { type: String, required: true, unique: true},
    contrasena: { type: String, required: true},
    permisos: { type: Array, default: []}
},{versionKey: false})


//Creamos las veces que encriptara el dato que le enviemos
const saltRounds = 10;

//Middleware que genera una comprobacion de los datos antes de guardarse en la base de datos.
loginSquema.pre('save', function(next){
    if(this.isNew || this.isModified('contrasena')){//Comprobamos con los metodos de mongoose si el documento es nuevo o es modificado.
        const document = this;//Guardamos el documento en la variable document.

        bcrypt.hash(document.contrasena, saltRounds, (err, hashedContrasena) =>{//Generamos un has que es la contraseña encriptada.
            if(err){
                next(err);//Si hay un error en el proceso el codigo se saltara el proceso.
            }else{
                document.contrasena = hashedContrasena;//Sino el has generado reemplazara la contrasena del documento con la contrasena encriptada.
                next();
            }
        })
    }else{
        next();
    }
})


//Creamos el metodo de comprobacion de la contraseña
// loginSquema.methods.laContraseñaEsCorrecta = function(contrasena){
//     const result = null;
//     bcrypt.compare(contrasena, this.contrasena,
//         function(err, same, result){
//             console.log("comparacion");
//             console.log("same",same);
//             if(err){
//                 result = null;
//             }else{
//                 result = same;
//             }
//         })
// }


loginSquema.methods.laContraseñaEsCorrecta = function(contrasena) {
    return new Promise((resolve, reject) => {
    bcrypt.compare(contrasena, this.contrasena, (err, same) => {
        if (err) {
        reject(err);
        } else {
        resolve(same);
        }
    });
    });
};




//Creacion del modelo
module.exports = mongoose.model('usuarios', loginSquema, 'usuarios');


