import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../../reduxActionTypes'

const initialState = {
    data: {
        homeStatistics: {}
    },
    getHomeStatistics: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.homeStatistics.get_homeStatistics_success)]: (state, action) => {
        const { payload: { homeStatistics } } = action
        return {
            ...state,
            data: {
                homeStatistics
            },
            getHomeStatistics: {
                ...state.getHomeStatistics,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.homeStatistics.get_homeStatistics_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHomeStatistics: {
                ...state.getHomeStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.homeStatistics.get_homeStatistics_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHomeStatistics: {
                ...state.getHomeStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.homeStatistics.get_homeStatistics_waiting)]: (state, action) => {
        return {
            ...initialState,
            getHomeStatistics: {
                ...initialState.getHomeStatistics,
                isResultStatus: 1
            }
        }
    }

}, initialState)