import { createStackNavigator } from 'react-navigation'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator"
import globalStyles, { styleColor } from '../styles/GlobalStyles'
import Login from '../views/login/Login'
import RetrievePassword from '../views/retrievePassword/RetrievePassword'

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions:{
                header:null
            }
        },
        RetrievePassword: {
            screen: RetrievePassword,
            navigationOptions: {
                title: '密码找回'
            }
        }
    },
    {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        }),
        initialRouteName: 'Login',
        navigationOptions: {
            headerStyle: {
                backgroundColor: styleColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: [globalStyles.xlText, { color: '#fff' }],
        }
    }
)


export default LoginStack