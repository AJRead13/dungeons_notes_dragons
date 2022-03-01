import React, { useState } from "react";
import { Grid, TextField } from '@mui/material';
import { TextFieldsOutlined } from "@mui/icons-material";

const getModifier = score => Math.floor((score - 10)/2);

const CharSheet = (character) => {
  const char = character?.character || {};
  const [charData, setCharData] = useState({ characterName: char.characterName, race: char.race, className: char.className, hitPoints: char.hitPoints, strength: char.strength, dexterity: char.dexterity, constitution: char.constitution, intelligence: char.intelligence, wisdom: char.wisdom, charisma: char.charisma, level: 1 });
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharData({ ...charData, [name]: value });
  };

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
    </Grid>
  );
};

export default CharSheet;
