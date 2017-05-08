const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const _ = require('underscore');

let RecipeModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  ingredients: {
    type: String,
    required: true,
    trim: true,
  },

  directions: {
    type: String,
    required: true,
    trim: true,
  },

  prepTime: {
    type: Number,
    min: 0,
    required: true,
  },

  servingSize: {
    type: Number,
    min: 0,
    required: true,
  },

  recipeMaker: {
    type: String,
    required: true,
    trim: true,
  },
  recipeType: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

RecipeSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return RecipeModel.find(search).select('name ingredients directions prepTime servingSize recipeMaker recipeType').exec(callback);
};


RecipeSchema.statics.findById = (recipeid, callback) => {
  const search = {
    _id: recipeid,
  };

  return RecipeModel.findOne(search, callback);
};

RecipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports.RecipeModel = RecipeModel;
module.exports.RecipeSchema = RecipeSchema;
