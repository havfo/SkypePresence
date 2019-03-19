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

			if (!person) 
			{
				throw new Error('no person found');
			}

			const newPerson = { ...person, status };

			return { ...state, [person.id]: newPerson };
		}

		case 'SET_PERSON_NOTE':
		{
			const { personId, note } = action.payload;

			const person = state[personId];

			if (!person) 
			{
				throw new Error('no person found');
			}

			const newPerson = { ...person, note };

			return { ...state, [person.id]: newPerson };
		}

		case 'SET_PERSON_LOCATION':
		{
			const { personId, location } = action.payload;

			const person = state[personId];

			if (!person) 
			{
				throw new Error('no person found');
			}

			const newPerson = { ...person, location };

			return { ...state, [person.id]: newPerson };
		}

		case 'SET_PERSON_ACTIVITY':
		{
			const { personId, activity } = action.payload;

			const person = state[personId];

			if (!person) 
			{
				throw new Error('no person found');
			}

			const newPerson = { ...person, activity };

			return { ...state, [person.id]: newPerson };
		}

		case 'SET_PERSON_LAST_SEEN_AT':
		{
			const { personId, lastSeenAt } = action.payload;

			const person = state[personId];

			if (!person) 
			{
				throw new Error('no person found');
			}

			const newPerson = { ...person, lastSeenAt };

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