import React from 'react';
import { Redirect, userParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'
import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';
import { QUERY_USER, GET_Me} from '../utils/queries'

const Profile = () => {
  const { username: userParam} = userParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : GET_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me"/>;
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user?.username) {
    return (
      <h4>
        You must be signed in to view the historical documents.
        Please use the navigation items to sign up or log in.
      </h4>
    );
  }

  return (
    <div>

    </div>
  );
};
  
  

export default Profile;