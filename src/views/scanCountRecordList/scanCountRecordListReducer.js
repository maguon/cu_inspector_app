import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        scanCountRecordList: [],
        search: null,
        isComplete: false,
        isModalVisible:false
    },
    getScanCountList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getScanCountListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordList_success)]: (state, action) => {
        const { payload: { scanCountRecordList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                scanCountRecordList,
                isComplete,
                //search
            },
            getScanCountList: {
                ...state.getScanCountList,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getScanCountList: {
                ...state.getScanCountList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getScanCountList: {
                ...state.getScanCountList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getScanCountList: {
                ...initialState.getScanCountList,
                isResultStatus: 1
            }
        }
    },



    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_success)]: (state, action) => {
        const { payload: { scanCountRecordList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                scanCountRecordList: [...state.data.scanCountRecordList, ...scanCountRecordList],
                isComplete
            },
            getScanCountListMore: {
                ...initialState.getScanCountListMore,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_waiting)]: (state, action) => {
        return {
            ...state,
            getScanCountListMore: {
                ...initialState.getScanCountListMore,
                isResultStatus: 1,
            }
        }
    },
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getScanCountListMore: {
                ...initialState.getScanCountListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getScanCountListMore: {
                ...initialState.getScanCountListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [(reduxActionTypes.scanCountRecordList.setModalVisible)]: (state, action) => {
        const { payload: { isModalVisible } } = action
        return {
            ...state,
            data:{
                ...state.data,
                isModalVisible
            }
        }
    }

}, initialState)