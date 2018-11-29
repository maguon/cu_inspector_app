import * as reduxActionTypes from '../../reduxActionTypes'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import { ObjectToUrl } from '../../utils'
import requestHeaders from '../../utils/RequestHeaders'
import * as android_app from '../../configs/android_app.json'
import { sleep } from '../../utils'
import XGPush from 'react-native-xinge-push'
import { ToastAndroid ,Platform} from 'react-native'
import XGPushConfig from '../../configs/XGPushConfig.json'
import { Actions } from 'react-native-router-flux'
// import moment = require('moment');
import DeviceInfo from 'react-native-device-info'

/** 
 * 
 * initApp : APP初始化
 * 
 * param : 对应执行步骤执行时所需要的参数
 * currentStep : 执行到第N步（从1开始）
 * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
 * 
 * 
 * 初始化流程：
 * 第一步：验证版本是否是最新版本
 * 第二步：获取deviceToken
 * 第三步：获取本地localstorage的数据
 * 第四步：换network request所需要的token
 */

//第一步：获取最新version信息
export const validateVersion = (tryCount = 1) => async (dispatch, getState) => {
    // console.log('android_app', android_app)
    const currentStep = 1
    try {

        // console.log('android_app', android_app)
        const url = `${base_host}/app${ObjectToUrl({ type: android_app.OS })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            const currentVersionArr = android_app.version.split('.')
            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })

            //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            if (versionInfo.force_update != 1) {
                // console.log('versionInfo', versionInfo)
                await dispatch({ type: reduxActionTypes.initView.valdate_version_success, payload: { versionInfo, step: currentStep } })
                // console.log('getState', getState())
                dispatch(initPush())
                // dispatch(loadLocalStorage())
            } else {
                dispatch({ type: reduxActionTypes.initView.valdate_version_low, payload: { versionInfo, step: currentStep } })
            }
        } else {
            dispatch({ type: reduxActionTypes.initView.valdate_version_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`初始化错误:${err}`, 10)
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(validateVersion(tryCount + 1))
            } else {
                dispatch({ type: reduxActionTypes.initView.valdate_version_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.initView.valdate_version_error, payload: { errorMsg: `${err}` } })
        }
    }
}


//第二步：获取deviceToken
export const initPush = () => async (dispatch) => {
    const currentStep = 2
    try {
        XGPush.init(XGPushConfig.ACCESSID, XGPushConfig.ACCESSKEY)
        // console.log('start',new Date())
        const deviceToken = await XGPush.register()
        // console.log('end',new Date())
        const deviceId = DeviceInfo.getSerialNumber();
        // console.log('deviceToken',deviceToken)
        // console.log('DeviceInfo',DeviceInfo)
        // console.log('deviceId',Platform)
        // ToastAndroid.show(deviceId,20)
        if (deviceToken) {
            dispatch({ type: reduxActionTypes.initView.init_XGPush_success, payload: { deviceToken, step: currentStep } })
            dispatch(loadLocalStorage())
        } else {
            dispatch({ type: reduxActionTypes.initView.init_XGPush_failed, payload: { failedMsg: '获取deviceToken错误：deviceToken为空！' } })
        }
    } catch (err) {
        ToastAndroid.show(`初始化错误:${err}`, 10)
        console.log('err', err)
        dispatch({ type: reduxActionTypes.initView.init_XGPush_error, payload: { errorMsg: `${err}` } })
    }
}


//第三步：获取localStorage中的user数据
export const loadLocalStorage = () => async (dispatch) => {
    const currentStep = 3
    try {
        // localStorage.remove({ key: localStorageKey.USER })

        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        // console.log('localStorageRes', localStorageRes)

        if (localStorageRes.token && localStorageRes.id) {
            // console.log('localStorageRes', localStorageRes)
            dispatch({ type: reduxActionTypes.initView.load_localStorage_success, payload: { userlocalStorage: localStorageRes, step: currentStep } })
            dispatch(validateToken())
        }
        else {
            if (localStorageRes.phone) {
                dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user: { phone: localStorageRes.phone } } })
            } else {
                dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user: {} } })
            }
            dispatch({ type: reduxActionTypes.initView.load_localStorage_failed, payload: { failedMsg: 'localStorage数据不全！' } })
            Actions.mainRoot()
        }
    } catch (err) {
        // ToastAndroid.show(`初始化错误:${err}`, 10)
        // console.log('err', err)
        if (err.name == 'NotFoundError') {
            dispatch({ type: reduxActionTypes.initView.load_localStorage_error, payload: { errorMsg: `${err}` } })

        } else {
            localStorage.remove({ key: localStorageKey.USER })
            dispatch({ type: reduxActionTypes.initView.load_localStorage_error, payload: { errorMsg: `${err}` } })
        }
        Actions.mainRoot()
    }

}

//第四步:更换service-token ,如果更新成功将登陆数据放入userReducer
export const validateToken = (tryCount = 1) => async (dispatch, getState) => {
    const currentStep = 4
    try {
        const { initViewReducer: { data: { userlocalStorage: { id, token } } } } = getState()
        const url = `${base_host}/supervise/${id}/token/${token}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            const getUserInfoUrl = `${base_host}/supervise${ObjectToUrl({ superviseId: res.result.superviseId })}`
            // console.log('getUserInfoUrl', getUserInfoUrl)
            const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
            // console.log('getUserInfoRes', getUserInfoRes)

            if (getUserInfoRes.success) {
                const { id, phone, user_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
                const user = {
                    id, phone, user_name, type, gender, avatar_image, status,
                    token: res.result.accessToken,
                }
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: user })
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', type)
                requestHeaders.set('user-name', phone)
                requestHeaders.set('user-id', id)
                dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user } })
                dispatch({ type: reduxActionTypes.initView.validate_token_success, payload: { step: currentStep } })
                Actions.mainRoot()
                // console.log('getState', getState())

            } else {
                ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.initView.validate_token_failed, payload: { failedMsg: '无法获取用户信息！' } })

            }
        }
        else {
            //判断请求是否成功，如果失败，跳转到登录页
            dispatch({ type: reduxActionTypes.initView.validate_token_failed, payload: { failedMsg: res.msg } })
            Actions.mainRoot()
        }
    } catch (err) {
        ToastAndroid.show(`初始化错误:${err}`, 10)
        // console.log('err', err)
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(validateToken(tryCount + 1))
            } else {
                dispatch({ type: reduxActionTypes.initView.validate_token_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.initView.validate_token_error, payload: { errorMsg: `${err}` } })
            Actions.mainRoot()
        }
    }
}


export const initWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.initView.init_app_waiting, payload: {} })
}