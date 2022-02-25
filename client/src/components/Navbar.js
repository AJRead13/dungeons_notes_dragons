import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Dialog, IconButton, Menu, MenuItem, Tabs, Tab, Toolbar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

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

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Link to="/">Dungeons, Notes, Dragons</Link>
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
                <AccountCircle />
              </IconButton>  
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem 
                    containerElement={<Link to="/profile" />}
                    primaryText="Profile"
                  />
                  <MenuItem
                    onClick={Auth.logout}
                    primaryText="Logout"
                  />
                </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => setShowModal(true)}>Login/Sign Up</Button>
          )}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Box>
          <Tabs value={tab} onChange={setTab}>
            <Tab label="Log In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        <section tabIndex={0} hidden={tab !== 0}>
          <LoginForm/>
        </section>
        <section tabIndex={1} hidden={tab !== 1}>
          <SignupForm/>
        </section>
      </Dialog>
    </>
  )
}

export default Navbar;