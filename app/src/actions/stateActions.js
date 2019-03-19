export const setUser = ({
	displayName,
	email,
	avatarUrl,
	status
}) => (dispatch) =>
{
	dispatch({
		type    : 'SET_USER',
		payload :
		{
			displayName,
			email,
			avatarUrl,
			status
		}
	});
};

export const setUsername = ({ username }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_USERNAME',
		payload : { username }
	});
};

export const setPassword = ({ password }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PASSWORD',
		payload : { password }
	});
};

export const setDomain = ({ domain }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_DOMAIN',
		payload : { domain }
	});
};

export const setRegistering = () => (dispatch) =>
{
	dispatch({
		type : 'SET_REGISTERING'
	});
};

export const setRegistered = ({ registered }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_REGISTERED',
		payload : { registered }
	});
};

export const setAutoRegister = ({ autoRegister }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_AUTO_REGISTER',
		payload : { autoRegister }
	});
};

export const setRequestUri = ({ requestUri }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_REQUEST_URI',
		payload : { requestUri }
	});
};

export const addPerson = ({ person }) => (dispatch) =>
{
	dispatch({
		type    : 'ADD_PERSON',
		payload : { person }
	});
};

export const setPersonStatus = ({ personId, status }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PERSON_STATUS',
		payload : { personId, status }
	});
};

export const setPersonNote = ({ personId, note }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PERSON_NOTE',
		payload : { personId, note }
	});
};

export const setPersonLocation = ({ personId, location }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PERSON_LOCATION',
		payload : { personId, location }
	});
};

export const setPersonActivity = ({ personId, activity }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PERSON_ACTIVITY',
		payload : { personId, activity }
	});
};

export const setPersonLastSeenAt = ({ personId, lastSeenAt }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PERSON_LAST_SEEN_AT',
		payload : { personId, lastSeenAt }
	});
};

export const unSubscribePerson = ({ personId }) => (dispatch) =>
{
	dispatch({
		type    : 'UNSUBSCRIBE_PERSON',
		payload : { personId }
	});
};

export const unSubscribeAll = () => (dispatch) =>
{
	dispatch({
		type : 'UNSUBSCRIBE_ALL'
	});
};

export const subscribePerson = ({ personId }) => (dispatch) =>
{
	dispatch({
		type    : 'SUBSCRIBE_PERSON',
		payload : { personId }
	});
};

export const removeAllPersons = () => (dispatch) =>
{
	dispatch({
		type : 'REMOVE_ALL_PERSONS'
	});
};

export const setCurrentSession = ({ personId }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_CURRENT_PERSON',
		payload : { personId }
	});
};

export const addNotification = ({ notification }) => (dispatch) =>
{
	dispatch({
		type    : 'ADD_NOTIFICATION',
		payload : { notification }
	});
};

export const removeNotification = ({ notificationId }) => (dispatch) =>
{
	dispatch({
		type    : 'REMOVE_NOTIFICATION',
		payload : { notificationId }
	});
};

export const removeAllNotifications = () => (dispatch) =>
{
	dispatch({
		type : 'REMOVE_ALL_NOTIFICATIONS'
	});
};