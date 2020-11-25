import React from 'react';
import {useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {useDispatch} from 'react-redux';
import {eliminarTareaAction, editarTareaAction } from '../actions/tareasActions';


const Tarea = ({tarea}) => {
    const {nombre, prioridad, id } = tarea;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarTarea = id =>{

        Swal.fire({
            title: 'Estas seguro?',
            text: "Se eliminara una tarea",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminarTareaAction(id));
            }
          })

    }

    const redireccionarTarea = tarea =>{
        dispatch(editarTareaAction(tarea));
        history.push(`/tareas/editar/${tarea.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weigth-bold">{prioridad}</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={()=>redireccionarTarea(tarea)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>confirmarEliminarTarea(id)}
                >Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Tarea;