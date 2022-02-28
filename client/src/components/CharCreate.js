import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, IconButton, TextField, InputLabel, NativeSelect, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { GET_ME, QUERY_CHARACTERS } from '../utils/queries';
import { ADD_CHARACTER } from '../utils/mutations';
import Auth from '../utils/auth';
import { generateScore } from '../utils/abilityScore';

const CharForm = () => {
  const [charFormData, setCharFormData] = useState({ characterName: '', race: '', className: '', hitPoints: 10, strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 });
  const stats = [{stat: "strength", score: 0}, {stat: "dexterity", score: 0}, {stat: "constitution", score: 0}, {stat: "intelligence", score: 0}, {stat: "wisdom", score: 0}, {stat: "charisma", score: 0}];

  const [addCharacter, { error }] = useMutation(ADD_CHARACTER, {
    update(cache, { data: { addCharacter } }) {
      try {
        const { characters } = cache.readQuery({ query: QUERY_CHARACTERS });

        cache.writeQuery({
          query: QUERY_CHARACTERS,
          data: { characters: [addCharacter, ...characters] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: { ...me, characters: [...me.characters, addCharacter] } },
      });
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharFormData({ ...charFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addCharacter({
        variables: {
          ...charFormData,
          madeBy: Auth.getProfile().data.username,
        },
      });

      setCharFormData({ characterName: '', race: '', className: '', hitPoints: 10, strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  const handleStats = async (event) => {
    event.preventDefault();
  
    for(let i=0; i<stats.length; i++){
      stats[i].score = generateScore();
    }
    return stats;
  }

  return (
    <>
    {error && (     
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong with adding a character!
      </Alert>
    )}
    <Box>
      <TextField
        required
        id="new-characterName"
        name="characterName"
        label="characterName"
        type="text"
        onChange={handleInputChange}
      />
      <InputLabel id="new-race">
      Race
      </InputLabel>
      <NativeSelect
        defaultValue = {"Select"}
        inputProps={{
          name: 'race',
          id: 'new-race'
        }}
      >
      <option value={"race"}>race</option>
      </NativeSelect>
      <InputLabel id="new-className">
      Class
      </InputLabel>
      <NativeSelect
        defaultValue = {"Select"}
        inputProps={{
          name: 'className',
          id: 'new-className'
        }}
      >
      <option value={"class"}>class</option>
      </NativeSelect>
      <InputLabel id="new-hitPoints">Hit Points</InputLabel>
      <Input id="new-hitPoints" defaultValue={10} />
      <InputLabel id="new-strength">Strength</InputLabel>
      <Input id="new-strength" defaultValue={stats[0].score} />
      <InputLabel id="new-dexterity">Dexterity</InputLabel>
      <Input id="new-dexterity" defaultValue={stats[1].score} />
      <InputLabel id="new-constitution">Constitution</InputLabel>
      <Input id="new-constitution" defaultValue={stats[2].score} />
      <InputLabel id="new-intelligence">Intelligence</InputLabel>
      <Input id="new-intelligence" defaultValue={stats[3].score} />
      <InputLabel id="new-wisdom">Wisdom</InputLabel>
      <Input id="new-wisdom" defaultValue={stats[4].score} />
      <InputLabel id="new-charisma">Charisma</InputLabel>
      <Input id="new-charisma" defaultValue={stats[5].score} />
      
      {/* <Button variant="contained" onClick={handleStats}>Generate Stats</Button> */}
      <Button variant="contained" onClick={handleFormSubmit}>Create</Button>
    </Box>
  </>
  ); 
}

export default CharForm;