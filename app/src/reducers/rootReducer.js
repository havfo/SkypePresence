import { combineReducers } from 'redux';
import user from './user';
import userStatus from './userStatus';
import persons from './persons';
import notifications from './notifications';

export default combineReducers({
	user,
	userStatus,
	persons,
	notifications
});