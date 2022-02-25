import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [invalidEmail, setInvalidEmail] = useState(false);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
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
        <Alert severity="error" onClose={() => {}}>
          <AlertTitle>Error</AlertTitle>
          Something went wrong with your signup!
        </Alert>
      )}
      <Box>
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
          id="login-password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleFormSubmit}>Log In</Button>
      </Box>
    </>
  )
}

module.exports = LoginForm;