const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: String,
    html: String,
    raw: String,
    delta: String,
	version: String,
	wiki: String
});

module.exports = {
    name: "page",
    schema: pageSchema
};