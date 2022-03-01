import React from "react";
// import { generateScore, d6HP, d8HP, h10HP, d12HP, getHPTotal, getModifier } from "../utils/abilityScore"
import { QUERY_SINGLE_CHARACTER } from "../utils/queries";
import { Checkbox } from "@mui/material";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMedkit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"

library.add(
  faMedkit
);

const CharSheet = (character) => {
  return (
    <div className="container">
      <div className="charInfo">
        <div className="col-4">
          <h3 className="charName">{character.characterName}</h3>
          <h3 className="userName">{character.madeBy}</h3>
        </div>
        <div className="col-4">
          <h3 className="charRace">{character.race}</h3>
          <h3 className="charClass">{character.className}</h3>
        </div>
        <div className="col-4">
          <h3 className="charHP">{character.hitPoints}</h3>
          {/* <h3 className="charAlignment">{character.alignment}</h3> */}
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <table className="table">
            <tr>
              <th>Ability</th>
              <th>Score</th>
              <th>Modifier</th>
            </tr>
            <tr>
              <td>Strength</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="strScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="strMod"></input>
              </td>
            </tr>
            <tr>
              <td>Dexterity</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="dexScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="dexMod"></input>
              </td>
            </tr>
            <tr>
              <td>Constitution</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="conScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="conMod"></input>
              </td>
            </tr>
            <tr>
              <td>Intelligence</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="intScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="intMod"></input>
              </td>
            </tr>
            <tr>
              <td>Wisdom</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="wisScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="wisMod"></input>
              </td>
            </tr>
            <tr>
              <td>Charisma</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="chaScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="chaMod"></input>
              </td>
            </tr>
          </table>
        </div>
        <div className="col-4">
          <h2>Player Level <FontAwesomeIcon icon={['fas', 'medkit']} /> </h2>

          <input type="number" id="charLevel" min="1" max="20"></input>
        </div>
        <div className="speed">
          <p>Speed</p>
          <input type="number" placeholder="30"></input>
        </div>
        <div className="armorClass">
          <h3>Armor<span><input type="number" placeholder="10"></input></span>Class</h3>
        </div>
        <div className="initiative">
          <h2>Initiative<input type="number" placeholder="0"></input></h2>
        </div>
        <div className="col-4">
          <h2>Proficiency Bonus</h2>

          <input type="number" id="profBonus"></input>

          <div className="charHPNumbers col-4">
            <h3>Max Hit Points</h3>
            <h3 className="charHP">{character.hitPoints}</h3>

            <input type="number" id="totalHP"></input>

            <h3>Current Hit Points</h3>

            <input type="number" id="currentHP"></input>

            <h3>Temporary Hit Points</h3>

            <input type="number" id="temporaryHP" placeholder="0"></input>
          </div>
          <div className="container" id="savingThrows">
            <div className="col-4">
              <table className="table">
                <tr>
                  <th>Saving Throw</th>
                  <th>Modifier</th>
                </tr>
                <tr>
                  <td>Strength</td>
                  <td>
                    <input type="number" placeholder="0" id="strSave"></input>
                  </td>
                  <td>Dexterity</td>
                  <td>
                    <input type="number" placeholder="0" id="dexSave"></input>
                  </td>
                  <td>Constitution</td>
                  <td>
                    <input type="number" placeholder="0" id="conSave"></input>
                  </td>
                  <td>Intelligence</td>
                  <td>
                    <input type="number" placeholder="0" id="intSave"></input>
                  </td>
                  <td>Wisdom</td>
                  <td>
                    <input type="number" placeholder="0" id="wisSave"></input>
                  </td>
                  <td>Charisma</td>
                  <td>
                    <input type="number" placeholder="0" id="chaSave"></input>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="container">
            <h3>Armor</h3>
            <input
              type="text"
              id="armorTypes"
              placeholder="add armor proficiencies here..."
            ></input>
            <h3>Weapons</h3>
            <input
              type="text"
              id="weaponTypes"
              placeholder="add weapon proficiencies here..."
            ></input>
            <h3>Tools</h3>
            <input
              type="text"
              id="toolTypes"
              placeholder="add tool proficiencies here..."
            ></input>
            <h3>Languages</h3>
            <input
              type="text"
              id="languages"
              placeholder="add languages here..."
            ></input>
          </div>
          <div className="container">
            <div className="col-4">
              <table className="table">
              <tr>
              <th>Proficient</th>
              <th>Modifier</th>
              <th>Skill</th>
              <th>Bonus</th>
            </tr>
            <tr>
              <td><Checkbox/></td>
              <td>Dex
              </td>
              <td>
                Acrobatics
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
            </tr>
            <tr>
              <td><Checkbox/></td>
              <td>Wis
              </td>
              <td>
                Animal Handling
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
            </tr>
            <tr>
              <td><Checkbox/></td>
              <td>Int
              </td>
              <td>
                Arcana
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Str
              </td>
              <td>
                Athletics
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Cha
              </td>
              <td>
                Deception
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Int
              </td>
              <td>
                History
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Wis
              </td>
              <td>
                Insight
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
            </tr>
            <td><Checkbox/></td>
              <td>Cha
              </td>
              <td>
                Intimidation
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Int
              </td>
              <td>
                Investigation
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Wis
              </td>
              <td>
                Medicine
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Int
              </td>
              <td>
                Nature
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Wis
              </td>
              <td>
                Perception
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Cha
              </td>
              <td>
                Performance
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Cha
              </td>
              <td>
                Persuasion
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Int
              </td>
              <td>
                Religion
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Dex
              </td>
              <td>
                Sleight of Hand
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Dex
              </td>
              <td>
                Stealth
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>
              <td><Checkbox/></td>
              <td>Wis
              </td>
              <td>
                Survival
              </td>
              <td>
                <input type="number" value="0"></input>
              </td>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharSheet;
