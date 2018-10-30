import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Form, Content, Button, ListItem } from 'native-base'
import { Field, reduxForm, getFormValues } from 'redux-form'
import globalStyles from '../../styles/GlobalStyles'
import TextBox from '../../components/form/TextBox'
import ChangeMobileVCode from './changeMobileVCode/ChangeMobileVCode'
import { connect } from 'react-redux'

const ChangeMobileNo = props => {
    console.log('props', props)
    const { formValues = {} } = props
    return (
        <Container style={globalStyles.container}>
            <Content showsVerticalScrollIndicator={false}>
                <Form style={styles.list} >
                    <View style={[globalStyles.container, { padding: 15 }]}>
                        <Text>当前绑定手机：13887654321</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 5 }}>
                            <Field name='mobileNo' label='手机号' isRequired={true} component={TextBox} />
                        </View>
                        <View style={{ flex: 2 }}>
                            <ChangeMobileVCode mobileNo={formValues.mobileNo} />
                        </View>
                    </View>
                    <Field name='vCode' label='验证码' secureTextEntry={true} isRequired={true} last={true} component={TextBox} />
                </Form>
                <Button full style={[globalStyles.styleBackgroundColor, styles.button]} onPress={() => { }}>
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


const mapStateToProps = (state) => {
    return {
        formValues: getFormValues('ChangeMobileNoForm')(state)
    }
}

export default connect(mapStateToProps)(
    reduxForm({
        form: 'ChangeMobileNoForm',
    })(ChangeMobileNo))