import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../styles/GlobalStyles'

const { width } = Dimensions.get('window')

const PhotoStoreNavBar = props => {
    const { title, RightButton, LeftButton, parent, initParam, layout: { initWidth }, previousViewName, sceneKey } = props
    // console.log('props', props)
    return (
        <View style={[styles.container, { width }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={'#000'}
                style={[styles.header, { backgroundColor: '#414141' }]}>
                {LeftButton && <Left style={{ flex: 1 }}>
                    <LeftButton parent={parent} previousViewName={previousViewName} />
                </Left>}
                {title && <Body style={styles.body}>
                    <Title style={[globalStyles.xlText, { color: '#fff' }]}>{title}</Title>
                </Body>}
                <Right style={{ flex: 4 }}>
                    {RightButton && <RightButton parent={parent} sceneKey={sceneKey} />}
                </Right>
            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 2
    },

})

export default PhotoStoreNavBar
