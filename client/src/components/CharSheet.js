import React, { useState } from "react";
import { Alert, AlertTitle, Button, Grid, IconButton, TextField } from '@mui/material';
import { ADD_NOTE, DELETE_NOTE, UPDATE_CHARACTER } from '../utils/mutations';
import { useHistory } from "react-router";
import { Add, Remove } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { __Field } from "graphql";
import Auth from '../utils/auth';

const getModifier = score => Math.floor((score - 10)/2);

const CharSheet = ({character}) => {
  const [charData, setCharData] = useState({...character});
  const [noteData, setNoteData] = useState({title: '', text: '' });
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [addNote, { addError }] = useMutation(ADD_NOTE);
  const [deleteNote, { deleteError }] = useMutation(DELETE_NOTE);
  const [updateCharacter, { uperror }] = useMutation(UPDATE_CHARACTER);
  console.log(charData);
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setCharData({ ...charData, [name]: JSON.parse(value) })
    
  };
  const handleUpdate = async (event) => {
    try {
      const { data } = await updateCharacter({
        variables: {
          characterId: character._id,
          characterToUpdate: 
          {
          _id: charData._id,
          characterName: charData.characterName,
          className: charData.className,
          race: charData.race,
          hitPoints: charData.hitPoints,
          strength: charData.strength,
          dexterity: charData.dexterity,
          constitution: charData.constitution,
          intelligence: charData.intelligence,
          wisdom: charData.wisdom,
          charisma: charData.charisma,},
          madeBy: Auth.getProfile().data.username,
        },
      });
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }
  

  const toggleCreate = () => {
    setShowCreateNote(!showCreateNote);
  }

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNoteData({...noteData, [name]: value});
  }

  const submitNote = async (event) => {
    event.preventDefault();
   
    try {
      const { data } = await addNote({variables: {characterId: charData._id, noteToSave: noteData}});
      console.log(data.addNote);
      setShowCreateNote(false);
      setNoteData({title:'', text:''});
      setCharData(data.addNote);
      //history.push(0)
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }
  }

  const removeNote = async (noteId) => {
    try {
      await deleteNote({variables: { characterId: charData._id, noteToDelete: noteId}});
      setCharData({...charData, notes: charData.notes.filter((note) => note._id !== noteId)});
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }
  }

  return (
    <>
      {uperror && (
        <Alert severity="error" onClose={() => {}}>
          <AlertTitle>Error</AlertTitle>
          An error occured while trying to update your character.
        </Alert>
      )}
      <Grid container rowSpacing={2} spacing={2}>
        <Grid item xs={4}>
          <h3 className="charName">{charData.characterName}</h3>
          <h3 className="userName">{charData.madeBy}</h3>
        </Grid>
        <Grid item xs={4}>
          <h3 className="charRace">{charData.race}</h3>
          <h3 className="charClass">{charData.className}</h3>
        </Grid>
        <Grid item xs={4}>
          <h3 className="charHP">{charData.hitPoints}</h3>
          <h3 className="charAlignment">{charData.alignment}</h3>
        </Grid>

        <Grid item xs={4}>
          <table>
            <tbody>
              <tr>
                <th>Ability</th>
                <th>Score</th>
                <th>Modifier</th>
              </tr>
              <tr>
                <td>Strength</td>
                <td>
                  <TextField size="small" type="number" name="strength" value={charData.strength} id="strScore" onChange={handleInputChange} onBlur={handleUpdate}></TextField>
                </td>
                <td>
                  <TextField size="small" disabled type="number" value={getModifier(charData.strength)} id="strMod"></TextField>
                </td>
              </tr>
              <tr>
                <td>Dexterity</td>
                <td>
                  <TextField size="small" type="number" name="dexterity" value={charData.dexterity} id="dexScore" onChange={handleInputChange} onBlur={handleUpdate}></TextField>
                </td>
                <td>
                  <TextField size="small" disabled type="number" value={getModifier(charData.dexterity)} id="dexMod"></TextField>
                </td>
              </tr>
              <tr>
                <td>Constitution</td>
                <td>
                  <TextField size="small" type="number" name="constitution" value={charData.constitution} id="conScore" onChange={handleInputChange} onBlur={handleUpdate}></TextField>
                </td>
                <td>
                  <TextField size="small" disabled type="number" value={getModifier(charData.constitution)} id="conMod"></TextField>
                </td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td>
                  <TextField size="small" type="number" name="intelligence" value={charData.intelligence} id="intScore" onChange={handleInputChange} onBlur={handleUpdate}></TextField>
                </td>
                <td>
                  <TextField size="small" disabled type="number" value={getModifier(charData.intelligence)} id="intMod"></TextField>
                </td>
              </tr>
              <tr>
                <td>Wisdom</td>
                <td>
                  <TextField size="small" type="number" name="wisdom" value={charData.wisdom} id="wisScore" onChange={handleInputChange} onBlur={handleUpdate}></TextField>
                </td>
                <td>
                  <TextField size="small" disabled type="number" value={getModifier(charData.wisdom)} id="wisMod"></TextField>
                </td>
              </tr>
              <tr>
                <td>Charisma</td>
                <td>
                  <TextField size="small" type="number" name="charisma" value={charData.charisma} id="chaScore" onChange={handleInputChange} onBlur={handleUpdate}></TextField>
                </td>
                <td>
                  <TextField size="small" disabled type="number" value={getModifier(charData.charisma)} id="chaMod"></TextField>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={4}>
          <h3>Player Level</h3>
          <br/>
          <TextField type="number" name="level" id="charLevel" min="1" max="20" value={1} onChange={handleInputChange}></TextField>
        </Grid>

        <Grid item xs={4}>
          <h3>Proficiency Bonus</h3>
          <br/>
          <TextField type="number" id="profBonus" value={Math.ceil((1/4) + 1)}></TextField>
        </Grid>

        <Grid item xs={12}>
          <h3>Notes <IconButton onClick={toggleCreate}><Add/></IconButton></h3>
          {addError && (
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              An error occured while trying to add the note.
            </Alert>
          )}
          {deleteError && (
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              An error occured while trying to delete the note.
            </Alert>
          )}
          {showCreateNote && (
            <div id="createNote">
              <TextField name="title" placeholder="Title" onChange={handleNoteChange}></TextField>
              <TextField multiline name="text" onChange={handleNoteChange}></TextField>
              <Button onClick={submitNote}>Submit</Button>
            </div>
          )}
          {charData.notes.map((note) => 
            <div key={note._id} className="note">
              <h4>{note.title} <IconButton onClick={() => removeNote(note._id)}><Remove/></IconButton></h4>
              <h5>{note.timestamp}</h5>
              <p>{note.text}</p>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CharSheet;
