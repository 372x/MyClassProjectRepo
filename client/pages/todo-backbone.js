
var $ = require('jquery');
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
// backbone relies on underscore and needs to come after it in the imports
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'templates/todoItem.html';

// Backbone Todo App

var TodoModel;
var TodoControllerView;
var TodoView;

var todoModel;
var todoControllerView;


// Model
TodoModel = Backbone.Model.extend({  // e.g. TodoModelClass
  defaults: {
    // defaultProperty: "default value"
  },
  fetch: function(){

  },
  save: function(){
    
  }
});

var todoModel = new TodoModel();

// Controller View

TodoControllerView = Backbone.View.extend({
  el: 'body',  // html element that has the class .container, refers to this DOM node; this is a jquery selector
  model: todoModel,
  events: {
  },
  inititalize: function(){},
  render: function(){
    alert('backbone!');
  },  // render does all the visual parts
  someFunction: function(){},
  closeView: function(){} // not part of Backbone, these are event handlers we created
});

var todoControllerView = new TodoControllerView();  // this calls 'initialize'

module.exports = todoControllerView;

