import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNewTask } from '../actions/tasksActions';
import { showAlertAction, hideAlertAction } from '../actions/alertActions';

const NewTask = ({ history }) => {

    const [name, saveName] = useState('');
    const [priority, savePriority] = useState('');

    const dispatch = useDispatch();

    const loading = useSelector(state => state.tasks.loading);
    const error = useSelector(state => state.tasks.error);
    const alerta = useSelector(state => state.alerta.alerta)

    const addTask = (task) => dispatch(createNewTask(task));

    const submitNewTask = e => {
        e.preventDefault();

        if (name.trim() === '' || priority.trim() === '') {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch(showAlertAction(alerta));
            return;
        }
        dispatch(hideAlertAction());

        addTask({
            name,
            priority
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
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form onSubmit={submitNewTask}>
                            <div className="form-group">
                                <label>Nombre Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Tarea"
                                    name="name"
                                    value={name}
                                    onChange={e => saveName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Prioridad Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Prioridad Tarea"
                                    name="priority"
                                    value={priority}
                                    onChange={e => savePriority(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        {loading ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p-2 mt-2 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTask;