import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function NavBarDentro(props) {
  const [ admin, setAdmin ] = useState(false);
  const { usuario, setUsuario } = props;

  const navegar = useNavigate();




  useEffect(() => {
    if(usuario.permisos.includes("admin")){
      setAdmin(true);
    }
  }, []);


  const cerrarSesion = () => {
    console.log("Ejecutando cierre de sesion");
    setUsuario(null);
    localStorage.removeItem('Token');
    navegar('/');
  }



  return (
    <div>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/catalogo">Catalogo</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        { admin ? (
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        ):("") }
      </ul>
      <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
    </div>
  )
}
