const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String
		characters: [Character]
	}

	type Character {
		_id: ID!
		characterName: String
		race: String
		className: String
		hitPoints: Number
		strength: Number
		dexterity: Number
		constitution: Number
		intelligence: Number
		wisdom: Number
		charisma: Number
		notes: [Note]
		madeBy: String
	}

	type Note {
		_id: ID!
		title: String
		text: String
		timestamp: String
	}

	type Query {
		users: [User]!
		user(userId: ID!): User
		characters(username: String): [Character]
		character(characterId: ID!): Character
		notes(characterName: String): [Note]
		note(noteId: ID!): Note
		me: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		addCharacter(
			characterName: String
			race: String
			className: String
			hitPoints: Number
			strength: Number
			dexterity: Number
			constitution: Number
			intelligence: Number
			wisdom: Number
			charisma: Number
		): Character
		deleteCharacter(charactersID: ID!): Character
		addNote(
			characterId: ID!
			title: String
			text: String
			timestamp: String
		): Note
		deleteNote(characterId: ID!, noteId: ID!): Note
	}

	type Auth {
		token: ID!
		user: User
	}
`;

module.exports = typeDefs;
