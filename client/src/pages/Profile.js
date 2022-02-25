import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'
import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';
import { QUERY_USER, GET_ME} from '../utils/queries'

const Profile = () => {
  const { username: useParam} = useParams();
  const { loading, data } = useQuery(useParam ? QUERY_USER : GET_ME, {
    variables: { username: useParam },
  });
  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === useParam) {
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
          Viewing {useParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className='right-align'>
          <section className=''>
            <Searchbox/>
          </section>
        </div>

        <div className="">
          <CharacterList
            characters={user.characters}
            title={`${user.username}'`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!useParam && (
          <div
            className=""
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <section />
          </div>
        )}
      </div>
    </div>
  );
};
  
  

export default Profile;