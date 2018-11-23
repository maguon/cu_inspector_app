import React from 'react'
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { Button } from 'native-base'
import globalStyles, { styleColor } from '../../../styles/GlobalStyles'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'
import { validatePhone } from '../../../utils/Validator'


const RetrievePasswordVCode = props => {
    const { retrievePasswordVCodeReducer: { data: { countDownTime } },
        retrievePasswordVCodeReducer, getVCode } = props
    // console.log('countDownTime', countDownTime)
    return (
        <Button
            full
            disabled={retrievePasswordVCodeReducer.countDown.isResultStatus == 1}
            onPress={() => {
                const warnMsg = validatePhone('您输入的手机号码不正确，请重新输入！')(props.mobileNo)
                if (!warnMsg) {
                    getVCode(props.mobileNo)
                } else {
                    ToastAndroid.show(warnMsg, 10)
                }
            }}
            style={{ flex: 1, backgroundColor: retrievePasswordVCodeReducer.countDown.isResultStatus == 1 ? '#ccc' : styleColor }}>
            {retrievePasswordVCodeReducer.countDown.isResultStatus == 0 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码</Text>}
            {retrievePasswordVCodeReducer.countDown.isResultStatus == 1 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码({`${countDownTime}`})</Text>}
        </Button>
    )
}


const mapStateToProps = (state) => {
    return {
        retrievePasswordVCodeReducer: state.retrievePasswordVCodeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVCode: param => {
        dispatch(reduxActions.retrievePasswordVCode.getVCode(param))
    }
})

const styles = StyleSheet.create({
    buttonTitle: {
        color: '#fff'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(RetrievePasswordVCode) 