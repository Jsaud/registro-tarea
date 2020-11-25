import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { editNewTaskAction } from '../actions/tasksActions';


const EditTask = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [task, saveTask] = useState({
        name: '',
        priority: ''
    });

    const editTask = useSelector(state => state.tasks.editTask);

    useEffect(() => {
        saveTask(editTask);
    }, [editTask]);

    const onChangeForm = e => {
        saveTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const { name, priority } = task;

    const submitEditTask = e => {
        e.preventDefault();
        dispatch(editNewTaskAction(task));
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
                            onSubmit={submitEditTask}
                        >
                            <div className="form-group">
                                <label>Nombre Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Tarea"
                                    name="name"
                                    value={name}
                                    onChange={onChangeForm}
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
                                    onChange={onChangeForm}
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

export default EditTask;