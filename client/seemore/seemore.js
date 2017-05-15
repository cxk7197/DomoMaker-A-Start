//let recipeRenderer; //Recipe Renderer component
//let recipeForm; //Recipe Add Form Render Component
//let RecipeFormClass; //Recipe Form React UI class
//let RecipeListClass; //Recipe List React UI class
//
//const handleRecipe = (e) => {
//
//  e.preventDefault();
//
//  $("#recipeMessage").animate({width:'hide'},350);
//
//  if($("#recipeName").val() == '' || $("#recipeIngredients").val() == '' || $("#recipeDirections").val() == '') {
//    handleError("RAWR! All fields are required");
//    return false;
//  }
//
//  sendAjax('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function() {
//    recipeRenderer.loadRecipesFromServer();
//  });
//
//  return false;
//};
//
//const renderSeeMore = function() {
//  return (
//      
//         <h3>recipe.name</h3>
//};
//
//const setup = function(csrf) {
//  RecipeFormClass = React.createClass({
//    handleSubmit: handleRecipe,
//    render: renderRecipe,
//  });
//
//
//  recipeForm = ReactDOM.render(
//    <RecipeFormClass csrf={csrf} />, document.querySelector("#makeRecipe")
//  );
//
//
//};
//
////<img src="/assets/img/recipeface.jpeg" alt="recipe face" className="recipeFace" /> 
//const getToken = () => {
//  sendAjax('GET', '/getToken', null, (result) => {
//    setup(result.csrfToken);
//  });
//}
//
//$(document).ready(function() {
//  getToken();
//});