import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import Orientation from 'react-native-orientation'
import { connect } from 'react-redux'


//<<<<<<<<<<components
import NavBar from '../components/bar/NavBar'
import PhotoStoreNavBar from '../components/bar/PhotoStoreNavBar'
import TabBarIcon from '../components/bar/TabBarIcon'
import LeftButton from '../components/leftButton/LeftButton'
import PhotoStoreToolButton from '../components/toolButton/PhotoStoreToolButton'
import ScanCountRecordListToolButton from '../components/toolButton/ScanCountRecordListToolButton'
//<<<<<<<<<<components

//<<<<<<<<<<views
import InitView from '../views/initView/InitView'
import Login from '../views/login/Login'
import Home from '../views/blockInitial/home/Home'

//<<<<<<<<<<login
import RetrievePassword from '../views/retrievePassword/RetrievePassword'

//<<<<<<<<<<login


//<<<<<<<<<<homeBlock
import PeccancyInfo from '../views/peccancyInfo/PeccancyInfo'
import PhotoStore from '../views/photostore/PhotoStore'
import Photograph from '../views/photograph/Photograph'
//<<<<<<<<<<homeBlock

//<<<<<<<<<<scanBlock
import Scan from '../views/blockInitial/scan/Scan'
import PeccancyCommit from '../views/peccancyCommit/PeccancyCommit'
//<<<<<<<<<<scanBlock

//<<<<<<<<<<settingBlock
import Setting from '../views/blockInitial/setting/Setting'
import ChangeMobileNo from '../views/changeMobileNo/ChangeMobileNo'
import ChangePassword from '../views/changePassword/ChangePassword'
import ScanCountRecordList from '../views/scanCountRecordList/ScanCountRecordList'
// import PeccancyInfo from '../views/peccancyInfo/PeccancyInfo'
import PeccancyList from '../views/peccancyList/PeccancyList'
//<<<<<<<<<<settingBlock
//<<<<<<<<<<views

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {

    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}


export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // Orientation.lockToPortrait()
    }


    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle}
                createReducer={params => {
                    const defaultReducer = Reducer(params);
                    return (state, action) => {
                        if (action.type == ActionConst.FOCUS) {
                            // console.log('action.scene.name', action.scene.name)
                            // console.log('action', action)
                            this.currentScene = action.scene.name
                        }
                        return defaultReducer(state, action);
                    }
                }}
                backAndroidHandler={() => {
                    if (this.currentScene == 'home' || this.currentScene == 'scan' || this.currentScene == 'setting') {
                        return false
                    } else if (this.currentScene == 'peccancyInfoAtScanBlock') {
                        Actions.popTo('scan') 
                        Actions.refresh({ isCameraRefresh: true })
                        return true
                    }else if (this.currentScene == 'peccancyCommit') {
                        Actions.pop({ refresh: { isCameraRefresh: true } })
                        return true
                    }
                    else {
                        Actions.pop()
                        return true
                    }
                }}>
                <Scene key="root">
                    <Scene key="initView" initial={true} component={InitView} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            // console.log('user', user)
                            if (user.phone
                                && user.token
                                && user.id
                                && user.status
                                && user.type == 0) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} LeftButton={LeftButton} hideNavBar={false} hideTabBar navBar={NavBar} />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" initial={true} icon={TabBarIcon} online='ios-home' >
                                <Scene key="home" initial={true} component={Home} title='连惠车' hideNavBar={false} hideTabBar={false} navBar={NavBar} />
                                <Scene key="peccancyInfoAtHomeBlock" component={PeccancyInfo} title='车辆详情' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                                <Scene key="photoStore" component={PhotoStore} RightButton={PhotoStoreToolButton} title='相册' LeftButton={LeftButton} hideNavBar={false} hideTabBar={true} navBar={PhotoStoreNavBar} />
                                <Scene key="photograph" component={Photograph} hideNavBar={true} hideTabBar={true} />
                            </Scene>
                            <Scene key="scanBlock" icon={TabBarIcon} type={ActionConst.REFRESH} online='ios-qr-scanner' >
                                <Scene key="scan" initial={true} component={Scan} title='扫一扫' hideNavBar={false} hideTabBar={false} navBar={NavBar} />
                                <Scene key="peccancyInfoAtScanBlock" component={PeccancyInfo} title='车辆详情' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                                <Scene key="peccancyCommit" component={PeccancyCommit} title='车辆详情' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabBarIcon} online='ios-settings' >
                                <Scene key="setting" initial={true} component={Setting} title='我的' hideNavBar={false} hideTabBar={false} navBar={NavBar} />
                                <Scene key="peccancyInfoAtSettingBlock" component={PeccancyInfo} title='车辆详情' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                                <Scene key="peccancyList" onBackAndroid={(param) => { console.log(param) }} component={PeccancyList} title='车辆详情' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                                <Scene key="changeMobileNo" component={ChangeMobileNo} title='换绑手机' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                                <Scene key="changePassword" component={ChangePassword} title='修改密码' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} />
                                <Scene key="scanCountRecordList" component={ScanCountRecordList} title='车辆详情' hideNavBar={false} LeftButton={LeftButton} hideTabBar={true} navBar={NavBar} RightButton={ScanCountRecordListToolButton} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}