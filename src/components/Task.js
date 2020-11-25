import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';

import { deleteTaskAction, editTaskAction } from '../actions/tasksActions'

const Task = ({ task }) => {
    const { name, priority, id } = task;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDeleteTask = id => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará una tarea",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTaskAction(id));
            }
        })
    }

    const redirectTask = task => {
        dispatch(editTaskAction(task));
        history.push(`/tasks/edit/${task.id}`)
    }

    return (
        <tr>
            <td>{name}</td>
            <td><span className="font-weigth-bold">{priority}</span></td>
            <td className="actions">
                <button
                    type="button"
                    onClick={() => redirectTask(task)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteTask(id)}
                >Eliminar
                </button>
            </td>
        </tr>
    );
}

export default Task;