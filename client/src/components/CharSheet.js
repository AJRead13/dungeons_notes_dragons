import React from 'react';

const CharSheet = (character) => {
  return (
    <div class="charsheet">
      <p>Name: {character.name}</p>
      <p>Race: {character.race}</p>
      <p>Class: {character.className}</p>
      <p>Hit Points: {character.hitPoints}</p>
      <p>Strength: {character.str}/{character.strmod}</p>
      <p>Dexterity: {character.dex}/{character.dexmod}</p>
      <p>Constitution: {character.con}/{character.conmod}</p>
      <p>Intelligence: {character.int}/{character.intmod}</p>
      <p>Wisdom: {character.wis}/{character.wismod}</p>
      <p>Charisma: {character.cha}/{character.chamod}</p>
    </div>
  )
}

export default CharSheet;