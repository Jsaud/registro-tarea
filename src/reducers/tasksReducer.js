import {
    ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_ERROR, DOWNLOAD_TASK, DOWNLOAD_SUCCESS, DOWNLOAD_ERROR, DELETE_TASK, DELETE_SUCCESS, DELETE_ERROR, EDIT_TASK, EDIT_TASK_SUCCESS, EDIT_TASK_ERROR
} from '../types';

const initialState = {
    tasks: [],
    error: null,
    loading: false,
    deleteTask: null,
    editTask: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DOWNLOAD_TASK:
        case ADD_TASK:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload]
            }
        case DOWNLOAD_ERROR:
        case ADD_TASK_ERROR:
        case DELETE_ERROR:
        case EDIT_TASK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tasks: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                deleteTask: action.payload
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== state.deleteTask),
                deleteTask: null
            }
        case EDIT_TASK:
            return {
                ...state,
                editTask: action.payload
            }
        case EDIT_TASK_SUCCESS:
            return {
                ...state,
                editTask: null,
                task: state.tasks.map(task =>
                    task.id === action.payload.id ? task = action.payload : task
                )
            }
        default:
            return state;
    }
}