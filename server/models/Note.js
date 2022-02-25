const { Schema, model } = require('mongoose');


const noteSchema = new Schema({
    title:{
        type: String
    },
	text: {
		type: String,
		required: true,
		unique: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});
// const Note = model("Note", noteSchema);

    module.exports = noteSchema;
  