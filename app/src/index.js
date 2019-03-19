import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import { SnackbarProvider } from 'notistack';
import ClientContext from './clientContext';
import domready from 'domready';
import debug from 'debug';
import Logger from './logger';

import SkypeClient from './skypeClient';

import './index.css';
import App from './components/App';
import LoadingView from './components/LoadingView';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'production')
{
	debug.enable('*');
}

const logger = new Logger();

let skypeClient;

SkypeClient.init({ store });

domready(() =>
{
	logger.debug('DOM ready');

	run();
});

function run()
{
	logger.debug('run() [environment:%s]', process.env.NODE_ENV);

	skypeClient = new SkypeClient();
	global.skypeClient = skypeClient;

	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={<LoadingView />} persistor={persistor}>
				<ClientContext.Provider value={skypeClient}>
					<SnackbarProvider>
						<App />
					</SnackbarProvider>
				</ClientContext.Provider>
			</PersistGate>
		</Provider>,
		document.getElementById('skype-presence')
	);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
