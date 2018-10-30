import React from 'react'
import { View, Text } from 'react-native'
import { Container, Thumbnail } from 'native-base'
import globalStyles from '../../../../styles/GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'

const HomeStatistics = props => {
    const { homeStatisticsReducer: { data: { homeStatistics: { count = 0 } } },
        loginReducer: { data: { user: { avatar_image, phone = '', user_name = '' } } } } = props
    console.log('state', props.loginReducer)
    console.log('state', props.initViewReducer)
    return (
        <View style={[globalStyles.styleBackgroundColor, { flexDirection: 'row', padding: 10 }]}>
            <View style={{ flex: 1, margin: 5 }}>
                <Thumbnail large source={{ uri: !avatar_image ? 'personalicon' : 'personalicon' }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={[globalStyles.largeText, { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' }]}>{user_name}</Text>
                <Text style={[globalStyles.midText, { color: 'rgba(255,255,255,0.6)', marginTop: 10 }]}>{phone}</Text>
            </View>

            <View style={{ flex: 1, margin: 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={[globalStyles.midText, { color: 'rgba(255,255,255,0.6)' }]}>{moment().format('YYYY年MM月DD日')}</Text>
                <Text style={[globalStyles.largeText, { color: '#e4e450', fontWeight: 'bold', marginVertical: 10 }]}>{count}</Text>
                <Text style={[globalStyles.midText, { color: 'rgba(255,255,255,0.6)' }]}>今日扫车</Text>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        homeStatisticsReducer: state.homeStatisticsReducer,
        loginReducer: state.loginReducer,
        initViewReducer: state.initViewReducer
    }
}


export default connect(mapStateToProps)(HomeStatistics)