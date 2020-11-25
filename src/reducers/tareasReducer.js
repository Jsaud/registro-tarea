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
    EDITAR_EXITO,
    EDITAR_ERROR

} from '../types';

const initialState = {
    tareas: [],
    error: null,
    loading: false,
    tareaeliminar: null,
    tareaeditar: null
}

export default function(state = initialState, action){
    switch(action.type){
        case DESCARGA_TAREA:
        case AGREGAR_TAREA:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_TAREA_EXITO:
            return{
                ...state,
                loading: false,
                tareas: [...state.tareas, action.payload]
            }
        case DESCARGA_ERROR:
        case AGREGAR_TAREA_ERROR:
        case ELIMINAR_ERROR:
        case EDITAR_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                tareas: action.payload
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareaeliminar: action.payload
            }
        case ELIMINAR_EXITO:
            return{
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== state.tareaeliminar),
                tareaeliminar: null
            }
        case EDITAR_TAREA:
            return{
                ...state,
                tareaeditar:action.payload
            }
        case EDITAR_EXITO:
            return{
                ...state,
                tareaeditar: null,
                tarea: state.tareas.map(tarea =>
                 tarea.id === action.payload.id ? tarea = action.payload : tarea   
                    )
            }
        default:
            return state;
    }
}