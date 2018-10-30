import requestHeaders from './RequestHeaders'

const get = url => fetch(url, {
    method: 'GET',
    headers: requestHeaders.headers
}).then((response) => {
    return response.json()
})

const post = (url, params) => fetch(url, {
    method: 'POST',
    headers: requestHeaders.headers,
    body: JSON.stringify(params)
}).then((response) => response.json())

const put = (url, params) => fetch(url, {
    method: 'PUT',
    headers: requestHeaders.headers,
    body: JSON.stringify(params)
}).then((response) => response.json())

const del = url => fetch(url, {
    method: 'DELETE',
    headers: requestHeaders.headers,
}).then((response) => response.json())

const postFile = (url, params) => {
    let formData = new FormData()
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
}


export default {
    get: get,
    post: post,
    put: put,
    del: del,
    postFile: postFile
}