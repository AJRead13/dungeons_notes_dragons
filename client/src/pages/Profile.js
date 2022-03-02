import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { GET_ME } from "../utils/queries";
import {
  Button,
  ListItemButton,
  List,
  Card,
  CardContent,
} from "@mui/material";
import CharCreate from "../components/CharCreate";
import { DELETE_CHARACTER } from "../utils/mutations";
import { useHistory } from 'react-router';
import Typography from '@mui/material/Typography';

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
        <Card >
          <CardContent sx={{backgroundColor: "black", color: "white", textAlign: "center"}}>
            <Typography variant="h2">{user.username}'s Profile</Typography>
          </CardContent>
          <CardContent style={{ textAlign: "center" }} className="card-cody m-5">
            <Typography cariant="h2">Your characters:</Typography>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <List className="square">
                {userCharacters.map((character) => {
                  return (
                    <Card key={character._id}>
                      <CardContent >
                        <ListItemButton sx={{justifyContent: "space-between"}}>
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
                          <Button sx={{color: "red"}} key={character._id} onClick={() => {handleRemoveChar(character._id)}}>Remove</Button>
                        </ListItemButton>
                        
                      </CardContent>
                    </Card>
                  );
                })}
              </List>
            )}
          </CardContent>
          {Auth.loggedIn() ? (
            <div>
              <CharCreate />
            </div>
          ) : (
            <div></div>
          )}
        </Card>
      ) : (
        <div>
          <h1>Please Log In</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
