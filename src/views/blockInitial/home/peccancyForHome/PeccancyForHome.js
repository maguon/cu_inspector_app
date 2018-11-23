import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../../styles/GlobalStyles'
import moment from 'moment'
import { Container, Icon, Button, Spinner } from 'native-base'
import { sleep } from '../../../../utils'
import { connect } from 'react-redux'
import * as reduxActions from '../../../../reduxActions'

class PeccancyForHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countDown: 0
        }
        this.cutCountDown = this.cutCountDown.bind(this)
    }

    componentDidMount() {
        this.cutCountDown()
    }

    componentWillUnmount() {
        clearInterval(this.setInterval)
    }

    cutCountDown() {
        this.setInterval = setInterval(() => {
            const { item: { created_on } } = this.props
            const a = moment(created_on)
            const diff = moment().diff(a, 'seconds')
            if (diff <= 300) {
                this.setState({ countDown: (300 - diff) })
            } else {
                clearInterval(this.setInterval)
            }
        }, 1000);

    }

    render() {
        const { item: { license_plate = '', address = '', created_on, id }, item, sceneKey, getPeccancyImageListWaiting, getPeccancyImageList, changePeccancyStatus } = this.props
        return (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                getPeccancyImageListWaiting()
                Actions.peccancyInfoAtHomeBlock({ peccancy: item, previousViewName: sceneKey })
                InteractionManager.runAfterInteractions(() => getPeccancyImageList({ peccancyId: id }))
            }}>
                <View style={{ alignSelf: 'stretch', width: 1, backgroundColor: '#ddd', marginLeft: 7.5 }} />
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd', marginLeft: -4.5 }} />
                <View style={{ marginHorizontal: 7.5, paddingVertical: 13.5, flex: 1, borderBottomColor: '#ddd', borderBottomWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={globalStyles.smallText}>{created_on ? moment(created_on).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Icon name='ios-car' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                                <Text style={[globalStyles.midText, { paddingLeft: 5, color: 'black' }]}>{license_plate}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 10 }}>
                            <Text style={[globalStyles.xxxlText, { color: this.state.countDown == 0 ? '#f49c20' : '#00cade' }]}>{moment(this.state.countDown * 1000).format('m:ss')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
                            <Button rounded small light onPress={() => changePeccancyStatus({ peccancyId: id })}>
                                <Icon name='ios-close' style={{ fontSize: 25, color: '#999' }} />
                            </Button>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Icon name='ios-pin' style={[globalStyles.styleColor, { fontSize: 15, color: '#f4af43' }]} />
                        <Text numberOfLines={1} style={{ paddingLeft: 5 }}>{address}</Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Icon name='ios-arrow-forward' style={{ fontSize: 20, color: '#aaa' }} />
                </View>
            </TouchableOpacity >
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPeccancyImageListWaiting: () => {
        dispatch(reduxActions.peccancyInfo.getPeccancyImageListWaiting())
    },
    getPeccancyImageList: param => {
        dispatch(reduxActions.peccancyInfo.getPeccancyImageList(param))
    },
    changePeccancyStatus: param => {
        dispatch(reduxActions.peccancyListForHome.changePeccancyStatus(param))
    }
})

export default connect(null, mapDispatchToProps)(PeccancyForHome)