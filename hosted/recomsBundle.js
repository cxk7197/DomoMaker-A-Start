"use strict";

var recomRenderer = void 0; //Recipe Renderer component
var recomForm = void 0; //Recipe Add Form Render Component
var RecomFormClass = void 0; //Recipe Form React UI class
var RecomListClass = void 0; //Recipe List React UI class


var renderRecomList = function renderRecomList() {
  if (this.state.data.length === 0) {
    return React.createElement(
      "div",
      { className: "recomList" },
      React.createElement(
        "h3",
        { className: "emptyRecipe" },
        "No Recipes yet"
      )
    );
  }

  var recomNodes = this.state.data.map(function (recomrecipe) {
    return React.createElement(
      "div",
      { key: recomrecipe._id, className: "recom" },
      React.createElement(
        "a",
        { id: "seenone", href: '/seeMoreRecom/' + recomrecipe._id },
        React.createElement(
          "h1",
          { className: "recomName" },
          " ",
          recomrecipe.name,
          " "
        )
      )
    );
  });

  return React.createElement(
    "div",
    { className: "recomList" },
    recomNodes
  );
};

var setup = function setup(csrf) {

  RecomListClass = React.createClass({
    displayName: "RecomListClass",

    loadRecipesFromServer: function loadRecipesFromServer() {
      sendAjax('GET', '/getRecomRecipes', null, function (data) {
        this.setState({ data: data.recipes });
      }.bind(this));
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      this.loadRecipesFromServer();
    },
    render: renderRecomList
  });

  recomRenderer = ReactDOM.render(React.createElement(RecomListClass, null), document.querySelector("#recommendedrecipes"));
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
