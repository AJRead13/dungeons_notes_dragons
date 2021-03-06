const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String
		email: String
		password: String
		characters: [Character]
	}

	type Character {
		_id: ID!
		characterName: String
		race: String
		className: String
		hitPoints: Int
		strength: Int
		dexterity: Int
		constitution: Int
		intelligence: Int
		wisdom: Int
		charisma: Int
		notes: [Note]
		madeBy: String
	}

	input CharacterInput {
		_id: ID!
		characterName: String
		race: String
		className: String
		hitPoints: Int
		strength: Int
		dexterity: Int
		constitution: Int
		intelligence: Int
		wisdom: Int
		charisma: Int
		notes: [NoteInput]
		madeBy: String
	}

	type Note {
		_id: ID!
		title: String
		text: String
		timestamp: String
	}

	input NoteInput {
		title: String
		text: String
		timestamp: String
	}

  type Query {
    users: [User]!
    user(userId: ID!): User
    characters: [Character]!
    character(characterId: ID!): Character
    notes: [Note]
    note(noteId: ID!): Note
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCharacter(characterName: String, race: String, className: String, hitPoints: Int, strength: Int, dexterity: Int, constitution: Int, intelligence: Int, wisdom: Int, charisma: Int): Character
    deleteCharacter(charToDelete: ID!): User
		updateCharacter(characterId: ID!, characterToUpdate: CharacterInput): Character
    addNote(characterId: ID!, noteToSave: NoteInput): Character
    deleteNote(characterId: ID!, noteToDelete: ID!): Character
  }

	type Auth {
		token: ID!
		user: User
	}
`;

module.exports = typeDefs;
