import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        imageList: [],
        isComplete: false,
        after: ''
    },
    getPhotoStore: {
        isResultStatus: 0,
        errorMsg: ''
    },
    getPhotoStoreMore: {
        isResultStatus: 0,
        errorMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.photostore.get_photoStore_success)]: (state, action) => {
        const { payload: { imageList, isComplete, after } } = action
        return {
            ...state,
            data: {
                imageList,
                isComplete,
                after
            },
            getPhotoStore: {
                ...state.getPhotoStore,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.photostore.get_photoStore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPhotoStore: {
                ...state.getPhotoStore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.photostore.get_photoStore_waiting)]: (state, action) => {
        return {
            ...initialState,
            getPhotoStore: {
                ...initialState.getPhotoStore,
                isResultStatus: 1
            }
        }
    },




    [(reduxActionTypes.photostore.get_photoStoreMore_success)]: (state, action) => {
        const { payload: { imageList, isComplete, after } } = action
        console.log('imageList',imageList)
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                isComplete,
                after
            },
            getPhotoStoreMore: {
                ...state.getPhotoStoreMore,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.photostore.get_photoStoreMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPhotoStoreMore: {
                ...state.getPhotoStoreMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.photostore.get_photoStoreMore_waiting)]: (state, action) => {
        return {
            ...state,
            getPhotoStoreMore: {
                ...initialState.getPhotoStoreMore,
                isResultStatus: 1
            }
        }
    }



}, initialState)