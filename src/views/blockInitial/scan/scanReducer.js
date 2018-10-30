import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    // data: {
    //     QrCodeInfo: {}
    // },
    getQrCode: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.scan.get_qrCode_success)]: (state, action) => {
        // const { payload: { QrCodeInfo } } = action
        return {
            ...state,
            // data: {
            //     QrCodeInfo
            // },
            getQrCode: {
                ...state.getQrCode,
                isResultStatus: 2
            }
        }
    },
    [(reduxActionTypes.scan.get_qrCode_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getQrCode: {
                ...state.getQrCode,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(reduxActionTypes.scan.get_qrCode_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getQrCode: {
                ...state.getQrCode,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(reduxActionTypes.scan.get_qrCode_waiting)]: (state, action) => {
        return {
            ...initialState,
            getQrCode: {
                ...initialState.getQrCode,
                isResultStatus: 1
            }
        }
    }
}, initialState)