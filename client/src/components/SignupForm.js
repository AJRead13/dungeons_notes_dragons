import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    if (name === 'email') {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        setInvalidEmail(true);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const input = event.currentTarget;
    if (input.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { token, user } = await addUser(userFormData);
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {error && (     
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong with your signup!
        </Alert>
      )}
      <Box>
        <TextField
          required
          id="signup-username"
          name="username"
          label="Username"
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          required
          id="signup-email"
          name="email"
          label="Email"
          type="email"
          error={invalidEmail}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="signup-password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={userFormData.password}
          autoComplete="current-password"
          onChange={handleInputChange}
          InputProps={{
               endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
               )
               }}
        />
        <Button variant="contained" onClick={handleFormSubmit}>Sign Up</Button>
      </Box>
    </>
  )
}

export default SignupForm;