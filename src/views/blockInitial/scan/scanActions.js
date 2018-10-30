import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'

export const getQrCode = (url, navigation) => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.scan.get_qrCode_waiting })
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.scan.get_qrCode_success, payload: {} })
            navigation.navigate('PeccancyCommit', { QrCodeInfo: res.result[0] })
        } else {
            dispatch({ type: reduxActionTypes.scan.get_qrCode_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log(err)
        dispatch({ type: reduxActionTypes.scan.get_qrCode_error, payload: { errorMsg: `${err}` } })
    }
}