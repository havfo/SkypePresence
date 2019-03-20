const subscribed = (state = [], action) =>
{
	switch (action.type)
	{
		case 'SUBSCRIBE_PERSON':
		{
			const { personId } = action.payload;

			return [ ...state, personId ];
		}

		case 'UNSUBSCRIBE_PERSON':
		{
			const { personId } = action.payload;

			return state.filter((element) => element !== personId);
		}

		case 'UNSUBSCRIBE_ALL':
		{
			return [];
		}

		default:
			return state;
	}
};

export default subscribed;