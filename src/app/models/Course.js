const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
//const ObjectId = Schema.ObjectId;



const Course = new Schema({
  name: {type: String},
  description: {type: String},
  image: {type: String},
  slug: { type: String, slug: 'name', unique: true },
  videoId: {type: String},
  level: {type: String}

},{timestamps: true,});

//ADD PLUGIN
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
