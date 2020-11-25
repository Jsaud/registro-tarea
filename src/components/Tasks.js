import React, { Fragment, useEffect } from 'react';
import Task from './Task'
import { useSelector, useDispatch } from 'react-redux';

import { getTask } from '../actions/tasksActions';

const Tasks = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadTasks = () => dispatch(getTask());
        loadTasks();
    }, []);

    const tasks = useSelector(state => state.tasks.tasks);
    const error = useSelector(state => state.tasks.error);
    const loading = useSelector(state => state.tasks.loading);

    return (
        <Fragment>
            <h2 className="text-center my-4">Listado de Tareas</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {loading ? <p className="text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th>Tarea</th>
                        <th>Prioridad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? 'No hay tareas' : (tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                        />
                    ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Tasks;