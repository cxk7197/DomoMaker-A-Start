"use strict";

var EditFormClass = void 0;
var formRenderer = void 0;

var handleEdit = function handleEdit(e) {
  e.preventDefault();

  if ($("#accountName").val() == '' || $("#currentPass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  if ($("#newPass").val() !== $("#newPass2").val()) {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#accountForm").attr("action"), $("#accountForm").serialize(), function () {
    window.location.reload();
  });

  return false;
};

var renderEditForm = function renderEditForm() {
  var renderFormData = this.state.data.map(function (account) {
    return React.createElement(
      "div",
      { key: account._id, className: "mainForm" },
      React.createElement("input", { id: "accountName", type: "text", name: "username", defaultValue: account.username, placeholder: "Username", required: true }),
      React.createElement("input", { id: "currentPass", type: "password", name: "currentPass", placeholder: "Current Password", required: true }),
      React.createElement("input", { id: "newPass", type: "password", name: "newPass", placeholder: "New Password", required: true }),
      React.createElement("input", { id: "newPass2", type: "password", name: "newPass2", placeholder: "Retype New Password", required: true }),
      React.createElement("input", { id: "green-submit", className: "formSubmit", type: "submit", value: "Save" })
    );
  });

  return React.createElement(
    "form",
    { id: "accountForm",
      onSubmit: this.handleSubmit,
      name: "accountForm",
      method: "POST",
      action: "/updatePassword",
      className: "accountForm"
    },
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    renderFormData
  );
};

var setup = function setup(csrf) {
  EditFormClass = React.createClass({
    displayName: "EditFormClass",

    handleSubmit: handleEdit,
    loadAccount: function loadAccount() {
      sendAjax('GET', '/accountInfo', null, function (data) {
        var account = [data.account];
        this.setState({ data: account });
      }.bind(this));
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      this.loadAccount();
    },
    render: renderEditForm
  });

  formRenderer = ReactDOM.render(React.createElement(EditFormClass, { csrf: csrf }), document.querySelector("#passwordForm"));
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
