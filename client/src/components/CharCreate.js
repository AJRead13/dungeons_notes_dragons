import React, { useState } from 'react';
import { Alert, AlertTitle, TextField, InputLabel, NativeSelect, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_CHARACTER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';

const CharForm = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [charFormData, setCharFormData] = useState({ characterName: '', race: '', className: '', hitPoints: 10, strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 });
  
  const raceList = ["human", "elf", "dwarf", "gnome", "dragonborn", "half-elf", "halfling", "half-orc", "tiefling"];
  const classList = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"]

  const [addCharacter, { error }] = useMutation(ADD_CHARACTER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharFormData({ ...charFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    // history.go(0);
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
      setCharFormData({ characterName: '', race: '', className: '', hitPoints: 10, strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 });

      history.go(0);

    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

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
					<Button sx={{backgroundColor: "black", color: "white"}} onClick={() => setShowModal(true)}>Create</Button>
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
    <Button sx={{backgroundColor: "black", color: "white"}} variant="outlined" onClick={handleFormSubmit} >Create</Button>
    </Dialog>
  </>
  ); 
}

export default CharForm;