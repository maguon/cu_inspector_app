import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Container, Content, Separator, Button, Icon } from 'native-base'
import globalStyles from '../../styles/GlobalStyles'
import moment from 'moment'

class PeccancyCommit extends Component {


    render() {
        console.log('props', this.props)
        const { navigation: { state: { params: { QrCodeInfo: { phone = '', vin = '', engine_num = '', license_plate = '' }, QrCodeInfo } } } } = this.props
        console.log('QrCodeInfo', QrCodeInfo)
        return (
            <Container style={globalStyles.container}>
                <Content>
                    < View style={{ padding: 15 }}>
                        <Text>扫描日期：{moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                    < View style={{ padding: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon name='ios-pin' style={{ fontSize: 18, color: '#f4af43' }} />
                        <Text style={[globalStyles.midText, { marginLeft: 10 }]}>大连市开发区大连市开发区大连市开发区大连市开发区大连市开发区大连市开发区大连市开发区</Text>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ paddingVertical: 15, paddingRight: 15, marginLeft: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                            <Icon name='ios-car' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                            <Text style={[globalStyles.midText, { marginLeft: 10 }]}>{license_plate}</Text>
                        </View>
                        <View style={{ paddingVertical: 15, paddingRight: 15, marginLeft: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                            <Text>车辆识别码：{vin}</Text>
                        </View>
                        <View style={{ padding: 15, backgroundColor: '#fff' }}>
                            <Text>发动机号：{engine_num}</Text>
                        </View>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ padding: 15, backgroundColor: '#fff', flexDirection: 'row', }}>
                        <Icon name='ios-call' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                        <Text style={[globalStyles.midText, { marginLeft: 10 }]}>{phone}</Text>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ padding: 7.5, backgroundColor: '#fff', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ margin: 7.5, backgroundColor: '#000', width: 100, height: 100 }} />
                        <View style={{ margin: 7.5, backgroundColor: '#000', width: 100, height: 100 }} />
                        <View style={{ margin: 7.5, backgroundColor: '#000', width: 100, height: 100 }} />
                        <View style={{ margin: 7.5, backgroundColor: '#000', width: 100, height: 100 }} />
                        <View style={{ margin: 7.5, backgroundColor: '#000', width: 100, height: 100 }} />
                    </View>
                    <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={() => props.navigation.navigate('PeccancyInfo')}>
                        <Text style={{ color: '#fff' }}>提交并通知司机</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default PeccancyCommit