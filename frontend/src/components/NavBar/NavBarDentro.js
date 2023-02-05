import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBarDentro(props) {
  const [ admin, setAdmin ] = useState(false);
  const { usuario } = props;




  useEffect(() => {
    if(usuario.roles.includes("admin")){
      setAdmin(true);
    }
  }, []);




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
    </div>
  )
}
