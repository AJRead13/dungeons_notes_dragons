const { AuthenticationError } = require('apollo-server-express');
const { User, Character } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('characters');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('characters');
    },
    characters: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Character.find(params);
    },
    character: async (parent, { characterId }) => {
      return Character.findOne({ _id: characterId }).populate('notes');
    },
    notes: async (parent, { characterName }) => {
      const params = characterName ? { characterName } : {};
      return Note.find(params).sort({ createdAt: -1 });
    },
    note: async (parent, { noteId }) => {
      return Note.findOne({ _id: noteId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('characters');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password } ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCharacter: async (parent, { characterName, race, className, hitPoints, strength, dexterity, constitution, intelligence, wisdom, charisma }, context) => {
      if (context.user) {
        const character = await Character.create({
          characterName,
          race,
          className,
          hitPoints,
          strength,
          dexterity,
          constitution,
          intelligence,
          wisdom,
          charisma,
          notes: [],
          madeBy: context.user.username
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { characters: character._id } }
        );

        return character;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteCharacter: async (parent, args , context) => {
      if (context.user) {
        const character = await Character.findOneAndDelete({
          _id: args.charToDelete,
          madeBy: context.user.username,
        });

        return User.findOneAndUpdate(
          { _id: context.user._id }, 
          { $pull: { characters: { charId: args.charToDelete }}},
          { new: true }
          );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateCharacter: async (parent, { characterId, characterToUpdate }, context) => {
      if(context.user){
        const updatedCharacter = await Character.findOneAndUpdate(
          {_id: characterId},
          { $set: { 
            characterName: characterToUpdate.characterName,
            className: characterToUpdate.className,
            race: characterToUpdate.race,
            hitPoints: characterToUpdate.hitPoints,
            strength: characterToUpdate.strength,
            dexterity: characterToUpdate.dexterity,
            constitution: characterToUpdate.constitution,
            intelligence: characterToUpdate.intelligence,
            wisdom: characterToUpdate.wisdom,
            charisma: characterToUpdate.charisma
          }},
          { new: true }
        );
        return updatedCharacter;
      }
    },
    addNote: async (parent, { characterId, noteToSave }, context) => {
      if (context.user) {
        const updatedCharacter = await Character.findOneAndUpdate(
          { _id: characterId },
          { $addToSet: { notes: noteToSave }},
          { new: true }
        );
        return updatedCharacter;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteNote: async (parent, { characterId, noteToDelete }, context) => {
      if (context.user) {
        const updatedCharacter = await Character.findOneAndUpdate(
          { _id: characterId },
          { $pull: { notes: { _id: noteToDelete } } },
          { new: true }
        );

        return updatedCharacter;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
