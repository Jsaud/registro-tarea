import React, {useState,  useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {editarNuevaTareaAction} from '../actions/tareasActions';
import {useHistory} from 'react-router-dom';

const EditarTarea = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [tarea, guardarTarea] = useState({
        nombre:'',
        prioridad: ''
    });

    const tareaEditar = useSelector(state => state.tareas.tareaeditar);
    
    useEffect(() => {
        guardarTarea(tareaEditar);
    }, [tareaEditar]);

    const onchangeFormulario = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, prioridad} = tarea;

    const submitEditarTarea = e => {
        e.preventDefault();
        dispatch(editarNuevaTareaAction(tarea));
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Tarea
                        </h2>
                        <form
                            onSubmit={submitEditarTarea}
                        >
                            <div className="form-group">
                                <label>Nombre Tarea</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Tarea"
                                name="nombre"
                                value={nombre}
                                onChange={onchangeFormulario}
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
                                onChange={onchangeFormulario}
                            />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarTarea;