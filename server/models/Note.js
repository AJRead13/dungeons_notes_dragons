const { Schema, model } = require('mongoose');


const noteSchema = new Schema({
	noteText: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});
const Note = model("Note", noteSchema);

    module.exports = Note;
  