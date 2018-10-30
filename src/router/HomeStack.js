import { createStackNavigator } from 'react-navigation'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator"
import globalStyles, { styleColor } from '../styles/GlobalStyles'
import Home from '../views/blockInitial/home/Home'
import PeccancyInfo from '../views/peccancyInfo/PeccancyInfo'

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: '软件名称',

            }
        },
        PeccancyInfo: {
            screen: PeccancyInfo,
            navigationOptions: {
                title: '车辆详情',

            }
        }
    },
    {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        }),
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: styleColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: [globalStyles.xlText, { color: '#fff' }],
        }
    }
)


export default HomeStack