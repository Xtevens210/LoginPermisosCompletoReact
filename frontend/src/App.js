import { useState } from 'react';
import { BrowserRouter, Routes, Route } from  'react-router-dom';

//Componentes
import Navbar from './components/NavBar/Navbar';
import { RutaProtegida } from './components/RutaProtegida/RutaProtegida';


//Paginas
import Index from './pages/Index';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import About from './pages/About';
import Admin from './pages/Admin';

function App() {
  const [ usuario, setUsuario ] = useState(null);

  const dentro = () => {
    setUsuario(
      {
        usuario: "Xtevens210",
        roles: ["admin"]
      }
    );
  }

  const dentroNormal = () => {
    setUsuario(
      {
        usuario: "CarlosB",
        roles: []
      }
    );
  }

  const fuera = () => {
    setUsuario(null);
  }




  return (
    <BrowserRouter>
      <button onClick={() => dentro()}>Log usuario admin</button>
      <button onClick={() => dentroNormal()}>Log usuario normal</button>
      <button onClick={() => fuera()}>Fuera</button>

      <Navbar usuario={usuario}/>

      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Registro/>}/>
        <Route path="/about" element={<About/>}/>

        <Route element={<RutaProtegida logueado={!!usuario}/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/catalogo" element={<Catalogo/>}/>
        </Route>

        
        <Route path='/admin' element={
          <RutaProtegida logueado={!!usuario && usuario.roles.includes("admin")} redirectTo="/home" >
            <Admin/>
          </RutaProtegida>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
