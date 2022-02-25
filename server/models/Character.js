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
		type: Int,
		required: true,
	},
	strength: {
		type: Int,
		required: true,
	},
	dexterity: {
		type: Int,
		required: true,
	},
	constitution: {
		type: Int,
		required: true,
	},
	intelligence: {
		type: Int,
		required: true,
	},
	wisdom: {
		type: Int,
		required: true,
	},
	charisma: {
		type: Int,
		required: true,
	},
  madeBy: {
    type: String
  },
  notes: [noteSchema]
});

const Character = model('Character', characterSchema);

module.exports = Character;
