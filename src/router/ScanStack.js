import { createStackNavigator } from 'react-navigation'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator"
import globalStyles, { styleColor } from '../styles/GlobalStyles'
import Scan from '../views/blockInitial/scan/Scan'
import PeccancyCommit from '../views/peccancyCommit/PeccancyCommit'
import PeccancyInfo from '../views/peccancyInfo/PeccancyInfo'

const SettingStack = createStackNavigator(
    {
        Scan: {
            screen: Scan,
            navigationOptions: {
                title: '扫码'
            }
        },
        PeccancyInfo: {
            screen: PeccancyInfo,
            navigationOptions: {
                title: '车辆详情'
            }
        },
        PeccancyCommit: {
            screen: PeccancyCommit,
            navigationOptions: {
                title: '违章提醒'
            }
        }
    },
    {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        }),
        initialRouteName: 'Scan',
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