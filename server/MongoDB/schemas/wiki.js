const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wikiSchema = new Schema({
    name: String
});

module.exports = {
    name: "wiki",
    schema: wikiSchema
};