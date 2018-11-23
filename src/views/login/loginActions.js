import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
import { base_host } from '../../configs/Host'
import requestHeaders from '../../utils/RequestHeaders'
import { ObjectToUrl } from '../../utils'
import { ToastAndroid } from 'react-native'
import * as android_app from '../../configs/android_app.json'

export const cleanLogin = param => (dispatch, getState) => {
    // const { loginReducer: { data: { user } } } = getState()
     console.log('param',param)
    
    localStorage.save({
        key: localStorageKey.USER,
        data: {
            phone: param.phone
        }
    })
    dispatch({ type: reduxActionTypes.login.clean_login, payload: { phone: param.phone } })
}

export const login = (param, tryCount = 1) => async (dispatch, getState) => {
    try {
        // console.log('android_app', android_app)
        // console.log('param', param)
        dispatch({ type: reduxActionTypes.login.login_waiting, payload: {} })
        const { phone, password } = param
        const { initViewReducer: { data: {
            version: { currentVersion },
            deviceInfo: { deviceToken } } } } = getState()
        const url = `${base_host}/superviseLogin${ObjectToUrl({
            version: currentVersion,
            appType: `${android_app.appType}`,
            deviceType: 1,
            deviceToken
        })}`
        // console.log('url', url)
        const res = await httpRequest.post(url, { phone, password })
        // console.log('res', res)
        if (res.success) {
            if (res.result.type == 0) {
                const getUserInfoUrl = `${base_host}/supervise${ObjectToUrl({ superviseId: res.result.superviseId })}`
                // console.log('getUserInfoUrl', getUserInfoUrl)
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                // console.log('getUserInfoRes', getUserInfoRes)
                if (getUserInfoRes.success) {
                    const { id, phone, user_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
                    const user = {
                        id, phone, user_name, type, gender, avatar_image, status,
                        token: res.result.accessToken
                    }
                    // console.log('user', user)
                    // console.log('auth-token', res.result.accessToken)
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', phone)
                    requestHeaders.set('user-id', id)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    dispatch({ type: reduxActionTypes.login.login_success, payload: { user } })

                } else {
                    ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.showWithGravity(`登陆失败：身份错误！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.showWithGravity(`登陆失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(login(param, tryCount + 1))
            } else {
                ToastAndroid.showWithGravity(`登陆失败：网络链接失败！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            ToastAndroid.showWithGravity(`登陆失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: `${err}` } })
        }
    }

}