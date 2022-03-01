import React from "react";
import { Redirect, useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import CharSheet from "../components/CharSheet";
import Searchbox from "../components/Searchbox";
import { GET_ME } from "../utils/queries";
import {
  Button,
  Dialog,
  ListItemButton,
  ListItemText,
  List,
  Card,
  CardContent,
} from "@mui/material";
import CharCreate from "../components/CharCreate";
import { DELETE_CHARACTER } from "../utils/mutations";
import { useHistory } from 'react-router';

const Profile = () => {
  const history = useHistory();
  const { loading, data } = useQuery(GET_ME);

  const [deleteCharacter, { error }] = useMutation(DELETE_CHARACTER);

  const user = data?.me || data?.user || {};
  const userCharacters = user?.characters || [];
  const userDataLength = Object.keys(user).length;

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You must be signed in to view the historical documents. Please use the
        navigation items to sign up or log in.
      </h4>
    );
  }
  const handleRemoveChar = async (charId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      history.go(0);
      const { data } = await deleteCharacter({
        variables: { charToDelete: charId },
      });
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="card bg-white card-rounded w-50">
          <div className="card-header bg-dark text-center">
            <h1>{user.username}'s Profile</h1>
          </div>
          <div style={{ textAlign: "center" }} className="card-cody m-5">
            <h2>Here is a list of your characters:</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <List className="square">
                {userCharacters.map((character) => {
                  return (
                    <Card key={character._id}>
                      <CardContent>
                        <ListItemButton>
                          {Auth.loggedIn() ? (
                            <Link
                              to={{ pathname: `/character/${character._id}` }}
                            >
                              {character.characterName}
                            </Link>
                          ) : (
                            <Link to={{ pathname: "/" }}>
                              {character.characterName}
                            </Link>
                          )}
                        </ListItemButton>
                        <Button key={character._id} onClick={() => {handleRemoveChar(character._id)}}>Remove</Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </List>
            )}
          </div>
          {Auth.loggedIn() ? (
            <div>
              <CharCreate />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          <h1>Please Log In</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
