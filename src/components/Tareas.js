import React, {Fragment, useEffect} from 'react';
import Tarea from './Tarea'
import {useSelector, useDispatch} from 'react-redux';
import {obtenerTarea} from '../actions/tareasActions';

const Tareas = () => {

   const dispatch = useDispatch();

   useEffect(() =>{
        const cargarTareas = () => dispatch (obtenerTarea());
        cargarTareas();
        //slint-disable-next-line
   },[]);

   const tareas = useSelector(state => state.tareas.tareas);
   const error = useSelector(state => state.tareas.error);
   const cargando = useSelector(state => state.tareas.cargando);
  
    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Tareas</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>: null}
            {cargando ? <p className="text-center">Cargando...</p>: null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th>Tarea</th>
                        <th>Prioridad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.length === 0 ? 'No hay tarea': (tareas.map(tarea =>(
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                        />
                    ))
                )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Tareas;