import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        address: {},
        imageInfoList: [],
        imagePushCount: 0,
        imagePushIndex: 0
    },
    getAddressByCoordinate: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    commitPeccancy: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.peccancyCommit.get_addressByCoordinate_success)]: (state, action) => {
        const { payload: { address } } = action
        return {
            ...state,
            data: {
                ...state.data,
                address
            },
            getAddressByCoordinate: {
                ...state.getAddressByCoordinate,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.get_addressByCoordinate_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAddressByCoordinate: {
                ...state.getAddressByCoordinate,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.get_addressByCoordinate_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAddressByCoordinate: {
                ...state.getAddressByCoordinate,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.get_addressByCoordinate_waiting)]: (state, action) => {
        return {
            ...state,
            data: {
                ...state.data,
                address: {}
            },
            getAddressByCoordinate: {
                ...initialState.getAddressByCoordinate,
                isResultStatus: 1
            }
        }
    },




    [(reduxActionTypes.peccancyCommit.commit_peccancy_success)]: (state, action) => {
        return {
            ...state,
            commitPeccancy: {
                ...state.commitPeccancy,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.commit_peccancy_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            commitPeccancy: {
                ...state.commitPeccancy,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.commit_peccancy_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            commitPeccancy: {
                ...state.commitPeccancy,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.commit_peccancy_waiting)]: (state, action) => {
        return {
            ...state,
            commitPeccancy: {
                ...initialState.commitPeccancy,
                isResultStatus: 1
            }
        }
    },

    [(reduxActionTypes.peccancyCommit.push_peccancyImage_start)]: (state, action) => {
        const { payload: { imagePushCount } } = action
        // console.log('imagePushCount',imagePushCount)
        return {
            ...state,
            data: {
                ...state.data,
                imagePushCount
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.push_peccancyImage)]: (state, action) => {
        const { payload: { imagePushIndex } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imagePushIndex
            }
        }
    },


    [(reduxActionTypes.peccancyCommit.pushlocal_peccancyImage)]: (state, action) => {
        const { payload: { imageInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageInfoList: [...state.data.imageInfoList, imageInfo]
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.dellocal_peccancyImage)]: (state, action) => {
        const { payload: { imageInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageInfoList: state.data.imageInfoList.filter(item => item.path != imageInfo.path)
            }
        }
    },
    [(reduxActionTypes.peccancyCommit.cleanlocal_peccancyImage)]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)