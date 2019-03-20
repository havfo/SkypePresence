import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withClientContext } from '../../clientContext';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) =>
	({
		nested :
		{
			paddingLeft : theme.spacing.unit * 4
		}
	});

const Person = (props) =>
{
	const {
		skypeClient,
		person,
		subscribed,
		classes
	} = props;

	return (
		<ListItem
			button
			onClick={() =>
			{
				if (subscribed.includes(person.id))
				{
					skypeClient.unSubscribe(person.id);
				}
				else
				{
					skypeClient.subscribe(person.id);
				}
			}}
			className={classes.nested}
		>
			<ListItemAvatar>
				<Avatar alt={person.displayName}>{person.displayName.charAt(0)}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={person.displayName}
				secondary={person.id}
			/>
			<ListItemSecondaryAction>
				<Checkbox
					onChange={() =>
					{
						if (subscribed.includes(person.id))
						{
							skypeClient.unSubscribe(person.id);
						}
						else
						{
							skypeClient.subscribe(person.id);
						}
					}}
					checked={subscribed.includes(person.id)}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

Person.propTypes =
{
	skypeClient : PropTypes.object.isRequired,
	person      : PropTypes.object,
	subscribed  : PropTypes.array,
	classes     : PropTypes.object.isRequired
};

const mapStateToProps = (state, { personId }) =>
	({
		person     : state.persons[personId],
		subscribed : state.subscribed
	});

export default withClientContext(
	connect(mapStateToProps, null)(withStyles(styles)(Person))
);