import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        countDownTime: 60
    },
    countDown: {
        isResultStatus: 0
    },
    getVCode: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_success)]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_waiting)]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...initialState.getVCode,
                isResultStatus: 1
            }
        }
    },



    [(reduxActionTypes.retrievePasswordVCode.countDownForRetrievePassword_start)]: (state, action) => {
        const { payload: { countDownTime } } = action
        return {
            ...state,
            data: {
                countDownTime
            },
            countDown: {
                ...initialState.countDown,
                isResultStatus: 1
            }
        }
    },
    
    [(reduxActionTypes.retrievePasswordVCode.countDownForRetrievePassword_end)]: (state, action) => {
        const { payload: { countDownTime } } = action
        return {
            ...state,
            data: {
                countDownTime
            },
            countDown: {
                ...initialState.countDown,
                isResultStatus: 0
            }
        }
    }

}, initialState)