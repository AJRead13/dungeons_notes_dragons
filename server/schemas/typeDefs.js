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
    class: String
    hitPoints: Int
    strength: Int
    dexterity: Int
    constitution: Int
    intelligence: Int
    wisdom: Int
    charisma: Int
    notes: [Note]
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
    addCharacter(characterName: String, race: String, class: String, hitPoints: Int, strength: Int, dexterity: Int, constitution: Int, intelligence: Int, wisdom: Int, charisma: Int): Character
    deleteCharacter(charactersID: ID!): User
    addNote(title: String, text: String): Note
    deleteNote(noteId: ID!)
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
