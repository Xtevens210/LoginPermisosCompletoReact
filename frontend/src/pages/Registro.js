import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage }  from 'formik';
import { useNavigate } from 'react-router-dom';


export default function Registro() {
    const [ datos, setDatos ] = useState([]);
    const [ registroExitoso, setRegistroExitoso ] = useState("");


    const navegar = useNavigate();

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoieHRldmVuczIxMCIsImlhdCI6MTY3NTczODY1M30.sBdstfqPvg4cMFj73DORlSNeGPgWptOVZ0DeEoCKkFs';


    useEffect(() => {
        fetch('http://localhost:3500/api/registro/comprobacion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        })
        .then(res => res.json())
        .then(res => setDatos(res))
        .catch(error => console.error(error));
    }, []);



    return (
        <div>
            {registroExitoso}
            <Formik
                initialValues={{
                    usuario: "",
                    contrasena1: "",
                    contrasena2: ""
                }}

                validate={
                    (valores) => {
                        let errores = {};

                        if(!valores.usuario){
                            errores.usuario = "Ingrese un usuario";
                        }

                        if(datos.includes(valores.usuario)){
                            errores.usuario = "Este usuario ya existe";
                        }

                        if(valores.contrasena1.length < 4){
                            errores.contrasena1 = "Contraseña demasiado corta";
                        }

                        if(valores.usuario.length < 4){
                            errores.usuario = "El nombre de usuario debe ser mas largo";
                        }

                        if(!valores.contrasena1){
                            errores.contrasena1 = "Introduzca una contraseña";
                        }

                        if(valores.contrasena1 !== valores.contrasena2){
                            errores.contrasena2 = "La contraseña no coincide";
                        }

                        return errores
                    }
                }
                onSubmit={
                    async(valores, {resetForm}) => {
                        //console.log("datos",valores.usuario, " ", valores.contrasena1, " ", valores.contrasena2);

                        try {
                            let config = {
                                method: 'POST',
                                headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },body: JSON.stringify({
                                    usuario: valores.usuario,
                                    contrasena: valores.contrasena1,
                                    permisos: []
                                })
                            }
                            let res = await fetch('http://localhost:3500/api/registro',config)
                            let json = await res.json();

                            //Creamos un if que si el server nos responde que el usuario se registro correctamente haga una accion y si no mande un letrero de error al registrar.
                            if(json.mensaje === "Usuario registrado correctamente"){
                                setRegistroExitoso("Registro Exitoso");
                                setTimeout(() => {
                                    navegar('/login');
                                }, 2000);
                                resetForm();
                            }else{
                                setRegistroExitoso("Error al registrar usuario");
                            }

                        } catch (error) {
                            console.error("Error de registro", error);
                        }
                    }
                }
            >
            {
                ({errors}) => (
                    <Form>
                        <div>
                            <Field
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Nombre de usuario"
                            >
                            </Field>
                        </div>
                        <ErrorMessage name="usuario" component={() => <div>{errors.usuario}</div>}/>
                        <div>
                            <Field
                                type="password"
                                id="contrasena1"
                                name="contrasena1"
                                placeholder="contraseña"
                            >
                            </Field>
                        </div>
                        <ErrorMessage name="contrasena1" component={() => <div>{errors.contrasena1}</div>}/>
                        <div>
                            <Field
                                type="password"
                                id="contrasena2"
                                name="contrasena2"
                                placeholder="confirmar contraseña"
                            >
                            </Field>
                        </div>
                        <ErrorMessage name="contrasena2" component={() => <div>{errors.contrasena2}</div>}/>

                        <button type="submit">Registrarse</button>
                    </Form>
                )
            }

            </Formik>
        </div>
    )
}
