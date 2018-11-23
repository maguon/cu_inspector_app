import React, { Component } from 'react'
import { FlatList, Text, InteractionManager, TouchableOpacity, StyleSheet, View, ActivityIndicator, Modal, Dimensions } from 'react-native'
import { Container, Icon, Separator, Spinner, Button } from 'native-base'
import globalStyles, { styleColor } from '../../styles/GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'
import { reduxForm, Field } from 'redux-form'
import TextBox from '../../components/form/TextBox'
import DatePicker from '../../components/form/DatePicker'

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})


const { width } = Dimensions.get('window')

const renderItem = props => {
    const { sceneKey, getPeccancyList, getPeccancyListWaiting, item: { car_count = 0, date_id } } = props
    return (
        <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                getPeccancyListWaiting()
                Actions.peccancyList({ previousViewName: sceneKey, dateId: date_id })
                InteractionManager.runAfterInteractions(() => getPeccancyList({ dateId: date_id }))
            }}>
            <Text style={[globalStyles.midText, { flex: 4, margin: 15, color: '#0a89d5' }]}>{date_id ? moment(`${date_id}`).format('YYYY年MM月DD日') : ''}</Text>
            <Text style={[globalStyles.midText, { flex: 3, textAlign: 'right' }]}>扫描<Text style={{ color: '#0a89d5' }}>{car_count}</Text>辆</Text>
            <Icon name='ios-arrow-forward' style={{ fontSize: 20, color: '#aaa', flex: 1, textAlign: 'right', marginHorizontal: 15 }} />
        </TouchableOpacity>
    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无扫车记录</Text>
        </View>
    )
}

class ScanCountRecordList extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     isModalVisible: false
        // }
    }

    render() {
        const { sceneKey, getPeccancyList, getPeccancyListWaiting, getScanCountListMore, scanCountRecordListReducer, handleSubmit,
            scanCountRecordListReducer: { data: { scanCountRecordList, isComplete, isModalVisible }, getScanCountList } } = this.props
        // console.log('this.props', this.props)
        // console.log('isModalVisible', isModalVisible)
        if (getScanCountList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container style={globalStyles.container}>
                    <FlatList
                        data={scanCountRecordList}
                        ItemSeparatorComponent={() => <Separator style={[globalStyles.container, { height: 10 }]} />}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (getScanCountList.isResultStatus == 2 && !isComplete) {
                                getScanCountListMore()
                            }
                        }}
                        ListEmptyComponent={renderEmpty}
                        ListFooterComponent={scanCountRecordListReducer.getScanCountListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => renderItem({ item, sceneKey, getPeccancyList, getPeccancyListWaiting })} />
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => {
                            this.props.setModalVisible({ isModalVisible: false })
                        }}>
                        <Container style={{ backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#fff', borderRadius: 5, width: width - 30 }}>
                                <Field name='startDate' label='起始日期' component={DatePicker} bodyStyle={{ width: width - 30 }} itemStyle={{ width: width - 60 }} />
                                <Field name='endDate' label='终止日期' component={DatePicker} bodyStyle={{ width: width - 30 }} itemStyle={{ width: width - 60 }} />
                                {/* <Field name='licensePlate' label='车牌号' component={TextBox} /> */}
                                <Button onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15, alignSelf: 'center' }]}>
                                    <Text style={[globalStyles.midText, { paddingHorizontal: 25, color: '#fff' }]}>查询</Text>
                                </Button>
                            </View>
                        </Container>
                    </Modal>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        scanCountRecordListReducer: state.scanCountRecordListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPeccancyList: (param) => {
        dispatch(reduxActions.peccancyList.getPeccancyList(param))
    },
    getPeccancyListWaiting: () => {
        dispatch(reduxActions.peccancyList.getPeccancyListWaiting())
    },
    getScanCountListMore: () => {
        dispatch(reduxActions.scanCountRecordList.getScanCountListMore())
    },
    setModalVisible: param => {
        dispatch(reduxActions.scanCountRecordList.setModalVisible(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ChangePasswordForm',
    onSubmit: (values, dispatch) => {
        // console.log('values', values)
        dispatch(reduxActions.scanCountRecordList.getScanCountListWaiting())
        dispatch(reduxActions.scanCountRecordList.getScanCountList(values))
        dispatch(reduxActions.scanCountRecordList.setModalVisible({isModalVisible:false}))
    }
})(ScanCountRecordList))