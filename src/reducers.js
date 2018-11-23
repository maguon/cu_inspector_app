import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import initViewReducer from './views/initView/initViewReducer'
import loginReducer from './views/login/loginReducer'
import homeStatisticsReducer from './views/blockInitial/home/homeStatistics/homeStatisticsReducer'
import peccancyListForHomeReducer from './views/blockInitial/home/peccancyListForHome/peccancyListForHomeReducer'
import scanCountRecordListReducer from './views/scanCountRecordList/scanCountRecordListReducer'
import peccancyListReducer from './views/peccancyList/peccancyListReducer'
import changeMobileVCodeReducer from './views/changeMobileNo/changeMobileVCode/changeMobileVCodeReducer'
import changeMobileNoReducer from './views/changeMobileNo/changeMobileNoReducer'
import retrievePasswordVCodeReducer from './views/retrievePassword/retrievePasswordVCode/retrievePasswordVCodeReducer'
import retrievePasswordReducer from './views/retrievePassword/retrievePasswordReducer'
import peccancyCommitReducer from './views/peccancyCommit/peccancyCommitReducer'
import scanReducer from './views/blockInitial/scan/scanReducer'
import photoStoreReducer from './views/photostore/photoStoreReducer'
import peccancyInfoReducer from './views/peccancyInfo/peccancyInfoReducer'
import settingReducer from './views/blockInitial/setting/settingReducer'

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
    scanReducer,
    peccancyCommitReducer,
    changeMobileNoReducer,
    photoStoreReducer,
    retrievePasswordReducer,
    peccancyInfoReducer,
    settingReducer
})