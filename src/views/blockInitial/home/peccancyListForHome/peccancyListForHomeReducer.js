import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../../reduxActionTypes'

const initialState = {
    data: {
        peccancyList: [],
        isComplete:false
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
    },
    changePeccancyStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.peccancyListForHome.get_peccancyListForHome_success)]: (state, action) => {
        const { payload: { peccancyList,isComplete } } = action
        return {
            ...state,
            data: {
                peccancyList,
                isComplete
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
    },





    [(reduxActionTypes.peccancyListForHome.change_peccancyStatus_success)]: (state, action) => {
        const { payload: { peccancyId } } = action
        return {
            ...state,
            data: {
                peccancyList: state.data.peccancyList.filter(item=>item.id!=peccancyId)
            },
            changePeccancyStatus: {
                ...state.changePeccancyStatus,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.change_peccancyStatus_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            changePeccancyStatus: {
                ...state.changePeccancyStatus,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.change_peccancyStatus_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            changePeccancyStatus: {
                ...state.changePeccancyStatus,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.peccancyListForHome.change_peccancyStatus_waiting)]: (state, action) => {
        return {
            ...state,
            changePeccancyStatus: {
                ...initialState.changePeccancyStatus,
                isResultStatus: 1
            }
        }
    }

}, initialState)