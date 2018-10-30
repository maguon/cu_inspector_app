import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import { sleep, ObjectToUrl } from '../../utils'

import { ToastAndroid } from 'react-native'

export const changePassword = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { oldPassword, newPassword } = param
        dispatch({ type: reduxActionTypes.changePassword.change_password_waiting, payload: {} })

        const { loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/supervise/${id}/password`
        // console.log('url', url)
        // console.log('param', {
        //     originPassword: oldPassword,
        //     newPassword
        // })
        const res = await httpRequest.put(url, {
            originPassword: oldPassword,
            newPassword
        })
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.changePassword.change_password_success, payload: {} })
        } else {
            dispatch({ type: reduxActionTypes.changePassword.change_password_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.changePassword.change_password_error, payload: { errorMsg: `${err}` } })
    }
}