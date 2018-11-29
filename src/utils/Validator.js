export const required = (msg) => (value) => (!value && value != 0 && value != '') ? msg : undefined

export const requiredObj = (msg) => (value) => (!value || Object.keys(value).length == 0 || (!value.id && value.id != 0 && value.id != '')) ? msg : undefined

export const validatePhone = (msg) => (value) => !(/^1[34578]\d{9}$/.test(value)) ? msg : undefined

export const isURL = (value) => {
    const strRegex = "((https|http|ftp|rtsp|mms)?://)"
        + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
        + "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\\.)*" // 域名- www. 
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名 
        + "[a-z]{2,6})" // first level domain- .com or .museum 
        + "(:[0-9]{1,4})?" // 端口- :80 
        + "((/?)|" // a slash isn't required if there is no file name 
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)"
    const re = new RegExp(strRegex)
    return re.test(value)
}


