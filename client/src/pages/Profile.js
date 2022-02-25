import React from 'react';
import { Redirect, userParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'
import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';
import { GET_ME } from '../utils/queries'

const Profile = () => {
<<<<<<< HEAD
  const { username: userParam} = userParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : GET_ME, {
    variables: { username: userParam },
=======
  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: "no-cache"
>>>>>>> b80c4f9 (fixing the profile jawn)
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn()) {
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
      <div className="">
        <h2 className="">
          Viewing Your Profile.
        </h2>
        <div className='right-align'>
          <section className=''>
            <Searchbox/>
          </section>
        </div>

        <div className="">
          {/* <CharacterList
            characters={user.characters}
            title={`${user.username}'`}
            showTitle={false}
            showUsername={false}
          /> */}
        </div>
      
      </div>
    </div>
  );
};
  
  

export default Profile;