import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import { sleep, ObjectToUrl } from '../../utils'
import { ToastAndroid } from 'react-native'

const pageSize = 50

export const getPeccancyList = param => async (dispatch, getState) => {
    try {
        const { dateId } = param
        const { loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/supervise/${id}/checkCar${ObjectToUrl({
            dateId,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.peccancyList.get_peccancyList_success, payload: {
                    peccancyList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.peccancyList.get_peccancyList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.peccancyList.get_peccancyList_error, payload: { errorMsg: err } })
    }
}


export const getPeccancyListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.peccancyList.get_peccancyList_waiting, payload: {} })
}

export const getPeccancyListMore = param => async (dispatch, getState) => {

    const { dateId } = param
    const { loginReducer: { data: { user: { id } } },
        peccancyListReducer: { data: { peccancyList, isComplete } },
        peccancyListReducer } = getState()

    if (peccancyListReducer.getPeccancyListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getPeccancyListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.peccancyList.get_peccancyListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/supervise/${id}/checkCar${ObjectToUrl({
                    dateId,
                    start: peccancyList.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.peccancyList.get_peccancyListMore_success, payload: {
                            peccancyList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.peccancyList.get_peccancyListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: reduxActionTypes.peccancyList.get_peccancyListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}