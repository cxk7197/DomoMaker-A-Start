//let EditFormClass;
//let formRenderer;
//
//const handleEdit = function (e) {
//  e.preventDefault();
//
//  if ($("#accountUsername").val() == '' || $("#accountCPass").val() == '' || $("#accountNPass").val() == '' || $("#accountNPass2").val() == '') {
//    console.log("All fields are required")
//    return false;
//  }
//
//  if ($("#accountNPass").val() !== $("#accountNPass2").val()) {
//    return false;
//  }
//
//  sendAjax('POST', $("#accountForm").attr("action"), $("#accountForm").serialize(), function() {
//    window.location.reload();
//  });
//
//  return false;
//};
//
//const renderEditForm = function () {
//  const renderFormData = this.state.data.map(function(account) {
//    return (
//      <div key={account._id} className="account">
//        <label htmlFor="name">Username: </label>
//        <input id="accountUsername" type="text" name="username" defaultValue={account.username}/>
//        <label htmlFor="age">Current Password: </label>
//        <input id="accountCPass" type="password" name="currentPass" placeholder="Current Password"/>
//        <label htmlFor="quote">New Password: </label>
//        <input id="accountNPass" type="password" name="newPass" placeholder="New Password"/>
//        <label htmlFor="quote">New Password: </label>
//        <input id="accountNPass2" type="password" name="newPass2" placeholder="New Password"/>
//        <input className="editAccountSubmit" type="submit" value="Save" />
//      </div>
//    );
//  });
//
//  return (
//    <form id="accountForm"
//      onSubmit={this.handleSubmit}
//      name="accountForm"
//      method="POST"
//      action="/updatePassword"
//      className="accountForm"
//    >
//      <input type="hidden" name="_csrf" value={this.props.csrf} />
//      {renderFormData}
//    </form>
//  );
//};
//
//const changePass = function (csrf) {
//  EditFormClass = React.createClass({
//    handleSubmit: handleEdit,
//    loadAccount: function() {
//      sendAjax('GET', '/accountInfo', null, function(data) {
//        let account = [data.account];
//        console.log(account[0].username);
//        this.setState({data:account})
//      }.bind(this));
//    },
//    getInitialState: function () {
//      return {data: []};
//    },
//    componentDidMount: function () {
//      this.loadAccount();
//    },
//    render: renderEditForm
//  });
//
//  formRenderer = ReactDOM.render(
//    <EditFormClass csrf={csrf}/>,
//    document.querySelector("#passwordForm")
//  );
//};
//
//const getToken = () => {
//  sendAjax('GET', '/getToken', null, (result) => {
//    setup(result.csrfToken);
//  });
//}
//
//$(document).ready(function() {
//  getToken();
//});