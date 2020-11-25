import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1>
                    <Link to={'/'} className="text-light">
                        Registro de Tareas
                    </Link>
                </h1>
            </div>

            <Link className="btn btn-dark new-post d-block d-md-inline-block"
                to={"/tasks/new"}
            > &#43; Agregar Tarea
            </Link>
        </nav>
    );
}

export default Header;