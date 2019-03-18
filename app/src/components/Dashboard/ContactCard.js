import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = (theme) =>
	({
		paper :
		{
			padding    : theme.spacing.unit * 2,
			width      : '20vw',
			marginLeft : theme.spacing.unit * 2
		},
		avatarGreen :
		{
			border      : '2px solid rgba(0, 255, 0, 0.5)',
			float       : 'left',
			marginRight : theme.spacing.unit * 2
		},
		avatarRed :
		{
			border      : '2px solid rgba(255, 0, 0, 0.5)',
			float       : 'left',
			marginRight : theme.spacing.unit * 2
		},
		avatarYellow :
		{
			border      : '2px solid rgba(255, 255, 0, 0.5)',
			float       : 'left',
			marginRight : theme.spacing.unit * 2
		}
	});

const ContactCard = (props) =>
{
	const {
		person,
		classes
	} = props;

	if (!person)
		return null;

	let status = classes.avatarYellow;

	if (person.status === 'Online')
		status = classes.avatarGreen;
	else if (person.status === 'Busy')
		status = classes.avatarRed;

	return (
		<Paper
			className={classes.paper}
		>
			{ person.avatarUrl ?
				<Avatar alt={person.displayName} src={person.avatarUrl} className={status} />
				:<Avatar alt={person.displayName} className={status}>{person.displayName.charAt(0)}</Avatar>
			}
			<Typography variant='body1' noWrap>
				{ person.displayName }
			</Typography>
			<Typography noWrap>
				{ person.id }
			</Typography>
		</Paper>
	);
};

ContactCard.propTypes =
{
	person      : PropTypes.object,
	classes     : PropTypes.object.isRequired
};

const mapStateToProps = (state, { personId }) =>
	({
		person : state.persons[personId]
	});

const mapDispatchToProps = (dispatch) =>
	({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactCard));