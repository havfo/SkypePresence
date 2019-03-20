import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AvatarIcon from './avatar.png';

const styles = (theme) =>
	({
		paper :
		{
			padding      : theme.spacing.unit * 2,
			textAlign    : 'center',
			marginRight  : theme.spacing.unit * 2,
			marginBottom : theme.spacing.unit * 2
		},
		lightRed :
		{
			backgroundColor : 'rgba(255, 0, 0, 0.4)'
		},
		red :
		{
			backgroundColor : 'rgba(255, 0, 0, 0.6)'
		},
		yellow :
		{
			backgroundColor : 'rgba(255, 255, 0, 0.5)'
		},
		green :
		{
			backgroundColor : 'rgba(0, 255, 0, 0.5)'
		},
		grey :
		{
			opacity : 0.5
		},
		contactAvatar :
		{
			float       : 'left',
			marginRight : theme.spacing.unit * 2,
			height      : 100,
			width       : 100
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

	let status = classes.yellow;

	if (person.status === 'Online')
		status = classes.green;
	else if (person.status === 'Busy')
		status = classes.lightRed;
	else if (person.status === 'DoNotDisturb')
		status = classes.red;
	else if (person.status === 'Offline')
		status = classes.grey;

	return (
		<Grid item xs={12} md={6} lg={4} xl={3}>
			<Paper
				className={classnames(status, classes.paper)}
			>
				<Grid container spacing={0}>
					<Grid item xs={2}>
						<Avatar
							alt={person.displayName}
							className={classes.contactAvatar}
							src={AvatarIcon}
						/>
					</Grid>
					<Grid item xs={10}>
						<Typography variant='h6' noWrap>
							{ person.displayName }
						</Typography>
						<Typography variant='subtitle1' noWrap>
							{ person.id }
						</Typography>
						<Typography variant='subtitle1' noWrap>
							{ person.status }
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

ContactCard.propTypes =
{
	person  : PropTypes.object,
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state, { personId }) =>
	({
		person : state.persons[personId]
	});

export default connect(mapStateToProps, null)(withStyles(styles)(ContactCard));