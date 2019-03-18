import React from 'react';

const ClientContext = React.createContext();

export default ClientContext;

export const withClientContext = (Component) =>
{
	return (props) =>
		(
			<ClientContext.Consumer>
				{(skypeClient) => <Component {...props} skypeClient={skypeClient} />}
			</ClientContext.Consumer>
		);
};