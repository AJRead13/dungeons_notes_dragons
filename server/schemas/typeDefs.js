const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    characters: [Character]
  }
  
  type Character {
    _id: ID!
    name: String
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
    user: [User]!
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
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createCharacter(characters: characterInput): User
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
