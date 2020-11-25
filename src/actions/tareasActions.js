import {
    AGREGAR_TAREA,
    AGREGAR_TAREA_EXITO,
    AGREGAR_TAREA_ERROR,
    DESCARGA_TAREA,
    DESCARGA_EXITO,
    DESCARGA_ERROR,
    ELIMINAR_TAREA, 
    ELIMINAR_EXITO, 
    ELIMINAR_ERROR,
    EDITAR_TAREA,
    COMENZAr_EDITAR,
    EDITAR_EXITO,
    EDITAR_ERROR

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


export function crearNuevaTarea(tarea){
    return async (dispatch) => {
        dispatch(agregarTarea());

        try{
          await clienteAxios.post('/tareas', tarea);
            dispatch(agregarTareaExito(tarea));
            Swal.fire(
                'Correcto',
                'La tarea se agrego correctamente',
                'success'
            )
        } catch(error){
            dispatch(agregarTareaError(true) );
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarTarea = () => ({
    type: AGREGAR_TAREA,
    payload: true
});

const agregarTareaExito = (tarea) => ({
    type: AGREGAR_TAREA_EXITO,
    payload: tarea
});

const agregarTareaError = (estado) => ({
    type: AGREGAR_TAREA_ERROR,
    payload: estado
});


export function obtenerTarea(){
    return async(dispatch) =>{
        dispatch(descargarTareas());
        try{
            const respuesta = await clienteAxios.get('/tareas');
            dispatch(descargaExitosa(respuesta.data))
        }catch(error){
            dispatch(descargaError())
        }
    }
}

const descargarTareas = () =>({
    type: DESCARGA_TAREA,
    payload: true
})

const descargaExitosa = (tarea) =>({
    type: DESCARGA_EXITO,
    payload: tarea
})

const descargaError = () =>({
    type: DESCARGA_ERROR,
    payload: true
})

export function eliminarTareaAction(id){
    return async(dispatch) =>{
        dispatch(eliminarTarea(id));
        try{
            await clienteAxios.delete(`/tareas/${id}`)
            dispatch(eliminarTareaExito());
            Swal.fire(
                'Eliminado',
                'La tarea se elimino correctamente',
                'success'
              )
        }catch(error){
            dispatch(eliminarError())
        }
    }
}

export const eliminarTarea = id => ({
    type: ELIMINAR_TAREA,
    payload: id
});

const eliminarTareaExito = id =>({
    type: ELIMINAR_EXITO
});

const eliminarError = () =>({
    type: ELIMINAR_ERROR,
    payload: true
})

export function editarTareaAction(tarea){
    return(dispatch) => {
        dispatch(editarTarea(tarea))
    }
}

const editarTarea = tarea => ({
    type: EDITAR_TAREA,
    payload: tarea
})

export function editarNuevaTareaAction(tarea){
    return async (dispatch) => {
        dispatch(editarNuevaTarea(tarea));
        try{
            await clienteAxios.put(`/tareas/${tarea.id}`, tarea);
            dispatch(editarTareaExito(tarea));
        }catch(error){
            dispatch(editarTareaError())
        }
    }
}

const editarNuevaTarea = () => ({
    type: COMENZAr_EDITAR

});

const editarTareaExito = tarea =>({
    type:  EDITAR_EXITO,
    payload: tarea
});

const editarTareaError = () => ({
    type: EDITAR_ERROR,
    payload: true
})