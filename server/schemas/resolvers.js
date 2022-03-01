const { AuthenticationError } = require('apollo-server-express');
const { User, Character, Note } = require('../models');
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
      console.log(token, user);
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
    addNote: async (parent, { characterId, title, text, timestamp }, context) => {
      if (context.user) {
        const note = await Note.create({
          title,
          text,
          timestamp
        });

        await Character.findOneAndUpdate(
          { _id: characterId },
          { $addToSet: { notes: note._id } }
        );

        return note;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteNote: async (parent, { characterId, noteId }, context) => {
      if (context.user) {
        const note = await Note.findOneAndDelete({
          _id: noteId,
        });

        await Character.findOneAndUpdate(
          { _id: characterId },
          { $pull: { notes: note._id } }
        );

        return note;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
