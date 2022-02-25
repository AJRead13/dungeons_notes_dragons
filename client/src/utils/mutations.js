import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation addCharacter($characterName: String, $race: String, $className: String, $hitPoints: Int, $strength: Int, $dexterity: Int, $constitution: Int, $intelligence: Int, $wisdom: Int, $charisma: Int){
    addCharacter(characterName: $characterName, race: $race, className: $className, hitPoints: $hitPoints, strength: $strength, dexterity: $dexterity, constitution: $constitution, intelligence: $intelligence, wisdom: $wisdom, charisma: $charisma){
      _id
      characterName
      race
      className
      hitPoints
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
      notes {
        _id
        title
        text
        timestamp
      }
      madeBy
    }
  }
`;

export const DELETE_CHARACTER = gql`
  mutation deleteCharacter($characterId: ID!) {
    deleteCharacter(characterId: $characterId){
      _id
      characterName
      race
      className
      hitPoints
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
      notes {
        _id
        title
        text
        timestamp
      }
      madeBy
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($characterId: ID!, $title: String, $text: String, $timestamp: String){
    addNote(characterId: $characterId, title: $title, text: $text, timestamp: $timestamp){
      _id
      title
      text
      timestamp
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($characterId: ID!, $noteId: ID!){
    deleteNote(characterId: $characterId, noteId: $noteId){
      _id
      title
      text
      timestamp
    }
  }
`;
