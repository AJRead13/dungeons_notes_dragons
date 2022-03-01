import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'
import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';
import { GET_ME } from '../utils/queries';
import { Button, Dialog } from '@mui/material';

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);

  const user = data?.me || data?.user || {};
  const userDataLength = Object.keys(user).length;
  if (Auth.loggedIn()) {
    return <Redirect to="/profile"/>;
  }

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  // if (loading) {
  //   return <div>Loading...</div>
  // }
  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You must be signed in to view the historical documents.
  //       Please use the navigation items to sign up or log in.
  //     </h4>
  //   );
  // }

  return (
    <div className="card bg-white card-rounded w-50">
    <Button >
      Profile
    </Button>
    </div>
  );
};
  
  

export default Profile;