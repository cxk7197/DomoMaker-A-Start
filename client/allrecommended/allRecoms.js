let recomRenderer; //Recipe Renderer component
let recomForm; //Recipe Add Form Render Component
let RecomFormClass; //Recipe Form React UI class
let RecomListClass; //Recipe List React UI class



const renderRecomList = function() {
  if(this.state.data.length === 0) {
    return (
      <div className="recomList">
        <h3 className="emptyRecipe">No Recipes yet</h3>
      </div>
    );
  }

  const recomNodes = this.state.data.map(function(recomrecipe) {
    return (
        
      <div key={recomrecipe._id} className="recom">
        <a id="seenone" href={'/seeMoreRecom/' + recomrecipe._id}><h1 className="recomName" > {recomrecipe.name} </h1></a>  
      </div>
    );
  });

  return (
    <div className="recomList">
      {recomNodes}
    </div>
  );
};

const setup = function(csrf) {
 

  RecomListClass = React.createClass({
    loadRecipesFromServer: function() {
      sendAjax('GET', '/getRecomRecipes', null, function(data) {
        this.setState({data:data.recipes});
      }.bind(this));
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadRecipesFromServer();
    },
    render: renderRecomList
  });

  recomRenderer = ReactDOM.render(
    <RecomListClass />, document.querySelector("#recommendedrecipes")
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