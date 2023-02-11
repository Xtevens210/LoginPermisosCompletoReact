import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

export default function Login() {
    const [ notificacion, setNotificacion ] = useState("");



    return (
        <div>
            {notificacion}
            <Formik
                initialValues={{
                    usuario: "",
                    contrasena:""
                }}
            
                validate={
                    (valores)=>{
                        let errores = {}

                        if(!valores.usuario){
                            errores.usuario = "Introduce un usuario"
                        }

                        if(!valores.contrasena){
                            errores.contrasena = "Introduce una contraseña"
                        }

                        return errores;
                    }
                }

                onSubmit={
                    async(valores) => {
                        try {
                            let config = {
                                method: 'POST',
                                headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },body: JSON.stringify({
                                    usuario: valores.usuario,
                                    contrasena: valores.contrasena
                                })
                            }
                            let res = await fetch('http://localhost:3500/api/autenticacion',config)
                            let json = await res.json();
                            let authorizationValue = res.headers.get('Authorization')

                            if(json.mensaje === "Este usuario no existe"){
                                setNotificacion("Este usuario no existe");
                            }else if(json.mensaje === "Usuario y contrasena incorrectos"){
                                setNotificacion("Usuario y contraseña incorrectos");
                            }else if(json.mensaje === "Usuario autenticado correctamente"){

                                setNotificacion("Usuario autenticado correctamente");
                                console.log("header", authorizationValue);
                            }else{
                                setNotificacion("Hubo un error en la autenticacion.")
                            }

                            //Pendiente hacer las comprobaciones.

                        } catch (error) {
                            
                        }

                    }
                }
            >
                {({errors}) => (
                    <Form>
                        <div>
                            <Field
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Usuario"
                            ></Field>
                        </div>
                        <ErrorMessage name="usuario" component={() => <div>{errors.usuario}</div>}/>

                        <div>
                            <Field
                                type="password"
                                id="contrasena"
                                name="contrasena"
                                placeholder="Contraseña"
                            ></Field>
                        </div>
                        <ErrorMessage name="contrasena" component={() => <div>{errors.contrasena}</div>}/>
                        <button type='submit'>Entrar</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
