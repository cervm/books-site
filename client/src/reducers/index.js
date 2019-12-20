import {combineReducers} from 'redux';
import {books} from './books';
import {categories} from './categories';
import {user} from './user';
import {notifications} from "./notifications";

export default combineReducers({
    books, categories, user, notifications
})
