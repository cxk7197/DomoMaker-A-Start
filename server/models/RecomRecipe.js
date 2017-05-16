const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const _ = require('underscore');

let RecomRecipeModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const RecomRecipeSchema = new mongoose.Schema({
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
  cookTime: {
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
  categories: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    required: true,
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

RecomRecipeSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return RecomRecipeModel.find(search).select('name ingredients directions prepTime cookTime servingSize recipeMaker categories rating').exec(callback);
};


RecomRecipeSchema.statics.findById = (recipeid, callback) => {
  const search = {
    _id: recipeid,
  };

  return RecomRecipeModel.findOne(search, callback);
};

RecomRecipeModel = mongoose.model('RecomRecipe', RecomRecipeSchema);

module.exports.RecomRecipeModel = RecomRecipeModel;
module.exports.RecomRecipeSchema = RecomRecipeSchema;
