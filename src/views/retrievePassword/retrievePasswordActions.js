import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import { ObjectToUrl, sleep } from '../../utils'
import { ToastAndroid } from 'react-native'

export const retrievePassword = param => async (dispatch) => {
    try {
        const { mobileNo, vcode, password } = param
        // console.log(param)
        dispatch({ type: reduxActionTypes.retrievePassword.retrieve_password_waiting, payload: {} })
        const url = `${base_host}/phone/${mobileNo}/supervisePassword`
        // console.log('url', url)
        const res = await httpRequest.put(url, {
            signCode: vcode,
            password
        })
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.retrievePassword.retrieve_password_success, payload: {} })
            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.retrievePassword.retrieve_password_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.retrievePassword.retrieve_password_error, payload: { errorMsg: `${err}` } })
    }
}