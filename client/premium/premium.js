let recomRenderer; //Recipe Renderer component
let recomForm; //Recipe Add Form Render Component
let RecomFormClass; //Recipe Form React UI class
let RecomListClass; //Recipe List React UI class

const handleRecomRecipe = (e) => {

  e.preventDefault();

  $("#recomMessage").animate({width:'hide'},350);

  if($("#recomName").val() == '' || $("#recomIngredients").val() == '' || $("#recomDirections").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#recomForm").attr("action"), $("#recomForm").serialize(), function() {
    recomRenderer.loadRecomRecipesFromServer();
  });

  return false;
};

const renderRecomRecipe = function() {
  return (
        <form id="recomForm"
          onSubmit={this.handleSubmit}
          name="recomForm"
          action="/createRecom"
          method="POST"
          className="recomForm"
        >
      
          <img src="/assets/img/submit-01-01.png" alt="something"/>
          <input id="recomName" type="text" name="name" placeholder="Name of Recipe"/>
          <textarea id="recomIngredients" type="text" name="ingredients" rows="6" placeholder="Ingredients"></textarea>
          <textarea id="recomDirections" type="text" name="directions" rows="6" placeholder="Directions"></textarea>
          <input id="recomPrepTime" type="text" name="prepTime" placeholder="Prep Time In Minutes"/>
          <input id="recomCookTime" type="text" name="cookTime" placeholder="Cook Time In Minutes"/>
          <input id="recomServingSize" type="text" name="servingSize" placeholder="Serving Size"/>
          <input id="recomMaker" type="text" name="recipeMaker" placeholder="Recipe Maker"/>
          <input id="recomCategories" type="text" name="categories" placeholder="Category "/>
          <input id="recomRating" type="text" name="rating" placeholder="Rating out of 10"/>
          <input type="hidden" name="_csrf" value={this.props.csrf} />
          <input className="makeRecipeSubmit" type="submit" value="Add Recipe" />

        </form>
  );
};

const setup = function(csrf) {
  RecomFormClass = React.createClass({
    handleSubmit: handleRecomRecipe,
    render: renderRecomRecipe,
  });


  recomForm = ReactDOM.render(
    <RecomFormClass csrf={csrf} />, document.querySelector("#makeRecom")
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