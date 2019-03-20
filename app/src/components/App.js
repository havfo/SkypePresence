import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ContactsIcon from '@material-ui/icons/Contacts';
import Account from './Account/Account';
import Notifications from './Notifications/Notifications';
import ContactList from './ContactList/ContactList';
import Dashboard from './Dashboard/Dashboard';

const styles = (theme) =>
	({
		root :
		{
			flexGrow : 1
		},
		grow : {
			flexGrow : 1
		},
		title : {
			display                      : 'none',
			[theme.breakpoints.up('sm')] : {
				display : 'block'
			}
		},
		sectionDesktop : {
			display                      : 'none',
			[theme.breakpoints.up('md')] : {
				display : 'flex'
			}
		},
		sectionMobile : {
			display                      : 'flex',
			[theme.breakpoints.up('md')] : {
				display : 'none'
			}
		}
	});

class App extends Component
{
	state =
	{
		anchorEl           : null,
		mobileMoreAnchorEl : null,
		currentMenu        : null
	};

	handleExited = () =>
	{
		this.setState({
			currentMenu : null
		});
	};

	handleMenuOpen = (event, menu) =>
	{
		this.setState({
			anchorEl    : event.currentTarget,
			currentMenu : menu
		});
	};

	handleMenuClose = () =>
	{
		this.setState({
			anchorEl : null
		});

		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = (event) =>
	{
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () =>
	{
		this.setState({ mobileMoreAnchorEl: null });
	};

	render()
	{
		const {
			anchorEl,
			mobileMoreAnchorEl,
			currentMenu
		} = this.state;

		const {
			classes
		} = this.props;

		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		return (
			<div className={classes.root}>
				<Notifications />
				<CssBaseline />

				<AppBar
					position='static'
					// style={{ background: 'transparent', boxShadow: 'none' }}
				>
					<Toolbar>
						<Typography
							className={classes.title}
							variant='h6'
							color='inherit'
							noWrap
						>
							Skype Presence Dashboard
						</Typography>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton
								aria-owns={isMenuOpen && currentMenu === 'contacts' ? 'material-appbar' : undefined}
								aria-haspopup='true'
								onClick={(event) => this.handleMenuOpen(event, 'contacts')}
								color='inherit'
							>
								<ContactsIcon />
							</IconButton>
							<IconButton
								aria-owns={isMenuOpen && currentMenu === 'account' ? 'material-appbar' : undefined}
								aria-haspopup='true'
								onClick={(event) => this.handleMenuOpen(event, 'account')}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-haspopup='true'
								onClick={this.handleMobileMenuOpen}
								color='inherit'
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				<Popover
					anchorEl={anchorEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					open={isMenuOpen}
					onClose={this.handleMenuClose}
					onExited={this.handleExited}
					getContentAnchorEl={null}
				>
					{ currentMenu === 'contacts' ?
						<ContactList />
						:null
					}
					{ currentMenu === 'account' ?
						<Account />
						:null
					}
				</Popover>
				<Menu
					anchorEl={mobileMoreAnchorEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={isMobileMenuOpen}
					onClose={this.handleMenuClose}
					getContentAnchorEl={null}
				>
					<MenuItem
						onClick={(event) => this.handleMenuOpen(event, 'contacts')}
					>
						<IconButton color='inherit'>
							<ContactsIcon />
						</IconButton>
						<p>Contacts</p>
					</MenuItem>
					<MenuItem
						onClick={(event) => this.handleMenuOpen(event, 'account')}
					>
						<IconButton color='inherit'>
							<AccountCircle />
						</IconButton>
						<p>Account</p>
					</MenuItem>
				</Menu>

				<Dashboard />
			</div>
		);
	}
}

App.propTypes =
{
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		registered : state.userStatus.registered
	});

export default connect(mapStateToProps, null)(withStyles(styles)(App));