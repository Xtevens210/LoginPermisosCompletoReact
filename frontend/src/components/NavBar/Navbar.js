import React from 'react';

//Componentes
import NavBarDentro from './NavBarDentro';
import NavBarFuera from './NavBarFuera';

export default function Navbar(props) {
    const { usuario } = props;
    return (
        <nav>
            { usuario ? (<NavBarDentro usuario={usuario}/>):(<NavBarFuera/>)}
        </nav>
    )
}
