import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../../reduxActionTypes'

const initialState = {
    data: {
        peccancyList: []
    },
    getPeccancyListForHome: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getPeccancyListForHomeMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHome_success)]: (state, action) => {
        const { payload: { peccancyList } } = action
        return {
            ...state,
            data: {
                peccancyList
            },
            getPeccancyListForHome: {
                ...state.getPeccancyListForHome,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHome_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyListForHome: {
                ...state.getPeccancyListForHome,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHome_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyListForHome: {
                ...state.getPeccancyListForHome,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHome_waiting)]: (state, action) => {
        return {
            ...initialState,
            getPeccancyListForHome: {
                ...initialState.getPeccancyListForHome,
                isResultStatus: 1
            }
        }
    },




    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_success)]: (state, action) => {
        const { payload: { peccancyList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                peccancyList: [...state.data.peccancyList, ...peccancyList],
                isComplete
            },
            getPeccancyListForHomeMore: {
                ...initialState.getPeccancyListForHomeMore,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_waiting)]: (state, action) => {
        return {
            ...state,
            getPeccancyListForHomeMore: {
                ...initialState.getPeccancyListForHomeMore,
                isResultStatus: 1,
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyListForHomeMore: {
                ...initialState.getPeccancyListForHomeMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyListForHomeMore: {
                ...initialState.getPeccancyListForHomeMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)