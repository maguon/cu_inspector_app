import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import initViewReducer from './views/initView/initViewReducer'
import loginReducer from './views/login/loginReducer'
import homeStatisticsReducer from './views/blockInitial/home/homeStatistics/homeStatisticsReducer'
import peccancyListForHomeReducer from './views/blockInitial/home/peccancyListForHome/peccancyListForHomeReducer'
import scanCountRecordListReducer from './views/scanCountRecordList/scanCountRecordListReducer'
import peccancyListReducer from './views/peccancyList/peccancyListReducer'
import changeMobileVCodeReducer from './views/changeMobileNo/changeMobileVCode/changeMobileVCodeReducer'
import retrievePasswordVCodeReducer from './views/retrievePassword/retrievePasswordVCode/retrievePasswordVCodeReducer'
import scanReducer from './views/blockInitial/scan/scanReducer'


export default combineReducers({
    form: formReducer,
    initViewReducer,
    loginReducer,
    homeStatisticsReducer,
    peccancyListForHomeReducer,
    scanCountRecordListReducer,
    peccancyListReducer,
    changeMobileVCodeReducer,
    retrievePasswordVCodeReducer,
    scanReducer
})