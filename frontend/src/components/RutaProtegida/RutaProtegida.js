import { Navigate, Outlet } from "react-router-dom";


export const RutaProtegida = (props) => {
    let { logueado, children, redirectTo="/" } = props;

    if(!logueado){
        return <Navigate to={redirectTo}/>
    }

    return children ? (children):<Outlet/>
}
