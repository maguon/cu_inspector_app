import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        imageList: []
    },
    getPeccancyImageList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.peccancyInfo.get_peccancyImageList_success)]: (state, action) => {
        const { payload: { imageList } } = action
        // console.log('imageList',imageList)
        return {
            ...state,
            data: {
                imageList
            },
            getPeccancyImageList: {
                ...state.getPeccancyImageList,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyInfo.get_peccancyImageList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyImageList: {
                ...state.getPeccancyImageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyInfo.get_peccancyImageList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyImageList: {
                ...state.getPeccancyImageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.peccancyInfo.get_peccancyImageList_waiting)]: (state, action) => {
        return {
            ...state,
            getPeccancyImageList: {
                ...initialState.getPeccancyImageList,
                isResultStatus: 1
            }
        }
    },
    [(reduxActionTypes.peccancyInfo.clean_peccancyImageList)]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)