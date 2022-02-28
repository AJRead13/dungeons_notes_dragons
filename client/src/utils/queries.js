import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      characters {
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
	query characters {
			characters {
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
	}
`;
