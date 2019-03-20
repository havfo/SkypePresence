import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withClientContext } from '../../clientContext';
import { withStyles } from '@material-ui/core/styles';
import * as stateActions from '../../actions/stateActions';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = (theme) =>
	({
		paper :
		{
			padding                      : theme.spacing.unit * 2,
			[theme.breakpoints.up('sm')] : {
				width : '100vw'
			},
			[theme.breakpoints.up('md')] : {
				width : '50vw'
			},
			[theme.breakpoints.up('lg')] : {
				width : '30vw'
			},
			[theme.breakpoints.up('xl')] : {
				width : '20vw'
			}
		}
	});

const Account = (props) =>
{
	const {
		skypeClient,
		username,
		password,
		// domain,
		autoRegister,
		setUsername,
		setPassword,
		// setDomain,
		setAutoRegister,
		registered,
		displayName,
		email,
		classes
	} = props;

	return (
		<Paper className={classes.paper}>
			{ !registered ?
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<TextField
							id='username'
							label='SfB username'
							type='email'
							value={username || ''}
							fullWidth
							onChange={(event) => setUsername(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='password'
							label='SfB password'
							type='password'
							value={password || ''}
							fullWidth
							onChange={(event) => setPassword(event.target.value)}
						/>
					</Grid>
					{/*
					<Grid item xs={12}>
						<TextField
							id='domain'
							label='SfB domain'
							type='url'
							value={domain || ''}
							style={{ width: '100%' }}
							onChange={(event) => setDomain(event.target.value)}
						/>
					</Grid>
					*/}
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									checked={autoRegister}
									onChange={() => setAutoRegister(!autoRegister)}
								/>
							}
							label='Autoregister'
						/>
						
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='primary'
							onClick={() => skypeClient.register()}
						>
							Register
						</Button>
					</Grid>
				</Grid>
				:<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='body1' noWrap>
							{ displayName }
						</Typography>
						<Typography noWrap>
							{ email }
						</Typography>
						<Typography variant='caption' noWrap>
							Registered
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => skypeClient.unRegister()}
						>
							Unregister
						</Button>
					</Grid>
				</Grid>
			}
		</Paper>
	);
};

Account.propTypes =
{
	skypeClient     : PropTypes.any.isRequired,
	username        : PropTypes.string,
	setUsername     : PropTypes.func,
	password        : PropTypes.string,
	setPassword     : PropTypes.func,
	domain          : PropTypes.string,
	autoRegister    : PropTypes.bool,
	setDomain       : PropTypes.func.isRequired,
	setAutoRegister : PropTypes.func.isRequired,
	registered      : PropTypes.bool.isRequired,
	displayName     : PropTypes.string,
	email           : PropTypes.string,
	avatarUrl       : PropTypes.string,
	status          : PropTypes.string,
	classes         : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		username     : state.user.username,
		password     : state.user.password,
		domain       : state.user.domain,
		autoRegister : state.user.autoRegister,
		registered   : state.userStatus.registered,
		displayName  : state.userStatus.displayName,
		email        : state.userStatus.email,
		avatarUrl    : state.userStatus.avatarUrl,
		status       : state.userStatus.status
	});

const mapDispatchToProps = (dispatch) =>
	({
		setUsername : (username) => dispatch(
			stateActions.setUsername({ username })),
		setPassword : (password) => dispatch(
			stateActions.setPassword({ password })),
		setDomain : (domain) => dispatch(
			stateActions.setDomain({ domain })),
		setAutoRegister : (autoRegister) => dispatch(
			stateActions.setAutoRegister({ autoRegister }))
	});

export default withClientContext(
	connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
);
