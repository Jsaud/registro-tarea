import {
    ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_ERROR, DOWNLOAD_TASK, DOWNLOAD_SUCCESS, DOWNLOAD_ERROR, DELETE_TASK, DELETE_SUCCESS, DELETE_ERROR, EDIT_TASK, BEGIN_EDIT_TASK, EDIT_TASK_SUCCESS, EDIT_TASK_ERROR
} from '../types';
import axiosAPI from '../config/axios';
import Swal from 'sweetalert2';

export function createNewTask(task) {
    return async (dispatch) => {
        dispatch(addTask());

        try {
            await axiosAPI.post('/tasks', task);
            dispatch(addTaskSuccess(task));
            Swal.fire(
                'Correcto',
                'La tarea se ha agregado correctamente',
                'success'
            )
        } catch (error) {
            dispatch(addTaskError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const addTask = () => ({ type: ADD_TASK, payload: true });
const addTaskSuccess = (task) => ({ type: ADD_TASK_SUCCESS, payload: task });
const addTaskError = (state) => ({ type: ADD_TASK_ERROR, payload: state });

export function getTask() {
    return async (dispatch) => {
        dispatch(downloadTasks());
        try {
            const response = await axiosAPI.get('/tasks');
            dispatch(downloadSuccess(response.data))
        } catch (error) {
            dispatch(downloadError())
        }
    }
}

const downloadTasks = () => ({ type: DOWNLOAD_TASK, payload: true })
const downloadSuccess = (task) => ({ type: DOWNLOAD_SUCCESS, payload: task })
const downloadError = () => ({ type: DOWNLOAD_ERROR, payload: true })

export function deleteTaskAction(id) {
    return async (dispatch) => {
        dispatch(deleteTask(id));
        try {
            await axiosAPI.delete(`/tasks/${id}`)
            dispatch(deleteTaskSuccess());
            Swal.fire(
                'Eliminado',
                'La tarea se elimino correctamente',
                'success'
            )
        } catch (error) {
            dispatch(deleteTaskError())
        }
    }
}

export const deleteTask = id => ({ type: DELETE_TASK, payload: id });
const deleteTaskSuccess = id => ({ type: DELETE_SUCCESS });
const deleteTaskError = () => ({ type: DELETE_ERROR, payload: true });

export function editTaskAction(task) {
    return (dispatch) => {
        dispatch(editTask(task))
    }
}

const editTask = task => ({ type: EDIT_TASK, payload: task })

export function editNewTaskAction(task) {
    return async (dispatch) => {
        dispatch(editNewTask(task));
        try {
            await axiosAPI.put(`/tasks/${task.id}`, task);
            dispatch(editTaskSuccess(task));
            Swal.fire(
                'Correcto',
                'La tarea se ha modificado correctamente',
                'success'
            )
        } catch (error) {
            dispatch(editTaskError());
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const editNewTask = () => ({ type: BEGIN_EDIT_TASK });
const editTaskSuccess = task => ({ type: EDIT_TASK_SUCCESS, payload: task });
const editTaskError = () => ({ type: EDIT_TASK_ERROR, payload: true })

