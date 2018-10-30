import React from 'react'
import { FlatList, Text, InteractionManager, TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Icon, Separator, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../styles/GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'
import * as reduxActions from '../../reduxActions'

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

const renderItem = props => {
    const { navigation, getPeccancyList, getPeccancyListWaiting, item: { car_count = 0, id } } = props
    return (
        <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                getPeccancyListWaiting()
                navigation.navigate('PeccancyList', { dateId: id })
                InteractionManager.runAfterInteractions(() => getPeccancyList({ dateId: id }))
            }}>
            <Text style={[globalStyles.midText, { flex: 4, margin: 15, color: '#0a89d5' }]}>{id ? moment(`${id}`).format('YYYY年MM月DD日') : ''}</Text>
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

const ScanCountRecordList = props => {
    const { navigation, getPeccancyList, getPeccancyListWaiting, getScanCountListMore, scanCountRecordListReducer,
        scanCountRecordListReducer: { data: { scanCountRecordList, isComplete }, getScanCountList } } = props
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
                    renderItem={({ item }) => renderItem({ item, navigation, getPeccancyList, getPeccancyListWaiting })} />
            </Container>
        )
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ScanCountRecordList)