
var $ = require('jquery');
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
// backbone relies on underscore and needs to come after it in the imports
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import listTemplate from 'templates/accountList.html';
import createTemplate from 'templates/createAccount.html';

var AccountModel;
var AccountControllerView;
var AccountListView;
var AccountCreateView;

// a model to make the button clickable; every backbone model has access to 'set' and 'get':
var accountModelConfigObject = {
  defaults: {
    accounts: []
  },
  save: function(){
    var data = this.get('accounts');
    lscache.set('accounts', data);
  },
  fetch: function(){
    var data = lscache.get('accounts');  //cache is in the user's browser
    data = data || [];  // if data is undefined or null, then make this an empty array
    this.set('account', data);
  }
};

AccountModel = Backbone.Model.extend(AccountModelConfigObject); // creates a class

var accountModel = new AccountModel();

// Controller
var controllerConfigObject = {   // not capitalized because it's not a class
  el: '.page-container',    // these four properties are a template for a backbone view
  model: accountModel,
  events: {  // el is the main controller element, which in this case is the main div
    'click .btn-create': 'createNewAccount'
  },
  initialize: function(){
    this.model.fetch();
    // this.render();
  },
  render: function(){
    var listView = new ListView();  // instantiating a new class & display the account list
    this.$el.find('.view-container').html(listView.$el.html());
  },
  createNewAccount: function(){
    // display the create account page  
    var createView = new CreateView();
    this.$el.find('.view-container').html(createView.$el.html());
  }  
};

var AccountControllerView = Backbone.View.extend(controllerConfigObject);  // framework.class.method  extending creates a new class out of an old one
// var accountControllerView = new AccountControllerView();  // instantiating a new class

// View

var listViewConfig = {   // not capitalized because it's not a class
  // el: '.account-list-container',    // these four properties are a template for a backbone view
  tagName: 'div',
  event: {},
  template: Handlesbars.compile(listTemplate),
  initialize: function(){
    this.render();
  },
  render: function(){
    // display the account list
    var renderedTemplate = this.template({});
    this.$el.html(renderedTemplate);
  },
  createNewAccount: function(){
    // display the create account page
  }
};

var ListView = Backbone.View.extend(listViewConfig);  // framework.class.method  extending creates a new class out of an old one

var createViewConfig = {  // view that controls the form
  // el: '',    // these four properties are a template for a backbone view
  tagName: 'div',
  template: Handlesbars.compile(createTemplate),
  event: {
    'click .btn-done': 'submitForm'
  },
  initialize: function(){
    this.render();
  },
  render: function(){
    var renderedTemplate = this.template({});
    this.$el.html(renderedTemplate);
  },
  submitForm: function(){
    accountControllerView.render();
  }
}; 
var CreateView = Backbone.View.extend(createViewConfig);

var accountControllerView = new AccountControllerView;

module.exports = accountControllerView;


