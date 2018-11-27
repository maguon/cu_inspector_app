import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import httpRequest from '../../utils/HttpRequest'
import { base_host, file_host, record_host } from '../../configs/Host'
import { sleep, ObjectToUrl } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { InteractionManager, ToastAndroid } from 'react-native'
import globalStyles from '../../styles/GlobalStyles';


export const getAddressByCoordinate = param => async (dispatch) => {
    try {
        const { coordinate, key } = param
        const url = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${coordinate.longitude},${coordinate.latitude}&key=${key}&radius=1000&extensions=base`
        const res = await httpRequest.get(url)
        if (res.infocode == "10000") {
            dispatch({ type: reduxActionTypes.peccancyCommit.get_addressByCoordinate_success, payload: { address: { ...coordinate, formatted_address: res.regeocode.formatted_address } } })
        } else {
            dispatch({ type: reduxActionTypes.peccancyCommit.get_addressByCoordinate_failed, payload: { failedMsg: `${res.info}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.peccancyCommit.get_addressByCoordinate_error, payload: { errorMsg: `${err}` } })
    }
}

export const getAddressByCoordinateWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.peccancyCommit.get_addressByCoordinate_waiting, payload: {} })
}


export const commitPeccancy = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { id, type, phone } } },
            peccancyCommitReducer: { data: { imageInfoList } } } = getState()
        dispatch({ type: reduxActionTypes.peccancyCommit.commit_peccancy_waiting, payload: {} })
        const url = `${base_host}/supervise/${id}/checkCar`
        const res = await httpRequest.post(url, {
            userId: param.QrCodeInfo.user_id,
            userCarId: param.QrCodeInfo.id,
            lon: param.address.longitude,
            lat: param.address.latitude,
            address: param.address.formatted_address
        })

        if (res.success) {
            dispatch({ type: reduxActionTypes.peccancyCommit.push_peccancyImage_start, payload: { imagePushCount: imageInfoList.length } })
            const pushImgUrl = `${file_host}/user/${id}/image?imageType=1`
            let index = 0
            for (item of imageInfoList) {
                const pushImgRes = await httpRequest.postFile(pushImgUrl, {
                    key: 'image',
                    imageUrl: item.uri,
                    imageType: item.type,
                    imageName: encodeURI(item.fileName)
                })
                if (pushImgRes.success) {
                    const addImgToPeccancyUrl = `${record_host}/user/${id}/check/${res.id}/image`
                    const addImgToPeccancyRes = await httpRequest.post(addImgToPeccancyUrl, {
                        username: phone,
                        userId: id,
                        userType: type,
                        url: pushImgRes.imageId,
                        carNo: param.QrCodeInfo.license_plate
                    })
                    if (!addImgToPeccancyRes.success) {
                        ToastAndroid.show(`图片${index}上传错误：${addImgToPeccancyRes.msg}`)
                    }
                    dispatch({ type: reduxActionTypes.peccancyCommit.push_peccancyImage, payload: { imagePushIndex: index } })
                    index++
                } else {
                    ToastAndroid.show(`图片${index}上传错误：${pushImgRes.msg}`)
                }
            }
            ToastAndroid.show(`违停信息发送成功！`, 10)
            dispatch({ type: reduxActionTypes.peccancyCommit.commit_peccancy_success, payload: {} })
            dispatch(reduxActions.peccancyListForHome.getPeccancyListForHomeWaiting())
            dispatch(reduxActions.peccancyListForHome.getPeccancyListForHome())
            if (param.type == 'toInfo') {
                dispatch(reduxActions.peccancyInfo.getPeccancyImageListWaiting())
                Actions.peccancyInfoAtScanBlock({ peccancy: { ...param.QrCodeInfo, address: param.address.formatted_address }, previousViewName: param.previousViewName })
                InteractionManager.runAfterInteractions(() => dispatch(reduxActions.peccancyInfo.getPeccancyImageList({ peccancyId: res.id })))
            } else if ((param.type == 'toScan')) {
                Actions.popTo(param.previousViewName)
            }
        } else {
            dispatch({ type: reduxActionTypes.peccancyCommit.commit_peccancy_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.peccancyCommit.commit_peccancy_error, payload: { errorMsg: `${err}` } })
    }
}

export const pushLocalPeccancyImage = param => (dispatch, getState) => {
    const { takePhotoRes } = param
    dispatch({ type: reduxActionTypes.peccancyCommit.pushlocal_peccancyImage, payload: { imageInfo: takePhotoRes } })
}

export const delLocalPeccancyImage = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.peccancyCommit.dellocal_peccancyImage, payload: { imageInfo: param } })
}


export const cleanLocalPeccancyImage = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.peccancyCommit.cleanlocal_peccancyImage, payload: {} })
}