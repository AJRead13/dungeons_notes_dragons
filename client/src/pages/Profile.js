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
  console.log(user);
  const userCharacters = user?.characters || [];
  const userDataLength = Object.keys(user).length;

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
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
    {Auth.loggedIn() ? (
      <div className="card bg-white card-rounded w-50">
        <div className="card-header bg-dark text-center">
        <h1>{user.username}'s Profile</h1>
			  </div>
        <div className="card-cody m-5">
          <h2>Here is a list of your characters:</h2>
          {loading ? (
					<div>Loading...</div>
				) : (
					<ul className="square">
						{userCharacters.map((character) => {
							return (
								<li key={character._id}>
									{Auth.loggedIn() ? (
									<Link to={{ pathname: `/character/${character._id}` }}>
										{character.characterName}
									</Link>
									) : (
										<Link to={{pathname: '/' }}>
										{character.characterName}
									</Link>
									)
									}
								</li>
							);
						})}
					</ul>
				)}
        </div>
    </div>
    ): (
     <div>
       <h1>Please Log In</h1>
      </div>
    )}
  </div>
);
};
  
  

export default Profile;