import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, IconButton, TextField, InputLabel, NativeSelect, Input, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { SettingsPhoneTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME, QUERY_CHARACTERS } from '../utils/queries';
import { ADD_CHARACTER } from '../utils/mutations';
import Auth from '../utils/auth';
import { generateScore } from '../utils/abilityScore';

const CharForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [charFormData, setCharFormData] = useState({ characterName: '', race: '', className: '', hitPoints: 0, strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 });
  const stats = [{stat: "strength", score: 0}, {stat: "dexterity", score: 0}, {stat: "constitution", score: 0}, {stat: "intelligence", score: 0}, {stat: "wisdom", score: 0}, {stat: "charisma", score: 0}];
  const raceList = ["human", "elf", "dwarf", "gnome", "dragonborn", "half-elf", "halfling", "half-orc", "tiefling"];
  const classList = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"]

  const [addCharacter, { error }] = useMutation(ADD_CHARACTER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharFormData({ ...charFormData, [name]: value });
  };


  const handleFormSubmit = async (event) => {
    setShowModal(false);
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
      console.error(JSON.parse(JSON.stringify(err)));
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
    <div className="card-footer text-center m-3">
				<h2>Create a new character:</h2>
					<Button className="btn btn-lg btn-danger" onClick={() => setShowModal(true)}>Create</Button>
		</div>
    <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <DialogTitle>
          Create a Character:
        </DialogTitle>
    <DialogContent>
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
        onChange={handleInputChange}
        defaultValue = {"Select"}
        inputProps={{
          name: 'race',
          id: 'new-race'
        }}
      >
      <option value={"select"}>select</option>
      {raceList.map((race) => <option key={race} value={race}>{race}</option>)}
      
      </NativeSelect>
      <InputLabel id="new-className">
      Class
      </InputLabel>
      <NativeSelect
        onChange={handleInputChange}
        defaultValue = {"Select"}
        inputProps={{
          name: 'className',
          id: 'new-className'
        }}
      >
      <option value={"select"}>select</option>
      {classList.map((charClass) => <option key={charClass} value={charClass}>{charClass}</option>)}
      </NativeSelect>
      
    </DialogContent>
    <Button variant="contained" onClick={handleFormSubmit} >Create</Button>
    </Dialog>
  </>
  ); 
}

export default CharForm;