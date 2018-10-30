import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    changePassword: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.changePassword.change_password_success)]: (state, action) => {
        return {
            ...state,
            changePassword: {
                ...state.changePassword,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.changePassword.change_password_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            changePassword: {
                ...state.changePassword,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.changePassword.change_password_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            changePassword: {
                ...state.changePassword,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.changePassword.change_password_waiting)]: (state, action) => {
        return {
            ...initialState,
            changePassword: {
                ...initialState.changePassword,
                isResultStatus: 1
            }
        }
    }

}, initialState)