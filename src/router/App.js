import { createSwitchNavigator } from 'react-navigation'
import InitView from '../views/initView/InitView'
import LoginStack from './LoginStack'
// import Login from '../views/login/Login'
import TabStack from './TabStack'


console.disableYellowBox = true

const RootStack = createSwitchNavigator(
  {
    InitView: InitView,
    LoginStack: LoginStack,
    TabStack: TabStack
  },
  {
    initialRouteName: 'InitView'
  }
)


export default RootStack