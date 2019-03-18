import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContactCard from './ContactCard';

const styles = (theme) =>
	({
		dashboard :
		{
			width          : '100%',
			height         : '100%',
			display        : 'flex',
			flexDirection  : 'row',
			flexWrap       : 'wrap',
			justifyContent : 'center',
			alignItems     : 'center',
			alignContent   : 'center',
			padding        : theme.spacing.unit * 2
		},
		card :
		{
			flex       : '0 0 auto',
			margin     : theme.spacing.unit * 3
		}
	});

const Dashboard = (props) =>
{
	const {
		subscribed,
		classes
	} = props;

	return (
		<div className={classes.dashboard}>
			{
				subscribed.map((personId, index) =>
				{
					return (<ContactCard key={index} personId={personId} />);
				})
			}
		</div>
	);
};

Dashboard.propTypes =
{
	subscribed : PropTypes.array,
	classes    : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		subscribed : state.subscribed
	});

const mapDispatchToProps = (dispatch) =>
	({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
