import {
    SHOW_ALERT, HIDE_ALERT
} from '../types';

export function showAlertAction(alerta) {
    return (dispatch) => {
        dispatch(createAlert(alerta))
    }
}

const createAlert = alerta => ({ type: SHOW_ALERT, payload: alerta })

export function hideAlertAction() {
    return (dispatch) => {
        dispatch(hideAlert())
    }
}

const hideAlert = () => ({ type: HIDE_ALERT }) 