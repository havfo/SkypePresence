const initialState =
{
	displayName   : null,
	email         : null,
	avatarUrl     : null,
	status        : null,
	registering   : false,
	registered    : false,
	currentPerson : null
};

const userStatus = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_USER':
		{
			const {
				displayName,
				email,
				avatarUrl,
				status
			} = action.payload;

			return {
				...state,
				displayName,
				email,
				avatarUrl,
				status
			};
		}

		case 'SET_STATUS':
		{
			const { status } = action.payload;

			return { ...state, status };
		}

		case 'SET_REGISTERING':
		{
			return {
				...state,
				registering: true
			}
		}

		case 'SET_REGISTERED':
		{
			const { registered } = action.payload;

			return {
				...state,
				registering: false,
				registered
			};
		}

		case 'SET_CURRENT_PERSON':
		{
			const { currentPerson } = action.payload;

			return { ...state, currentPerson };
		}

		default:
			return state;
	}
};

export default userStatus;