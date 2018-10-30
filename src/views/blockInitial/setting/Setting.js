import React from 'react'
import { View, Text, InteractionManager, TouchableOpacity,Linking } from 'react-native'
import { Container, Content, Thumbnail, Icon, ListItem, Separator } from 'native-base'
import globalStyles from '../../../styles/GlobalStyles'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'

const Setting = props => {
    console.log('props', props)
    const { navigation, getScanCountList, getScanCountListWaiting,
        initViewReducer: { data: { version: { currentVersion = '', force_update, url } } },
        loginReducer: { data: { user: { avatar_image, phone = '', user_name = '', gender } } } } = props
    return (
        <Container style={globalStyles.container}>
            <Content>
                <View style={[globalStyles.styleBackgroundColor, { flexDirection: 'row', padding: 10 }]}>
                    <View style={{ flex: 1, margin: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail large source={{ uri: !avatar_image ? 'personalicon' : 'personalicon' }} />
                        <Text style={[globalStyles.midText, { color: 'rgba(255,255,255,0.6)', marginTop: 10 }]}>更换头像</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={[globalStyles.largeText, { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' }]}>{user_name}</Text>
                            {gender == 0 && <Icon name='ios-woman' style={{ marginLeft: 5, color: 'rgba(255,255,255,0.6)' }} />}
                            {gender == 1 && <Icon name='ios-man' style={{ marginLeft: 5, color: 'rgba(255,255,255,0.6)' }} />}
                        </View>
                        <Text style={[globalStyles.midText, { color: 'rgba(255,255,255,0.6)', marginTop: 10 }]}>{phone}</Text>
                    </View>
                </View>
                <Separator style={[globalStyles.container, globalStyles.separator]} />
                <View style={{ backgroundColor: '#fff' }}>
                    <ListItem last style={{ justifyContent: 'space-between' }} onPress={() => {
                        getScanCountListWaiting()
                        navigation.navigate('ScanCountRecordList')
                        InteractionManager.runAfterInteractions(getScanCountList)
                    }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>扫车记录</Text>
                        <Icon name="ios-arrow-forward" style={{ fontSize: 18, color: '#aaa' }} />
                    </ListItem>
                </View>
                <Separator style={[globalStyles.container, globalStyles.separator]} />
                <View style={{ backgroundColor: '#fff' }}>
                    <ListItem style={{ justifyContent: 'space-between' }} onPress={() => props.navigation.navigate('ChangePassword')}>
                        <Text>修改密码</Text>
                        <Icon name="ios-arrow-forward" style={{ fontSize: 18, color: '#aaa' }} />
                    </ListItem>
                    <ListItem last style={{ justifyContent: 'space-between' }} onPress={() => props.navigation.navigate('ChangeMobileNo')}>
                        <Text>换绑手机</Text>
                        <Icon name="ios-arrow-forward" style={{ fontSize: 18, color: '#aaa' }} />
                    </ListItem>
                </View>
                <Separator style={[globalStyles.container, globalStyles.separator]} />
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ backgroundColor: '#fff' }}></View>
                    <ListItem last style={{ justifyContent: 'space-between', paddingTop: 0, paddingBottom: 0, alignItems: 'center' }}>
                        <Text style={{ marginVertical: 15 }}>版本信息</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>当前版本号{currentVersion}</Text>
                            {force_update == 0 && <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => {
                                if (url) {
                                    Linking.canOpenURL(url)
                                        .then(supported => {
                                            if (!supported) {
                                                console.log('Can\'t handle url: ' + url)
                                            } else {
                                                return Linking.openURL(url)
                                            }
                                        })
                                        .catch(err => console.error('An error occurred', err))
                                }
                            }}>
                                <FoundationIcon name="burst-new" size={30} color={'#ff0000'} />
                            </TouchableOpacity>}
                        </View>
                    </ListItem>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        initViewReducer: state.initViewReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getScanCountList: () => {
        dispatch(reduxActions.scanCountRecordList.getScanCountList())
    },
    getScanCountListWaiting: () => {
        dispatch(reduxActions.scanCountRecordList.getScanCountListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)