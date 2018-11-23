import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import { InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'

export const getQrCode = param => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.scan.get_qrCode_waiting })
        const { url, sceneKey } = param
        // console.log('url', url)
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.scan.get_qrCode_success, payload: {} })
            Actions.peccancyCommit({ QrCodeInfo: res.result[0], previousViewName: sceneKey })
            InteractionManager.runAfterInteractions(() => dispatch({ type: reduxActionTypes.scan.get_qrCode_init }))
        } else {
            dispatch({ type: reduxActionTypes.scan.get_qrCode_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.scan.get_qrCode_error, payload: { errorMsg: `${err}` } })
    }
}
