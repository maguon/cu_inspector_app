import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import { base_host } from '../../configs/Host'
import { ObjectToUrl, sleep } from '../../utils'
import { ToastAndroid } from 'react-native'
import moment from 'moment'

const pageSize = 50

export const getScanCountList = param => async (dispatch, getState) => {
    try {
        let searchParam = {}
        if (param) {
            searchParam = {
                dateIdStart: param.startDate ? moment(param.startDate).format('YYYYMMDD') : null,
                dateIdEnd: param.endDate ? moment(param.endDate).format('YYYYMMDD') : null
            }
        }
        // console.log('searchParam', searchParam)
        const { loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/supervise/${id}/monthStat${ObjectToUrl({
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.scanCountRecordList.get_scanCountRecordList_success, payload: {
                    scanCountRecordList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.scanCountRecordList.get_scanCountRecordList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.scanCountRecordList.get_scanCountRecordList_error, payload: { errorMsg: err } })
    }
}

export const getScanCountListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.scanCountRecordList.get_scanCountRecordList_waiting, payload: {} })
}

export const getScanCountListMore = () => async (dispatch, getState) => {
    // const { dateId } = param
    const { loginReducer: { data: { user: { id } } },
        scanCountRecordListReducer: { data: { scanCountRecordList, isComplete, search } },
        scanCountRecordListReducer } = getState()
    let searchParam = {}
    if (search) {
        searchParam = {
            dateIdStart: search.startDate ? moment(search.startDate).format('YYYYMMDD') : null,
            dateIdEnd: search.endDate ? moment(search.endDate).format('YYYYMMDD') : null
        }
    }
    // console.log('searchParam', searchParam)

    if (scanCountRecordListReducer.getScanCountListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getScanCountListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/supervise/${id}/monthStat${ObjectToUrl({
                    start: 0,
                    start: scanCountRecordList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_success, payload: {
                            scanCountRecordList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: reduxActionTypes.scanCountRecordList.get_scanCountRecordListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}

export const setModalVisible = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.scanCountRecordList.setModalVisible, payload: { isModalVisible: param.isModalVisible } })
}