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
    React.createElement("img", { src: "/assets/img/addnew-01.png", alt: "something" }),
    React.createElement("input", { id: "recipeName", type: "text", name: "name", placeholder: "Name of Recipe" }),
    React.createElement("textarea", { id: "recipeIngredients", type: "text", name: "ingredients", rows: "6", placeholder: "Ingredients" }),
    React.createElement("textarea", { id: "recipeDirections", type: "text", name: "directions", rows: "6", placeholder: "Directions" }),
    React.createElement("input", { id: "recipePrepTime", type: "text", name: "prepTime", placeholder: "Prep Time In Minutes" }),
    React.createElement("input", { id: "recipeServingSize", type: "text", name: "servingSize", placeholder: "Serving Size" }),
    React.createElement("input", { id: "recipeMaker", type: "text", name: "recipeMaker", placeholder: "Recipe Maker" }),
    React.createElement("input", { id: "recipeType", type: "text", name: "recipeType", placeholder: "Recipe Type" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { className: "makeRecipeSubmit", type: "submit", value: "Add Recipe" }),
    React.createElement(
      "p",
      null,
      "HIEEEEE"
    )
  );
};

var setup = function setup(csrf) {
  RecipeFormClass = React.createClass({
    displayName: "RecipeFormClass",

    handleSubmit: handleRecipe,
    render: renderRecipe
  });

  recipeForm = ReactDOM.render(React.createElement(RecipeFormClass, { csrf: csrf }), document.querySelector("#makeRecipe"));
};

//<img src="/assets/img/recipeface.jpeg" alt="recipe face" className="recipeFace" /> 
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
