import {createStore} from 'redux';
import { homepage } from './redux/homepageRedux'
import { combineReducers } from 'redux'
import { user } from './redux/userRedux'

const store = createStore(combineReducers({user, homepage}));
export default store;

