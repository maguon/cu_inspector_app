import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Container, Icon, Button, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../../styles/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import * as reduxActions from '../../../../reduxActions'
import PeccancyForHome from '../peccancyForHome/PeccancyForHome'

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
    const { item, sceneKey } = props
    return (
        <PeccancyForHome item={item} sceneKey={sceneKey} />
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无申报记录</Text>
        </View>
    )
}

const PeccancyListForHome = props => {
    const { peccancyListForHomeReducer, sceneKey, getPeccancyListForHomeMore,
        peccancyListForHomeReducer: { data: { peccancyList, isComplete }, getPeccancyListForHome } } = props
    if (getPeccancyListForHome.isResultStatus == 1) {
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
                        if (getPeccancyListForHome.isResultStatus == 2 && !isComplete) {
                            getPeccancyListForHomeMore()
                        }
                    }}
                    ListEmptyComponent={renderEmpty}
                    ListFooterComponent={peccancyListForHomeReducer.getPeccancyListForHomeMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={peccancyList}
                    renderItem={({ item }) => renderItem({ item, sceneKey })} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        peccancyListForHomeReducer: state.peccancyListForHomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPeccancyListForHomeMore: () => {
        dispatch(reduxActions.peccancyListForHome.getPeccancyListForHomeMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PeccancyListForHome)