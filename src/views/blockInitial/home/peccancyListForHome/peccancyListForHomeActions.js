import * as reduxActionTypes from '../../../../reduxActionTypes'
import httpRequest from '../../../../utils/HttpRequest'
import { base_host } from '../../../../configs/Host'
import { ObjectToUrl ,sleep} from '../../../../utils'
import moment from 'moment'
import { ToastAndroid } from 'react-native'

const pageSize = 50

export const getPeccancyListForHome = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/supervise/${id}/checkCar${ObjectToUrl({
            dateId: moment('20181018').format('YYYYMMDD'),
            start: 0,
            size: pageSize
        })}}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        //  console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHome_success, payload: { peccancyList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHome_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHome_error, payload: { errorMsg: `${err}` } })
    }
}


export const getPeccancyListForHomeWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHome_waiting, payload: {} })
}


export const getPeccancyListForHomeMore = () => async (dispatch, getState) => {
    // const { dateId } = param
    const { loginReducer: { data: { user: { id } } },
        peccancyListForHomeReducer: { data: { peccancyList, isComplete } },
        peccancyListForHomeReducer } = getState()

    if (peccancyListForHomeReducer.getPeccancyListForHomeMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getPeccancyListForHomeMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_waiting, payload: {} })
            try {
                const url = `${base_host}/supervise/${id}/checkCar${ObjectToUrl({
                    dateId: moment('20181018').format('YYYYMMDD'),
                    start: peccancyList.length,
                    size: pageSize
                })}}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_success, payload: {
                            peccancyList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: reduxActionTypes.peccancyListForHome.get_peccancyListForHomeMore_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}