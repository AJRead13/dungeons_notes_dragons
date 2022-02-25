const { Schema, model } = require('mongoose');
const noteSchema = require('./Note')
const characterSchema = new Schema({
	characterName: {
		type: String,
		required: true,
		unique: true,
	},
	className: {
		type: String,
		required: true,
	},
	hitPoints: {
		type: Number,
		required: true,
	},
	strength: {
		type: Number,
		required: true,
	},
	dexterity: {
		type: Number,
		required: true,
	},
	constitution: {
		type: Number,
		required: true,
	},
	intelligence: {
		type: Number,
		required: true,
	},
	wisdom: {
		type: Number,
		required: true,
	},
	charisma: {
		type: Number,
		required: true,
	},
  madeBy: {
    type: String
  },
  notes: [noteSchema]
});

const Character = model('Character', characterSchema);

module.exports = Character;
