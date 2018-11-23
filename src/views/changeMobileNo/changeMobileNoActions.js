import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import requestHeaders from '../../utils/RequestHeaders'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import { sleep } from '../../utils'
import { ToastAndroid } from 'react-native'


export const changeMobileNo = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { mobileNo, vCode } = param
        const { loginReducer: { data: { user: { id } } } } = getState()
        dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_waiting, payload: {} })
        const url = `${base_host}/supervise/${id}/phone`
        // console.log('url', url)
        const res = await httpRequest.put(url, {
            phone: mobileNo,
            signCode: vCode
        })
        // console.log('res', res)
        if (res.success) {
            ToastAndroid.show('换绑成功！',10)
            dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_success, payload: {} })
            dispatch(reduxActions.login.cleanLogin({ phone: '' }))
        } else {
            dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_error, payload: { errorMsg: `${err}` } })
    }
}


