import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content, Form } from 'native-base'
import { reduxForm, Field, getFormValues } from 'redux-form'
import TextBox from '../../components/form/TextBox'
import RetrievePasswordVCode from './retrievePasswordVCode/RetrievePasswordVCode'
import globalStyles from '../../styles/GlobalStyles'
import { connect } from 'react-redux'

const RetrievePassword = props => {
    const { formValues = {} } = props
    return (
        <Container style={globalStyles.container}>
            <Content showsVerticalScrollIndicator={false}>
                <Form style={styles.list} >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 5 }}>
                            <Field name='mobileNo'
                                component={TextBox}
                                label='手机号'
                                isRequired={true} />
                        </View>
                        <View style={{ flex: 2 }}>
                            {/* <ChangeMobileVCode mobileNo={formValues.mobileNo} /> */}
                            <RetrievePasswordVCode mobileNo={formValues.mobileNo} />
                        </View>
                    </View>
                    <Field name='vcode'
                        label='验证码'
                        secureTextEntry={true}
                        isRequired={true}
                        // last={true}
                        component={TextBox} />
                    <Field name='password'
                        label='新密码'
                        secureTextEntry={true}
                        isRequired={true}
                        // last={true}
                        component={TextBox} />
                    <Field name='confirmPassword'
                        label='确认密码'
                        secureTextEntry={true}
                        isRequired={true}
                        last={true}
                        component={TextBox} />
                </Form>
                <Button full style={[globalStyles.styleBackgroundColor, styles.button]} onPress={() => { }}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确认</Text>
                </Button>
            </Content>
        </Container>
    )
}



const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        marginTop: 15
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


const mapStateToProps = (state) => {
    return {
        formValues: getFormValues('RetrievePasswordForm')(state)
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: 'RetrievePasswordForm',
})(RetrievePassword))