import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Person from './Person';
import Paper from '@material-ui/core/Paper';

const styles = (theme) =>
	({
		toolbar : theme.mixins.toolbar,
		nested  :
		{
			paddingLeft : theme.spacing.unit * 4
		},
		paper :
		{
			padding : theme.spacing.unit * 2
		}
	});

class ContactList extends React.Component
{
	state = {};

	handleClick = (index) =>
	{
		this.setState({ [index]: !this.state[index] });
	};

	render()
	{
		const {
			persons,
			classes
		} = this.props;

		return (
			<Paper className={classes.paper}>
				<List>
					{
						Object.values(persons).map((person, index) =>
						{
							return (<Person key={index} personId={person.id} />);
						})
					}
				</List>
			</Paper>
		);
	}
}

ContactList.propTypes =
{
	persons : PropTypes.object,
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		persons : state.persons
	});

export default connect(mapStateToProps, null)(withStyles(styles)(ContactList));
