import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'
import { sleep, ObjectToUrl } from '../../utils'

export const changePassword = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { oldPassword, newPassword } = param
        dispatch({ type: reduxActionTypes.changePassword.change_password_waiting, payload: {} })
        const { loginReducer: { data: { user: { id, phone } } } } = getState()
        const url = `${base_host}/supervise/${id}/password`
        const res = await httpRequest.put(url, {
            originPassword: oldPassword,
            newPassword
        })
        // console.log('res', res)
        if (res.success) {
            ToastAndroid.show('修改成功！', 10)
            dispatch({ type: reduxActionTypes.changePassword.change_password_success, payload: {} })
            dispatch(reduxActions.login.cleanLogin({ phone: phone }))

        } else {
            dispatch({ type: reduxActionTypes.changePassword.change_password_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.changePassword.change_password_error, payload: { errorMsg: `${err}` } })
    }
}