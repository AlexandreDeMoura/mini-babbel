import { combineReducers } from "redux"
import itemsReducer from './items'
import themesReducer from './themes'

export default combineReducers({
    items: itemsReducer,
    themes: themesReducer
});
