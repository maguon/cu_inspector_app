import React from 'react'
import { Text, StyleSheet, ToastAndroid } from 'react-native'
import { Container, Form, Content, Button } from 'native-base'
import { Field, reduxForm } from 'redux-form'
import globalStyles from '../../styles/GlobalStyles'
import TextBox from '../../components/form/TextBox'
import * as reduxActions from '../../reduxActions'
import { required } from '../../utils/Validator'

const oldPasswordRequired = required('原密码不能为空')
const newPasswordRequired = required('新密码不能为空')
const confirmPasswordRequired = required('确认密码不能为空')


const ChangePassword = props => {
    const { handleSubmit } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Form style={styles.list} >
                    <Field name='oldPassword' label='原密码' secureTextEntry={true} validate={[oldPasswordRequired]} isRequired={true} component={TextBox} />
                    <Field name='newPassword' label='新密码' secureTextEntry={true} validate={[newPasswordRequired]} isRequired={true} component={TextBox} />
                    <Field name='confirmPassword' label='确认密码' secureTextEntry={true} validate={[confirmPasswordRequired]} isRequired={true} last={true} component={TextBox} />
                </Form>
                <Button full style={[globalStyles.styleBackgroundColor, styles.button]} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, styles.buttonTitle]}>修改</Text>
                </Button>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 50,
        marginHorizontal: 10,
        marginBottom: 10
    },
    buttonTitle: {
        color: '#fff'
    }
})


export default reduxForm({
    form: 'ChangePasswordForm',
    onSubmit: (values, dispatch) => {
        console.log('values', values)
        const { oldPassword, newPassword, confirmPassword } = values
        if (newPassword == confirmPassword) {
            dispatch(reduxActions.changePassword.changePassword(values))
        } else {
            ToastAndroid.show('两次输入新密码不同，请重新输入！', 10)
        }
    }
})(ChangePassword)