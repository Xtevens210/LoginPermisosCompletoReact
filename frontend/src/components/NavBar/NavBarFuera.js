import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBarFuera() {
  return (
    <div className='nav-fuera__div--container'>
      <div>
        <h2>React</h2>
      </div>
      <div className='nav-fuera__div--seccion nav-fuera__div--seccion1'>
        <h1>Login Profesional</h1>
      </div>
      <div className='nav-fuera__div--seccion nav-fuera__div--seccion2'>
        <button><Link to="/login">Iniciar Sesión</Link></button>
        <button><Link to="/signup">Registrarse</Link></button>
      </div>
    </div>
  )
}
