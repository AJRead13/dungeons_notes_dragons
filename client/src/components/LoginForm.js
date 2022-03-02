import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      })
      Auth.login(data.login.token);
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {error && (     
        <Alert severity="error" onClose={() => {}}>
          <AlertTitle>Error</AlertTitle>
          Username or password is incorrect.
        </Alert>
      )}
      <Box>
        <TextField
          required
          id="login-email"
          name="email"
          label="Email"
          type="email"
          value={userFormData.email}
          error={invalidEmail}
          onChange={handleInputChange}
        />
         <TextField
          required
          id="login-password"
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
        <Button variant="contained" onClick={handleFormSubmit}>Log In</Button>
      </Box>
    </>
  )
}

export default LoginForm;