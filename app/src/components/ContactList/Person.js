import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as stateActions from '../../actions/stateActions';
import { withStyles } from '@material-ui/core/styles';
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
			paddingLeft : theme.spacing.unit * 4,
		},
		avatarGreen :
		{
			border : '2px solid rgba(0, 255, 0, 0.5)'
		},
		avatarRed :
		{
			border : '2px solid rgba(255, 0, 0, 0.5)'
		},
		avatarYellow :
		{
			border : '2px solid rgba(255, 255, 0, 0.5)'
		}
	});

const Person = (props) =>
{
	const {
		person,
		classes
	} = props;

	let avatar;

	if (person.avatarUrl)
	{
		avatar = (<Avatar alt={person.displayName} src={person.avatarUrl} />);
	}
	else
	{
		avatar = (
			<Avatar
				alt={person.displayName}
			>
				{person.displayName.charAt(0)}
			</Avatar>
		);
	}

	return (
		<ListItem
			button
			// onClick={() => setPerson(person.id)}
			className={classes.nested}
		>
			<ListItemAvatar>
				{avatar}
			</ListItemAvatar>
			<ListItemText
				primary={person.displayName}
				secondary={person.id}
			/>
			<ListItemSecondaryAction>
				<Checkbox
					// onChange={this.handleToggle(value)}
					// checked={this.state.checked.indexOf(value) !== -1}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

Person.propTypes =
{
	person  : PropTypes.object,
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state, { personId }) =>
	({
		person : state.persons[personId]
	});

const mapDispatchToProps = (dispatch) =>
	({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Person));