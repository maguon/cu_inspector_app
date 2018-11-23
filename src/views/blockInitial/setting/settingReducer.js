import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    modifySuperviseAvatarImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(reduxActionTypes.setting.modify_superviseAvatarImage_success)]: (state, action) => {
        return {
            ...state,
            modifySuperviseAvatarImage: {
                ...state.modifySuperviseAvatarImage,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.setting.modify_superviseAvatarImage_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifySuperviseAvatarImage: {
                ...state.modifySuperviseAvatarImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.setting.modify_superviseAvatarImage_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifySuperviseAvatarImage: {
                ...state.modifySuperviseAvatarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.setting.modify_superviseAvatarImage_waiting)]: (state, action) => {
        return {
            ...state,
            modifySuperviseAvatarImage: {
                ...initialState.modifySuperviseAvatarImage,
                isResultStatus: 1
            }
        }
    }

}, initialState)