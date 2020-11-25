import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {crearNuevaTarea} from '../actions/tareasActions';
import {mostrarAlertaAction, ocultarAlertaAction} from '../actions/alertaActions';

const NuevaTarea = ({history}) => {

    const [nombre, guardarNombre] = useState('');
    const [prioridad, guardarPrioridad] = useState('');

    const dispatch = useDispatch();

    const cargando = useSelector(state => state.tareas.loading);
    const error = useSelector(state => state.tareas.error);
    const alerta = useSelector(state => state.alerta.alerta)


    const agregarTarea = (tarea) => dispatch(crearNuevaTarea(tarea));

    const submitNuevaTarea = e =>{
        e.preventDefault();

        if(nombre.trim() === '' || prioridad.trim() === ''){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p-3'
            }
           dispatch(mostrarAlertaAction(alerta));
           return;
        }

        dispatch(ocultarAlertaAction());

        agregarTarea({
            nombre,
            prioridad
        });

        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nueva Tarea
                        </h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}
                        <form onSubmit={submitNuevaTarea}
                        >
                            <div className="form-group">
                                <label>Nombre Tarea</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Tarea"
                                name="nombre"
                                value={nombre}
                                onChange={e => guardarNombre(e.target.value)}
                            />
                            </div>
                            <div className="form-group">
                                <label>Prioridad Tarea</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Prioridad Tarea"
                                name="prioridad"
                                value={prioridad}
                                onChange={e => guardarPrioridad(e.target.value)}
                            />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {cargando ? <p>Cargando...</p>: null}
                        {error ? <p className="alert alert-danger p-2 mt-2 text-center">Hubo un error</p>: null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevaTarea;