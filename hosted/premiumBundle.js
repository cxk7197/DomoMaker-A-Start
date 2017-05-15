"use strict";

var recomRenderer = void 0; //Recipe Renderer component
var recomForm = void 0; //Recipe Add Form Render Component
var RecomFormClass = void 0; //Recipe Form React UI class
var RecomListClass = void 0; //Recipe List React UI class

var handleRecomRecipe = function handleRecomRecipe(e) {

  e.preventDefault();

  $("#recomMessage").animate({ width: 'hide' }, 350);

  if ($("#recomName").val() == '' || $("#recomIngredients").val() == '' || $("#recomDirections").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#recomForm").attr("action"), $("#recomForm").serialize(), function () {
    recomRenderer.loadRecomRecipesFromServer();
  });

  return false;
};

var renderRecomRecipe = function renderRecomRecipe() {
  return React.createElement(
    "form",
    { id: "recomForm",
      onSubmit: this.handleSubmit,
      name: "recomForm",
      action: "/createRecom",
      method: "POST",
      className: "recomForm"
    },
    React.createElement("img", { src: "/assets/img/submit-01-01.png", alt: "something" }),
    React.createElement("input", { id: "recomName", type: "text", name: "name", placeholder: "Name of Recipe" }),
    React.createElement("textarea", { id: "recomIngredients", type: "text", name: "ingredients", rows: "6", placeholder: "Ingredients" }),
    React.createElement("textarea", { id: "recomDirections", type: "text", name: "directions", rows: "6", placeholder: "Directions" }),
    React.createElement("input", { id: "recomPrepTime", type: "text", name: "prepTime", placeholder: "Prep Time In Minutes" }),
    React.createElement("input", { id: "recomCookTime", type: "text", name: "cookTime", placeholder: "Prep Time In Minutes" }),
    React.createElement("input", { id: "recomServingSize", type: "text", name: "servingSize", placeholder: "Serving Size" }),
    React.createElement("input", { id: "recomMaker", type: "text", name: "recipeMaker", placeholder: "Recipe Maker" }),
    React.createElement("input", { id: "recomCategories", type: "text", name: "categories", placeholder: "Category " }),
    React.createElement("input", { id: "recomRating", type: "text", name: "rating", placeholder: "Rating" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { className: "makeRecipeSubmit", type: "submit", value: "Add Recipe" })
  );
};

var setup = function setup(csrf) {
  RecomFormClass = React.createClass({
    displayName: "RecomFormClass",

    handleSubmit: handleRecomRecipe,
    render: renderRecomRecipe
  });

  recomForm = ReactDOM.render(React.createElement(RecomFormClass, { csrf: csrf }), document.querySelector("#makeRecom"));
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
