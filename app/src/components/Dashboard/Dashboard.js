import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ContactCard from './ContactCard';

const styles = (theme) =>
	({
		dashboard :
		{
			paddingTop  : theme.spacing.unit * 2,
			paddingLeft : theme.spacing.unit * 2
		}
	});

const Dashboard = (props) =>
{
	const {
		subscribed,
		classes
	} = props;

	return (
		<Grid container alignItems='center' justify='center' spacing={0} className={classes.dashboard}>
			{
				subscribed.map((personId, index) =>
				{
					return (
						<ContactCard key={index} personId={personId} />
					);
				})
			}
		</Grid>
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
