const { Schema, model } = require('mongoose');


const noteSchema = new Schema({
  title:{
		type: String
  },
	text: {
		type: String
	},
	timestamp: {
		type: Date,
		default: Date.now,
		get: (timestamp) => timestamp.toString(),
	},
});
// const Note = model("Note", noteSchema);

module.exports = noteSchema;
  