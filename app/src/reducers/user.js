const initialState =
{
	username     : null,
	password     : null,
	domain       : null,
	autoRegister : false,
	requestUri   : null,
};

const user = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_USERNAME':
		{
			const { username } = action.payload;

			return { ...state, username };
		}

		case 'SET_PASSWORD':
		{
			const { password } = action.payload;

			return { ...state, password };
		}

		case 'SET_DOMAIN':
		{
			const { domain } = action.payload;

			return { ...state, domain };
		}

		case 'SET_AUTO_REGISTER':
		{
			const { autoRegister } = action.payload;

			return { ...state, autoRegister };
		}

		case 'SET_REQUEST_URI':
		{
			const { requestUri } = action.payload;

			return { ...state, requestUri };
		}

		default:
			return state;
	}
};

export default user;