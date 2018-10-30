import { createStackNavigator } from 'react-navigation'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator"
import globalStyles, { styleColor } from '../styles/GlobalStyles'
import Setting from '../views/blockInitial/setting/Setting'
import ChangeMobileNo from '../views/changeMobileNo/ChangeMobileNo'
import ChangePassword from '../views/changePassword/ChangePassword'
import ScanCountRecordList from '../views/scanCountRecordList/ScanCountRecordList'
import PeccancyInfo from '../views/peccancyInfo/PeccancyInfo'
import PeccancyList from '../views/peccancyList/PeccancyList'


const SettingStack = createStackNavigator(
    {
        Setting: {
            screen: Setting,
            navigationOptions: {
                title: '我的'
            }
        },
        ChangeMobileNo: {
            screen: ChangeMobileNo,
            navigationOptions: {
                title: '换绑手机'
            }
        },
        ChangePassword: {
            screen: ChangePassword,
            navigationOptions: {
                title: '修改密码'
            }
        },
        ScanCountRecordList: {
            screen: ScanCountRecordList,
            navigationOptions: {
                title: '本月扫码记录'
            }
        },
        PeccancyInfo: {
            screen: PeccancyInfo,
            navigationOptions: {
                title: '车辆详情'
            }
        },
        PeccancyList:{
            screen: PeccancyList,
            navigationOptions: {
                title: '扫车记录'
            } 
        }
    },
    {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        }),
        initialRouteName: 'Setting',
        navigationOptions: {
            headerStyle: {
                backgroundColor: styleColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: [globalStyles.xlText, { color: '#fff' }],
        }
    }
)


export default SettingStack