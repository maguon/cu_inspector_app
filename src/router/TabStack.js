import { createBottomTabNavigator } from 'react-navigation'
import React from 'react'
import { Icon } from 'native-base'
import HomeStack from './HomeStack'
import SettingStack from './SettingStack'
import ScanStack from './ScanStack'
import  { styleColor } from '../styles/GlobalStyles'

const TabStack = createBottomTabNavigator(
    {
        HomeStack: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: props => {
                    const { tintColor } = props
                    return <Icon name='ios-home' style={{ color: tintColor }} />
                }
            }
        },
        ScanStack:{
            screen: ScanStack,
            navigationOptions: {
                tabBarIcon: props => {
                    const { tintColor } = props
                    return <Icon name='ios-qr-scanner' style={{ color: tintColor }} />
                }
            } 
        },
        SettingStack: {
            screen: SettingStack,
            navigationOptions: {
                tabBarIcon: props => {
                    const { tintColor } = props
                    return <Icon name='ios-settings' style={{ color: tintColor }} />
                }
            }
        }
    },
    {
        initialRouteName: 'HomeStack',
        backBehavior: 'none',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: styleColor,
            inactiveTintColor: '#aaa'
        },
        navigationOptions: ({ navigation, navigationOptions }) => {
            return {
                tabBarVisible: navigation.state.index > 0 ? false : true
            }
        }
    })


export default TabStack