import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../utils/HttpRequest'
import { base_host, file_host } from '../../../configs/Host'

export const modifySuperviseAvatarImage = param => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.setting.modify_superviseAvatarImage_waiting, payload: {} })
        const { loginReducer: { data: { user: { id } } } } = getState()
        const imageUrl = `${file_host}/user/${id}/image?imageType=1`
        // console.log('imageUrl', imageUrl)
        // console.log('param', param)
        const imageRes = await httpRequest.postFile(imageUrl, {
            key: 'image',
            imageUrl: param.uri,
            imageType: param.type,
            imageName: param.fileName
        })
        // console.log('imageRes', imageRes)
        if (imageRes.success) {
            const avatarImageUrl = `${base_host}/supervise/${id}/avatarImage/${imageRes.imageId}`
            // console.log('avatarImageUrl', avatarImageUrl)
            const avatarImageRes = await httpRequest.put(avatarImageUrl, {})
            // console.log('avatarImageRes', avatarImageRes)
            if (avatarImageRes.success) {
                dispatch({ type: reduxActionTypes.setting.modify_superviseAvatarImage_success, payload: {} })
                dispatch({ type: reduxActionTypes.login.change_AvatarImage, payload: { avatar_image: imageRes.imageId } })
            } else {
                dispatch({ type: reduxActionTypes.setting.modify_superviseAvatarImage_failed, payload: { failedMsg: `${avatarImageRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.setting.modify_superviseAvatarImage_failed, payload: { failedMsg: `${imageRes.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.setting.modify_superviseAvatarImage_error, payload: { errorMsg: `${err}` } })
    }
}