import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Dialog, IconButton, Menu, MenuItem, Tabs, Tab, Toolbar, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AccountCircle } from '@mui/icons-material';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Searchbox from './Searchbox';
import icon from '../images/dndIconSmall.png';

import Auth from '../utils/auth';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState(0);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  }

  return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters sx={{justifyContent: "space-between"}}>
					<Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' }, maxWidth: { xs: "50px", md: "100px"}, maxHeight: { xs: "50px", md: "100px"}, objectFit: { xs: "contain"} }}
          >
          <Link style={{ color: "black" }} to="/">
							<img src={icon} alt='logo' style={{maxWidth: "100px", objectFit: "contain"}}></img>
					</Link>
          </Typography>
				
					<Searchbox ></Searchbox>
					
					<Typography>
						{Auth.loggedIn() ? (
							<>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<AccountCircle  />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem
										containerelement={<Link to={{ pathname: "/profile" }} />}
										primarytext="Profile"
									>
										<ListItemText>
											<Link to={{ pathname: `/profile` }}>Profile</Link>
										</ListItemText>
									</MenuItem>
									<MenuItem onClick={Auth.logout} primarytext="Logout">
										<ListItemText>Logout</ListItemText>
									</MenuItem>
								</Menu>
							</>
						) : (
							<Button color="inherit" onClick={() => setShowModal(true)}>
								Login/Sign Up
							</Button>
						)}
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
			<Dialog open={showModal} onClose={() => setShowModal(false)}>
				<Box>
					<Tabs value={tab} onChange={handleTabChange}>
						<Tab label="Log In" />
						<Tab label="Sign Up" />
					</Tabs>
				</Box>
				<section tabIndex={0} hidden={tab !== 0}>
					<LoginForm />
				</section>
				<section tabIndex={1} hidden={tab !== 1}>
					<SignupForm />
				</section>
			</Dialog>
		</>
	);
}

export default Navbar;