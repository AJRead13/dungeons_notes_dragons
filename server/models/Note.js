const { Schema, model } = require('mongoose');

const userSchema = require('./User')

const noteSchema = new Schema({
    user: [userSchema],
	noteText: {
		type: String,
		required: true,
		unique: true,
	},
})
    module.exports = Note;
  