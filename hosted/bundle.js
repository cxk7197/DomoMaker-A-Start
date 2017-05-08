"use strict";

var recipeRenderer = void 0; //Recipe Renderer component
var recipeForm = void 0; //Recipe Add Form Render Component
var RecipeFormClass = void 0; //Recipe Form React UI class
var RecipeListClass = void 0; //Recipe List React UI class

var handleRecipe = function handleRecipe(e) {

  e.preventDefault();

  $("#recipeMessage").animate({ width: 'hide' }, 350);

  if ($("#recipeName").val() == '' || $("#recipeIngredients").val() == '' || $("#recipeDirections").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function () {
    recipeRenderer.loadRecipesFromServer();
  });

  return false;
};

var renderRecipe = function renderRecipe() {
  return React.createElement(
    "form",
    { id: "recipeForm",
      onSubmit: this.handleSubmit,
      name: "recipeForm",
      action: "/maker",
      method: "POST",
      className: "recipeForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "recipeName", type: "text", name: "name", placeholder: "Recipe Name" }),
    React.createElement(
      "label",
      { htmlFor: "ingredients" },
      "Ingredients: "
    ),
    React.createElement("input", { id: "recipeIngredients", type: "text", name: "ingredients", placeholder: "Recipe Ingredients" }),
    React.createElement(
      "label",
      { htmlFor: "directions" },
      "Directions: "
    ),
    React.createElement("input", { id: "recipeDirections", type: "text", name: "directions", placeholder: "Recipe Directions" }),
    React.createElement(
      "label",
      { htmlFor: "prepTime" },
      "Prep Time: "
    ),
    React.createElement("input", { id: "recipePrepTime", type: "text", name: "prepTime", placeholder: "Recipe Prep Time" }),
    React.createElement(
      "label",
      { htmlFor: "servingSize" },
      "Serving Size: "
    ),
    React.createElement("input", { id: "recipeServingSize", type: "text", name: "servingSize", placeholder: "Recipe Serving Size" }),
    React.createElement(
      "label",
      { htmlFor: "recipeMaker" },
      "Recipe Maker: "
    ),
    React.createElement("input", { id: "recipeRecipeMaker", type: "text", name: "recipeMaker", placeholder: "Recipe Recipe Maker" }),
    React.createElement(
      "label",
      { htmlFor: "recipeType" },
      "Recipe Maker: "
    ),
    React.createElement("input", { id: "recipeRecipeType", type: "text", name: "recipeType", placeholder: "Recipe Recipe Maker" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { className: "makeRecipeSubmit", type: "submit", value: "Make Recipe" })
  );
};

var renderRecipeList = function renderRecipeList() {
  if (this.state.data.length === 0) {
    return React.createElement(
      "div",
      { className: "recipeList" },
      React.createElement(
        "h3",
        { className: "emptyRecipe" },
        "No Recipes yet"
      )
    );
  }

  var recipeNodes = this.state.data.map(function (recipe) {
    return React.createElement(
      "div",
      { key: recipe._id, className: "recipe" },
      React.createElement(
        "h1",
        { className: "recipeName" },
        " ",
        recipe.name,
        " "
      ),
      React.createElement(
        "p",
        { className: "recipePrepTime" },
        " Prep Time: ",
        recipe.prepTime,
        " "
      ),
      React.createElement(
        "p",
        { className: "recipeServingSize" },
        " Serving Size: ",
        recipe.servingSize,
        " "
      ),
      React.createElement(
        "a",
        { id: "seemore", href: '/seeMore/' + recipe._id },
        "see full recipe"
      )
    );
  });

  return React.createElement(
    "div",
    { className: "recipeList" },
    recipeNodes
  );
};

var setup = function setup(csrf) {
  RecipeFormClass = React.createClass({
    displayName: "RecipeFormClass",

    handleSubmit: handleRecipe,
    render: renderRecipe
  });

  RecipeListClass = React.createClass({
    displayName: "RecipeListClass",

    loadRecipesFromServer: function loadRecipesFromServer() {
      sendAjax('GET', '/getRecipes', null, function (data) {
        this.setState({ data: data.recipes });
      }.bind(this));
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      this.loadRecipesFromServer();
    },
    render: renderRecipeList
  });

  recipeRenderer = ReactDOM.render(React.createElement(RecipeListClass, null), document.querySelector("#recipes"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#recipeMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#recipeMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
