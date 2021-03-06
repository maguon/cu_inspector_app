import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import { InteractionManager, ToastAndroid,Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { isURL } from '../../../utils/Validator'

export const getQrCode = param => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.scan.get_qrCode_waiting })
        const { url, sceneKey } = param
        // console.log('url', url)
        if (isURL(url)) {
            const res = await httpRequest.get(url)
            // console.log('res', res)
            if (res.success) {
                if (res.result[0]) {
                    dispatch({ type: reduxActionTypes.scan.get_qrCode_success, payload: {} })
                    Actions.peccancyCommit({ QrCodeInfo: res.result[0], previousViewName: sceneKey })
                    InteractionManager.runAfterInteractions(() => dispatch({ type: reduxActionTypes.scan.get_qrCode_init }))
                } else {
                    dispatch({ type: reduxActionTypes.scan.get_qrCode_failed, payload: { failedMsg: `返回空值` } })
                    ToastAndroid.show('二维码错误，请求返回空值！', 10)
                }
            } else {
                ToastAndroid.show(`二维码错误，${res.msg}！`, 10)
                dispatch({ type: reduxActionTypes.scan.get_qrCode_failed, payload: { failedMsg: `${res.msg}` } })
            }
        } else {
            ToastAndroid.show('二维码错误，无法识别！', 10)
            // Alert.alert(
            //     'Alert Title',
            //     'My Alert Msg',
            //     [
            //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            //     ],
            //     { cancelable: false }
            //   )
            dispatch({ type: reduxActionTypes.scan.get_qrCode_error, payload: { errorMsg: `` } })
        }
    } catch (err) {
        console.log('err', err)
        // Alert.alert(
        //     'Alert Title',
        //     'My Alert Msg',
        //     [
        //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //     ],
        //     { cancelable: false }
        //   )
        ToastAndroid.show('二维码错误，无法识别！', 10)
        dispatch({ type: reduxActionTypes.scan.get_qrCode_error, payload: { errorMsg: `${err}` } })
    }
}
