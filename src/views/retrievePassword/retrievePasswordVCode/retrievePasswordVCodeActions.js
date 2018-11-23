import * as reduxActionTypes from '../../../reduxActionTypes'
import requestHeaders from '../../../utils/RequestHeaders'
import httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import { sleep } from '../../../utils'
import { ToastAndroid } from 'react-native'

export const countDown = () => async (dispatch, getState) => {
    const { retrievePasswordVCodeReducer: { data: { countDownTime } } } = getState()
    try {
        if (countDownTime > 0) {
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.countDownForRetrievePassword_start, payload: { countDownTime: countDownTime - 1 } })
            await sleep(1000)
            dispatch(countDown())
        } else {
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.countDownForRetrievePassword_end, payload: { countDownTime: 60 } })
        }
    } catch (err) {
        ToastAndroid.show(`倒计时错误！`, 10)
    }
}


export const getVCode = param => async (dispatch) => {
    try {
        // const {loginReducer: { data: { user: { id } } }} =getState()
        dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_waiting, payload: {} })
        const url = `${base_host}/phone/${param}/supervisePswdSms`
        // console.log('url', url)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_success, payload: {} })
            dispatch(countDown())
        } else {
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_error, payload: { errorMsg: `${err}` } })
    }
}