import * as stateActions from './actions/stateActions';
import * as requestActions from './actions/requestActions';
import Logger from './logger';

const logger = new Logger('SkypeClient');

let store;

export default class SkypeClient
{
	/**
	 * @param  {Object} data
	 * @param  {Object} data.store - The Redux store.
	 */
	static init(data)
	{
		store = data.store;
	}

	constructor()
	{
		logger.debug('constructor()');

		this._config = window.config;
		this._skype = window.Skype;

		this._api = null;

		this._skypeApplication = null;

		this._persons = null;

		this._init();
	}

	_init()
	{
		logger.debug('_init()');

		this._skype.initialize({
			apiKey : this._config.apiKey
		}, (api) =>
		{
			this._api = api;

			store.dispatch(requestActions.notify(
				{
					type : 'success',
					text : 'SDK successfully loaded.'
				})
			);
		}, (error) =>
		{
			logger.error('_init() [error: "%s"]', error.message);

			store.dispatch(requestActions.notify(
				{
					type : 'error',
					text : `${error.message}`
				})
			);
		});

		const { autoRegister } = store.getState().user;

		if (autoRegister)
			this.register();
	}

	async register()
	{
		logger.debug('register()');

		const {
			username,
			password,
			// domain
		} = store.getState().user;

		try
		{
			const application = this._api.application;
			this._skypeApplication = new application();

			store.dispatch(stateActions.setRegistering());
			await this._skypeApplication.signInManager.signIn({
				// cors : true,
				version : this._config.version,
				username,
				password,
				// domain
			});

			store.dispatch(stateActions.setRegistered({ registered: true }));

			const {
				displayName,
				email,
				avatarUrl,
				status
			} = this._skypeApplication.personsAndGroupsManager.mePerson;

			store.dispatch(stateActions.setUser({
				displayName : displayName(),
				email       : email(),
				avatarUrl   : avatarUrl(),
				status      : status()
			}));

			store.dispatch(requestActions.notify(
				{
					type : 'success',
					text : `Signed in as: ${displayName()}.`
				})
			);

			// Don't wait for contacts, they will come when they come
			Promise.resolve()
				.then(async () =>
				{
					this._persons = await this._skypeApplication.personsAndGroupsManager.all.persons.get();

					logger.debug(`Got ${this._persons.length} persons.`);

					const subscriptions = store.getState().subscribed;

					this._persons.forEach(async (person) =>
					{
						if (person.id())
						{
							const statePerson =
							{
								id          : person.id(),
								displayName : person.displayName(),
								status      : '',
								avatarUrl   : '',
								lastSeen    : '',
								mobilePhone : person.mobilePhone() ? person.mobilePhone() : 'Unknown',
								title       : person.title() ? person.title() : 'Unknown',
								department  : person.department() ? person.department() : 'Unknown'
							};

							statePerson.avatarUrl = await person.avatarUrl.get();
							statePerson.lastSeen = await person.lastSeenAt.get();

							store.dispatch(stateActions.addPerson({ person: statePerson }));

							person.status.changed((status) =>
							{
								logger.debug('register() | status change [personId: "%s", status: "%s"]', statePerson.id, status);

								store.dispatch(stateActions.setPersonStatus({ personId: statePerson.id, status }));
							});

							if (subscriptions.includes(statePerson.id))
							{
								await person.status.subscribe();
							}
						}
					});
				})
				.catch((error) =>
				{
					logger.error('register() [error: "%s"]', error.message);
				});
		}
		catch (error)
		{
			logger.error('register() [error: "%s"]', error.message);

			store.dispatch(stateActions.setRegistered({ registered: false }));

			store.dispatch(requestActions.notify(
				{
					type : 'error',
					text : `${error.message}`
				})
			);
		}
	}

	async unRegister()
	{
		logger.debug('unRegister()');

		try
		{
			if (this._skypeApplication)
			{
				await this._skypeApplication.signInManager.signOut();
			}

			this._persons = null;

			store.dispatch(stateActions.removeAllPersons());

			store.dispatch(stateActions.setRegistered({ registered: false }));

			store.dispatch(requestActions.notify(
				{
					type : 'success',
					text : 'Signed out.'
				})
			);
		}
		catch (error)
		{
			logger.error('unRegister() [error: "%s"]', error.message);

			store.dispatch(requestActions.notify(
				{
					type : 'error',
					text : `${error.message}`
				})
			);
		}
	}

	async subscribe(personId)
	{
		logger.debug('subscribe() [personId: "%s"]', personId);

		try
		{
			const subscribePerson = this._persons.find(person => person.id() === personId);

			if (subscribePerson)
			{
				await subscribePerson.status.subscribe();

				// const status = await subscribePerson.status.get();

				// store.dispatch(stateActions.setPersonStatus({ personId: subscribePerson.id, status }));

				store.dispatch(stateActions.subscribePerson({ personId }));
			}
		}
		catch (error)
		{
			logger.error('subscribe() [error: "%s"]', error.message);
		}
	}

	async unSubscribe(personId)
	{
		logger.debug('unSubscribe() [personId: "%s"]', personId);

		store.dispatch(stateActions.unSubscribePerson({ personId }));
	}
}