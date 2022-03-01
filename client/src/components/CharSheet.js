import React, { useState } from "react";
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { AddIcon, RemoveIcon } from "@mui/icons-material";
import { ADD_NOTE, DELETE_NOTE } from '../utils/mutations';
import { __Field } from "graphql";

const getModifier = score => Math.floor((score - 10)/2);

const CharSheet = (character) => {
  const char = character?.character || {};
  const [charData, setCharData] = useState({...char, level: 1});
  const [noteData, setNoteData] = useState({title: '', text: '', timestamp: ''});
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [addNote, { addError }] = useMutation(ADD_NOTE);
  const [deleteNote, { deleteError }] = useMutation(DELETE_NOTE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharData({ ...charData, [name]: value });
  };

  const openCreate = () => {
    setShowCreateNote(true);
  }

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNoteData({...noteData, [name]: value});
  }

  const submitNote = async (event) => {
    event.preventDefault();

    const newNote = {
      title: noteData.title,
      text: noteData.text,
      timestamp: Date.now()
    }

    try {
      await addNote({variables: {characterId: charData._id, ...newNote}});
      setShowCreateNote(false);
      setCharData({...charData, notes: [...charData.notes, newNote]});
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }
  }

  const deleteNote = async (event, noteId) => {
    event.preventDefault();

    try {
      await deleteNote({variables: { characterId: charData._id, noteId: noteId}});
      setCharData({...charData, notes: charData.notes.filter((note) => note._id !== noteId)});
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }
  }

  return (
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
                <TextField size="small" type="number" name="strength" value={charData.strength} id="strScore" onChange={handleInputChange}></TextField>
              </td>
              <td>
                <TextField size="small" disabled type="number" value={getModifier(charData.strength)} id="strMod"></TextField>
              </td>
            </tr>
            <tr>
              <td>Dexterity</td>
              <td>
                <TextField size="small" type="number" name="dexterity" value={charData.dexterity} id="dexScore" onChange={handleInputChange}></TextField>
              </td>
              <td>
                <TextField size="small" disabled type="number" value={getModifier(charData.dexterity)} id="dexMod"></TextField>
              </td>
            </tr>
            <tr>
              <td>Constitution</td>
              <td>
                <TextField size="small" type="number" name="constitution" value={charData.constitution} id="conScore" onChange={handleInputChange}></TextField>
              </td>
              <td>
                <TextField size="small" disabled type="number" value={getModifier(charData.constitution)} id="conMod"></TextField>
              </td>
            </tr>
            <tr>
              <td>Intelligence</td>
              <td>
                <TextField size="small" type="number" name="intelligence" value={charData.intelligence} id="intScore" onChange={handleInputChange}></TextField>
              </td>
              <td>
                <TextField size="small" disabled type="number" value={getModifier(charData.intelligence)} id="intMod"></TextField>
              </td>
            </tr>
            <tr>
              <td>Wisdom</td>
              <td>
                <TextField size="small" type="number" name="wisdom" value={charData.wisdom} id="wisScore" onChange={handleInputChange}></TextField>
              </td>
              <td>
                <TextField size="small" disabled type="number" value={getModifier(charData.wisdom)} id="wisMod"></TextField>
              </td>
            </tr>
            <tr>
              <td>Charisma</td>
              <td>
                <TextField size="small" type="number" name="charisma" value={charData.charisma} id="chaScore" onChange={handleInputChange}></TextField>
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
        <TextField type="number" name="level" id="charLevel" min="1" max="20" value={charData.level} onChange={handleInputChange}></TextField>
      </Grid>

      <Grid item xs={4}>
        <h3>Proficiency Bonus</h3>
        <br/>
        <TextField type="number" id="profBonus" value={Math.ceil((charData.level/4) + 1)}></TextField>
      </Grid>

      <Grid item xs={12}>
        <h3>Notes <IconButton onClick={openCreate}><AddIcon/></IconButton></h3>
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
            <TextField name="title" placeholder="Title" onClick={handleNoteChange}></TextField>
            <TextField multiline name="text" onClick={handleNoteChange}></TextField>
            <Button onClick={submitNote}>Submit</Button>
          </div>
        )}
        {charData.notes.map((note) => {
        <div class="note">
          <h4>{note.title} <IconButton onClick={(event) => deleteNote(event, note._id)}><RemoveIcon/></IconButton></h4>
          <h5>{note.timestamp}</h5>
          <p>{note.text}</p>
        </div>
        })}
      </Grid>
    </Grid>
  );
};

export default CharSheet;
