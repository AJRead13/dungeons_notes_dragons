const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	class: {
		type: String,
	},
	hitpoints: {
		type: String,
	},
	strength: {
		type: String,
	},
	dexterity: {
		type: String,
	},
	constitution: {
		type: String,
	},
	intelligence: {
		type: String,
	},
	wisdom: {
		type: String,
	},
	charisma: {
		type: String,
	},
});

const Character = model('Character', characterSchema);

module.exports = Character;
