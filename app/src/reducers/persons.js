const persons = (state = {}, action) =>
{
	switch (action.type)
	{
		case 'ADD_PERSON':
		{
			const { person } = action.payload;

			return { ...state, [person.id]: person };
		}

		case 'REMOVE_PERSON':
		{
			const { personId } = action.payload;
			const newState = { ...state };

			delete newState[personId];

			return newState;
		}

		case 'SET_PERSON_STATUS':
		{
			const { personId, status } = action.payload;

			const person = state[personId];
			const newPerson = { ...person, status };

			return { ...state, [person.id]: newPerson };
		}

		case 'REMOVE_ALL_PERSONS':
		{
			return {};
		}

		default:
			return state;
	}
};

export default persons;