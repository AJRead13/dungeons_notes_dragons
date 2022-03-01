import React, { useState } from "react";
import { Alert, AlertTitle, Button, Grid, IconButton, TextField } from '@mui/material';
// import { AddIcon, RemoveIcon } from "@mui/icons-material";
import { ADD_NOTE, DELETE_NOTE, UPDATE_CHARACTER } from '../utils/mutations';
import { __Field } from "graphql";
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

 const getModifier = score => Math.floor((score - 10)/2);
// let barbarianHp = 12;
// let bardHp = 8;
// let clericHp = 8;
// let druidHp = 8;
// let fighterHp = 10;
// let monkHp = 8;
// let paladinHp = 10;
// let rangerHp = 10;
// let rogueHp = 8;
// let sorcererHp = 6;
// let warlockHp = 8;
// let wizardHp = 6;

// const getHpTotal = () => {
//   const [charData, setCharData] = useState({...char, level: 1});
  
//   if (charData.race == barbarian) {
//     charData.hitPoints = barbarianHp + getModifier(charData.constitution)
//   }
//   if (charData.race == bard) {
//     charData.hitPoints = bardHp + getModifier(charData.constitution)
//   }  
//   if (charData.race == cleric) {
//     charData.hitPoints = clericHp + getModifier(charData.constitution)
//   }  
//   if (charData.race == druid) {
//     charData.hitPoints = druidHp + getModifier(charData.constitution)
//   }     
//   if (charData.race == fighter) {
//     charData.hitPoints = fighterHp + getModifier(charData.constitution)
//   }     
//   if (charData.race == monk) {
//     charData.hitPoints = monkHp + getModifier(charData.constitution)
//   }     
//   if (charData.race == paladin) {
//     charData.hitPoints = paladinHp + getModifier(charData.constitution)
//   }      
//   if (charData.race == ranger) {
//     charData.hitPoints = rangerHp + getModifier(charData.constitution)
//   }          
//   if (charData.race == rogue) {
//     charData.hitPoints = rogueHp + getModifier(charData.constitution)
//   }     
//   if (charData.race == sorcerer) {
//     charData.hitPoints = sorcererHp + getModifier(charData.constitution)
//   }     
//   if (charData.race == warlock) {
//     charData.hitPoints = warlockHp + getModifier(charData.constitution)
//   }     
//   if (charData.race == wizard) {
//     charData.hitPoints = wizardHp + getModifier(charData.constitution)
//   }   
//   return charData.hitPoints;  

// };


const CharSheet = ({character}) => {
  const [charData, setCharData] = useState({...character});
  const [noteData, setNoteData] = useState({title: '', text: '', timestamp: ''});
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [addNote, { addError }] = useMutation(ADD_NOTE);
  const [deleteNote, { deleteError }] = useMutation(DELETE_NOTE);
  const [updateCharacter, { uperror }] = useMutation(UPDATE_CHARACTER);

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

  // const deleteNote = async (event, noteId) => {
  //   event.preventDefault();

  //   try {
  //     await deleteNote({variables: { characterId: charData._id, noteId: noteId}});
  //     setCharData({...charData, notes: charData.notes.filter((note) => note._id !== noteId)});
  //   } catch (err) {
  //     console.log(JSON.parse(JSON.stringify(err)));
  //   }
  // }

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
        <h3 className="charHP">{getHpTotal(charData.className)}</h3>
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
        {/* <h3>Notes <IconButton onClick={openCreate}><AddIcon/></IconButton></h3> */}
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
          {/* <h4>{note.title} <IconButton onClick={(event) => deleteNote(event, note._id)}><RemoveIcon/></IconButton></h4> */}
          <h5>{note.timestamp}</h5>
          <p>{note.text}</p>
        </div>
        })}
      </Grid>
    </Grid>
  );
};

export default CharSheet;
