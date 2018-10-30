import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        peccancyList: [],
        isComplete: false
    },
    getPeccancyList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getPeccancyListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.peccancyList.get_peccancyList_success)]: (state, action) => {
        const { payload: { peccancyList, isComplete } } = action
        return {
            ...state,
            data: {
                peccancyList,
                isComplete
            },
            getPeccancyList: {
                ...state.getPeccancyList,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyList.get_peccancyList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyList: {
                ...state.getPeccancyList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyList.get_peccancyList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyList: {
                ...state.getPeccancyList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.peccancyList.get_peccancyList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getPeccancyList: {
                ...initialState.getPeccancyList,
                isResultStatus: 1
            }
        }
    },



    [(reduxActionTypes.peccancyList.get_peccancyListMore_success)]: (state, action) => {
        const { payload: { peccancyList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                peccancyList: [...state.data.peccancyList, ...peccancyList],
                isComplete
            },
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyList.get_peccancyListMore_waiting)]: (state, action) => {
        return {
            ...state,
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 1,
            }
        }
    },
    [(reduxActionTypes.peccancyList.get_peccancyListMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyList.get_peccancyListMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)