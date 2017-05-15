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
          <img src="/assets/img/addnew-01.png" alt="something"/>
          <input id="recipeName" type="text" name="name" placeholder="Name of Recipe"/>
          <textarea id="recipeIngredients" type="text" name="ingredients" rows="6" placeholder="Ingredients"></textarea>
          <textarea id="recipeDirections" type="text" name="directions" rows="6" placeholder="Directions"></textarea>
          <input id="recipePrepTime" type="text" name="prepTime" placeholder="Prep Time In Minutes"/>
          <input id="recipeServingSize" type="text" name="servingSize" placeholder="Serving Size"/>
          <input id="recipeMaker" type="text" name="recipeMaker" placeholder="Recipe Maker"/>
          <input id="recipeType" type="text" name="recipeType" placeholder="Recipe Type"/>
          <input type="hidden" name="_csrf" value={this.props.csrf} />
          <input className="makeRecipeSubmit" type="submit" value="Add Recipe" />
<p>HIEEEEE</p>
        </form>
  );
};

const setup = function(csrf) {
  RecipeFormClass = React.createClass({
    handleSubmit: handleRecipe,
    render: renderRecipe,
  });


  recipeForm = ReactDOM.render(
    <RecipeFormClass csrf={csrf} />, document.querySelector("#makeRecipe")
  );


};

//<img src="/assets/img/recipeface.jpeg" alt="recipe face" className="recipeFace" /> 
const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
}

$(document).ready(function() {
  getToken();
});