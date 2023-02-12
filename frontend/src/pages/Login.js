import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [ notificacion, setNotificacion ] = useState("");
    const navegar = useNavigate();

    const { loginActivo, setLoginActivo } = props

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
                                //Definimos un if que cambia el estado de login activo para indicarle a la app que hubo un login.
                                if(loginActivo === 1){
                                    setLoginActivo(2);
                                }else{
                                    setLoginActivo(1);
                                }
                                //guardar el token recibido en el navegador.
                                localStorage.setItem("Token", authorizationValue);
                                //Nos redirigimos a la pagina home despues del acceso.
                                navegar('/home');
                            }else{
                                setNotificacion("Hubo un error en la autenticacion.")
                            }
                        } catch (error) {
                            console.error("Error con el login", error);
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
