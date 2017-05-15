let recipeRenderer; //Recipe Renderer component
let recipeForm; //Recipe Add Form Render Component
let RecipeFormClass; //Recipe Form React UI class
let RecipeListClass; //Recipe List React UI class

const handleRecipe = (e) => {

  e.preventDefault();

  $("#recipeMessage").animate({width:'hide'},350);

  if($("#recipeName").val() == '' || $("#recipeIngredients").val() == '' || $("#recipeDirections").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function() {
    recipeRenderer.loadRecipesFromServer();
  });

  return false;
};

const renderRecipe = function() {
  return (
    <form id="recipeForm"
      onSubmit={this.handleSubmit}
      name="recipeForm"
      action="/maker"
      method="POST"
      className="recipeForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="recipeName" type="text" name="name" placeholder="Recipe Name"/>
      <label htmlFor="ingredients">Ingredients: </label>
      <input id="recipeIngredients" type="text" name="ingredients" placeholder="Recipe Ingredients"/>
      <label htmlFor="directions">Directions: </label>
      <input id="recipeDirections" type="text" name="directions" placeholder="Recipe Directions"/>
      <label htmlFor="prepTime">Prep Time: </label>
      <input id="recipePrepTime" type="text" name="prepTime" placeholder="Recipe Prep Time"/>
      <label htmlFor="servingSize">Serving Size: </label>
      <input id="recipeServingSize" type="text" name="servingSize" placeholder="Recipe Serving Size"/>
      <label htmlFor="recipeMaker">Recipe Maker: </label>
      <input id="recipeRecipeMaker" type="text" name="recipeMaker" placeholder="Recipe Recipe Maker"/>
      <label htmlFor="recipeType">Recipe Maker: </label>
      <input id="recipeRecipeType" type="text" name="recipeType" placeholder="Recipe Recipe Maker"/>
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input className="makeRecipeSubmit" type="submit" value="Make Recipe" />
      <p>hi</p>
      
    </form>
  );
};

const renderRecipeList = function() {
  if(this.state.data.length === 0) {
    return (
      <div className="recipeList">
        <h3 className="emptyRecipe">No Recipes yet</h3>
      </div>
    );
  }

  const recipeNodes = this.state.data.map(function(recipe) {
    return (
      <div key={recipe._id} className="recipe">
       
        <h1 className="recipeName"> {recipe.name} </h1>
    
        <p className="recipePrepTime"> Prep Time: {recipe.prepTime} </p>
        <p className="recipeServingSize"> Serving Size: {recipe.servingSize} </p>
        
        <a id="seemore" href={'/seeMore/' + recipe._id}>see full recipe</a>
      </div>
    );
  });

  return (
    <div className="recipeList">
      {recipeNodes}
    </div>
  );
};

const setup = function(csrf) {
  RecipeFormClass = React.createClass({
    handleSubmit: handleRecipe,
    render: renderRecipe,
  });

  RecipeListClass = React.createClass({
    loadRecipesFromServer: function() {
      sendAjax('GET', '/getRecipes', null, function(data) {
        this.setState({data:data.recipes});
      }.bind(this));
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadRecipesFromServer();
    },
    render: renderRecipeList
  });

  recipeRenderer = ReactDOM.render(
    <RecipeListClass />, document.querySelector("#recipes")
  );
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
}

$(document).ready(function() {
  getToken();
});