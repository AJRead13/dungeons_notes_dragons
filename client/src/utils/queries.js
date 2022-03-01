import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      characters {
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
          title
          text
          timestamp
        }
        madeBy
      }
    }
  }
`;

export const QUERY_CHARACTERS = gql`
  query getCharacters {
    characters {
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
      madeBy
    }
  }
`;

export const QUERY_SINGLE_CHARACTER = gql`
  query getSingleCharacter($characterId: ID!) {
    character(characterId: $characterId) {
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

export const QUERY_RACE = gql`
  query race {
    race
  }
`;
