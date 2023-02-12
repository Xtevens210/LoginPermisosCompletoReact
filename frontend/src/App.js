import { useEffect, useState } from 'react';
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
  const [ loginActivo, setLoginActivo ] = useState(1);

  useEffect(() => {
    console.log("estado usuario efecto", usuario);
  }, [])

  useEffect(() => {
    if(usuario){
      console.log("estado usuario efecto2", usuario.permisos.includes("admin"));
    }
  }, [usuario])



  useEffect(() => {
    fetch('http://localhost:3500/api', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Token')
    }
    })
    .then(res => res.json())
    .then(res => {if(res.mensaje !== "Acceso denegado" && res.mensaje !== "Token expirado o incorrecto"){
      setUsuario(res);
      console.log("res",res);
    }})
    .catch(error => console.error(error));

    console.log("Estado usuario",usuario)
  }, [loginActivo]);



  return (
    <BrowserRouter>
      <Navbar usuario={usuario} setUsuario={setUsuario}/>

      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/login" element={<Login loginActivo={loginActivo} setLoginActivo={setLoginActivo}/>}/>
        <Route path="/signup" element={<Registro/>}/>
        <Route path="/about" element={<About/>}/>

        <Route element={<RutaProtegida logueado={!!usuario}/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/catalogo" element={<Catalogo/>}/>
        </Route>


        <Route path='/admin' element={
          <RutaProtegida logueado={!!usuario && usuario.permisos.includes("admin")} redirectTo="/home" >
            <Admin/>
          </RutaProtegida>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
