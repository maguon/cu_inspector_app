import * as reduxActionTypes from '../../reduxActionTypes'
import { CameraRoll } from 'react-native'
import { sleep, ObjectToUrl } from '../../utils'

const first = 480
const assetType = 'Photos'

export const getPhotes = () => async (dispatch, getState) => {
    try {
        const { photoStoreReducer: { data: { imageList, isComplete, after } } } = getState()
        dispatch({ type: reduxActionTypes.photostore.get_photoStore_waiting, payload: {} })
        if (!isComplete) {
            const data = await CameraRoll.getPhotos({ first, after, assetType })
            const { page_info: { end_cursor, has_next_page }, edges } = data
            dispatch({
                type: reduxActionTypes.photostore.get_photoStore_success, payload: {
                    imageList: [...edges],
                    after: end_cursor,
                    isComplete: !has_next_page
                }
            })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.photostore.get_photoStore_error, payload: { errorMsg: `err` } })
    }
}


export const getPhotesMore = () => async (dispatch, getState) => {
    const { photoStoreReducer: { data: { isComplete, after }, getPhotoStoreMore } } = getState()
    if (getPhotoStoreMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getPhotesMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.photostore.get_photoStoreMore_waiting, payload: {} })
            try {
                const data = await CameraRoll.getPhotos({ first, after, assetType })
                const { page_info: { end_cursor, has_next_page }, edges } = data
                dispatch({
                    type: reduxActionTypes.photostore.get_photoStoreMore_success, payload: {
                        imageList: [...edges],
                        after: end_cursor,
                        isComplete: !has_next_page
                    }
                })
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: reduxActionTypes.photostore.get_photoStoreMore_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            console.log('已全部加载完毕！')
            // ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}