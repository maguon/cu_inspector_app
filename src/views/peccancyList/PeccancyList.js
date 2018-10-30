import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
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
    const { navigation, item, item: { license_plate = '', address = '', created_on } } = props
    return (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('PeccancyInfo', { peccancy: item })}>
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
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon name='ios-pin' style={[globalStyles.styleColor, { fontSize: 15, color: '#f4af43' }]} />
                    <Text numberOfLines={1} style={[globalStyles.midText, { paddingLeft: 5 }]}>{address}</Text>
                </View>
            </View>
            <View style={{ alignSelf: 'center' }}>
                <Icon name='ios-arrow-forward' style={{ fontSize: 20, color: '#aaa' }} />
            </View>
        </TouchableOpacity >
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

const PeccancyList = props => {
    // console.log('props', props)
    const { navigation, navigation: { state: { params: { dateId } } }, getPeccancyListMore, peccancyListReducer,
    peccancyListReducer: { data: { peccancyList, isComplete }, getPeccancyList } } = props
    if (getPeccancyList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    contentContainerStyle={{ padding: 7.5 }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getPeccancyList.isResultStatus == 2 && !isComplete) {
                            getPeccancyListMore({ dateId })
                        }
                    }}
                    ListEmptyComponent={renderEmpty}
                    ListFooterComponent={peccancyListReducer.getPeccancyListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={peccancyList}
                    renderItem={({ item }) => renderItem({ item, navigation })} />
            </Container>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        peccancyListReducer: state.peccancyListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPeccancyListMore: param => {
        dispatch(reduxActions.peccancyList.getPeccancyListMore(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PeccancyList)



