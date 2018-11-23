import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import httpRequest from '../../utils/HttpRequest'
import { base_host, file_host, record_host } from '../../configs/Host'

export const getPeccancyImageList = param => async (dispatch, getState) => {
    // console.log('getPeccancyImageList')
    try {
        // console.log('param', param)
        const { loginReducer: { data: { user: { id } } } } = getState()
        const url = `${record_host}/check?checkId=${param.peccancyId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            // console.log('res', res.result && res.result.length > 0 && res.result[0].check_image)
            if (res.result && res.result.length > 0 && res.result[0].check_image) {
                dispatch({
                    type: reduxActionTypes.peccancyInfo.get_peccancyImageList_success, payload: {
                        imageList: res.result[0].check_image.map(item => {
                            return {
                                ...item,
                                uri: `${file_host}/image/${item.url}`
                            }
                        })
                    }
                })
            } else {
                dispatch({ type: reduxActionTypes.peccancyInfo.get_peccancyImageList_success, payload: { imageList: [] } })
            }
        } else {
            dispatch({ type: reduxActionTypes.peccancyInfo.get_peccancyImageList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.peccancyInfo.get_peccancyImageList_error, payload: { errorMsg: `${err}` } })
    }
}


export const getPeccancyImageListWaiting = () => (dispatch) => {
    // console.log('getPeccancyImageListWaiting')
    dispatch({ type: reduxActionTypes.peccancyInfo.get_peccancyImageList_waiting, payload: {} })
}

export const cleanPeccancyImageList = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.peccancyInfo.clean_peccancyImageList, payload: {} })
}