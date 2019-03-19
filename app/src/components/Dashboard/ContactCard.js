import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AvatarIcon from './avatar.png';

const styles = (theme) =>
	({
		paperGreen :
		{
			padding         : theme.spacing.unit * 2,
			width           : '30vw',
			marginLeft      : theme.spacing.unit * 2,
			marginBottom    : theme.spacing.unit * 2,
			backgroundColor : 'rgba(0, 255, 0, 0.5)'
		},
		paperRed :
		{
			padding         : theme.spacing.unit * 2,
			width           : '30vw',
			marginLeft      : theme.spacing.unit * 2,
			marginBottom    : theme.spacing.unit * 2,
			backgroundColor : 'rgba(255, 0, 0, 0.4)'
		},
		paperYellow :
		{
			padding         : theme.spacing.unit * 2,
			width           : '30vw',
			marginLeft      : theme.spacing.unit * 2,
			marginBottom    : theme.spacing.unit * 2,
			backgroundColor : 'rgba(255, 255, 0, 0.5)'
		},
		contactAvatar :
		{
			float       : 'left',
			marginRight : theme.spacing.unit * 2,
			width       : 100,
			height      : 100
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

	let status = classes.paperYellow;

	if (person.status === 'Online')
		status = classes.paperGreen;
	else if (person.status === 'Busy')
		status = classes.paperRed;

	return (
		<Paper
			className={status}
		>
			<Avatar
				alt={person.displayName}
				className={classes.contactAvatar}
				src={AvatarIcon}
			/>
			<Typography variant='h6' noWrap>
				{ person.displayName }
			</Typography>
			<Typography variant='subtitle1' noWrap>
				{ person.id }
			</Typography>
			<Typography variant='subtitle1' noWrap>
				{ person.status }
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