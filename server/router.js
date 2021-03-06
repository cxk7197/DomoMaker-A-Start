const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/seeMore/:recipeid', mid.requiresSecure, controllers.Recipe.getMoreRecipe);
  app.get('/seeMoreRecom/:recomrecipeid', mid.requiresSecure, controllers.RecomRecipe.getMoreRecomRecipe);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getRecipes', mid.requiresSecure, controllers.Recipe.getRecipes);
  app.get('/getRecomRecipes', mid.requiresSecure, controllers.RecomRecipe.getRecomRecipes);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/pass', mid.requiresLogin, controllers.Account.pass);
  app.get('/accountInfo', mid.requiresSecure, mid.requiresLogin, controllers.Account.accountInfo);
  app.post('/updatePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.updatePassword);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Recipe.makerPage);
  app.get('/addNewRecipe', mid.requiresLogin, controllers.Recipe.makerPage);
  app.get('/getAllRecipes', mid.requiresLogin, controllers.Recipe.getAllRecipes);
  app.get('/getAllRecom', mid.requiresLogin, controllers.RecomRecipe.getAllRecom);
  app.get('/premium', mid.requiresLogin, controllers.RecomRecipe.makerPageRecom);
  app.post('/createRecom', mid.requiresLogin, controllers.RecomRecipe.makeRecipe);
  app.post('/maker', mid.requiresLogin, controllers.Recipe.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', (req, res) => {
    res.render('errorPage', { error: 'The page you are looking for does not exist' });
  });
};

module.exports = router;

