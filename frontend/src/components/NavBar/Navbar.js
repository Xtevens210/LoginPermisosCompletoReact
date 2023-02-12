import React from 'react';

//Componentes
import NavBarDentro from './NavBarDentro';
import NavBarFuera from './NavBarFuera';

export default function Navbar(props) {
    const { usuario, setUsuario } = props;
    return (
        <nav>
            { usuario ? (<NavBarDentro usuario={usuario} setUsuario={setUsuario}/>):(<NavBarFuera/>)}
        </nav>
    )
}
