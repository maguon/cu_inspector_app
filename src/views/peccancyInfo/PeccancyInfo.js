import React from 'react'
import { View, Text } from 'react-native'
import { Container, Content, Separator, Button, Icon } from 'native-base'
import globalStyles from '../../styles/GlobalStyles'
import moment from 'moment'

const PeccancyInfo = props => {
    const { navigation: { state: { params: { peccancy: { license_plate = '', address = '', created_on, vin = '', engine_num = '', phone = '' } } } } } = props
    return (
        <Container style={globalStyles.container}>
            <Content>
                < View style={{ padding: 15 }}>
                    <Text>扫描日期：{created_on ? moment(created_on).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                </View>
                < View style={{ padding: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Icon name='ios-pin' style={{ fontSize: 18, color: '#f4af43' }} />
                    <Text style={[globalStyles.midText, { marginLeft: 10 }]}>{address}</Text>
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
                <Separator style={[globalStyles.container, globalStyles.separator]} />
            </Content>
        </Container>
    )
}

export default PeccancyInfo