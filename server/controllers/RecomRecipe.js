const models = require('../models');

const RecomRecipe = models.RecomRecipe;

const makerPageRecom = (req, res) => {
  RecomRecipe.RecomRecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('premium', { csrfToken: req.csrfToken(), recipes: docs });
  });
};

const getAllRecom = (req, res) => {
  RecomRecipe.RecomRecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('recommended', { csrfToken: req.csrfToken(), recipes: docs });
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
    cookTime: req.body.cookTime,
    servingSize: req.body.servingSize,
    recipeMaker: req.body.recipeMaker,
    categories: req.body.categories,
    rating: req.body.rating,
    owner: req.session.account._id,
  };

  const newRecomRecipe = new RecomRecipe.RecomRecipeModel(recipeData);

  const recipePromise = newRecomRecipe.save();

  recomRecipePromise.then(() => res.json({ redirect: '/getAllRecom' }));

  recomRecipePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Recipe already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return recomRecipePromise;
};

const getRecomRecipes = (request, response) => {
  const req = request;
  const res = response;

  return RecomRecipe.RecomRecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ recipes: docs });
  });
};

const getMoreRecomRecipe = (request, response) => {
  RecomRecipe.RecomRecipeModel.findById(request.params.recomrecipeid, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(400).json({ error: 'An error occured' });
    }

    return response.render('seemorerecom', { csrfToken: request.csrfToken(), recomrecipe: docs });
  });
};


module.exports.makerPageRecom = makerPageRecom;
module.exports.getAllRecom = getAllRecom;
module.exports.getRecomRecipes = getRecomRecipes;
module.exports.makeRecipe = makeRecipe;
module.exports.getMoreRecomRecipe = getMoreRecomRecipe;
