const models = require('../models');

const Recipe = models.Recipe;

const makerPage = (req, res) => {
  Recipe.RecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('addnewrecipe', { csrfToken: req.csrfToken(), recipes: docs });
  });
};

const getAllRecipes = (req, res) => {
  Recipe.RecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('allrecipes', { csrfToken: req.csrfToken(), recipes: docs });
  });
};

const makeRecipe = (req, res) => {
  if (!req.body.name || !req.body.directions) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  const recipeData = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    prepTime: req.body.prepTime,
    servingSize: req.body.servingSize,
    recipeMaker: req.body.recipeMaker,
    owner: req.session.account._id,
  };

  const newRecipe = new Recipe.RecipeModel(recipeData);

  const recipePromise = newRecipe.save();

  recipePromise.then(() => res.json({ redirect: '/maker' }));

  recipePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Recipe already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return recipePromise;
};

const getRecipes = (request, response) => {
  const req = request;
  const res = response;

  return Recipe.RecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ recipes: docs });
  });
};

const getMoreRecipe = (request, response) => {
  Recipe.RecipeModel.findById(request.params.recipeid, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(400).json({ error: 'An error occured' });
    }

    return response.render('seemore', { csrfToken: request.csrfToken(), recipe: docs });
  });
};


module.exports.makerPage = makerPage;
module.exports.getAllRecipes = getAllRecipes;
module.exports.getRecipes = getRecipes;
module.exports.make = makeRecipe;
module.exports.getMoreRecipe = getMoreRecipe;
