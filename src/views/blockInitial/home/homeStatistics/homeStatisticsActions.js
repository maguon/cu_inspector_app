import * as reduxActionTypes from '../../../../reduxActionTypes'
import requestHeaders from '../../../../utils/RequestHeaders'
import httpRequest from '../../../../utils/HttpRequest'
import { base_host } from '../../../../configs/Host'
import moment from 'moment'

export const getHomeStatistics = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/supervise/${id}/dayStat?dateId=${moment().format('YYYYMMDD')}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.homeStatistics.get_homeStatistics_success, payload: { homeStatistics: res.result[0] ? res.result[0] : {} } })
        } else {
            dispatch({ type: reduxActionTypes.homeStatistics.get_homeStatistics_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.homeStatistics.get_homeStatistics_error, payload: { errorMsg: `${err}` } })
    }
}

export const getHomeStatisticsWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.homeStatistics.get_homeStatistics_waiting, payload: {} })
}