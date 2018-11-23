import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'

const ScanCountRecordListToolButton = props => {
    return (
        <Button transparent onPress={() => props.setModalVisible({isModalVisible:true})}>
            <Text style={{ color: '#fff' }}>查询</Text>
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setModalVisible: param => {
        dispatch(reduxActions.scanCountRecordList.setModalVisible(param))
    }
})

export default connect(null,mapDispatchToProps)(ScanCountRecordListToolButton)