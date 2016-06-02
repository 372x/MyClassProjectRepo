
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

var TodoModel;  // these are the classes
var TodoControllerView;  // these are the classes
var TodoView;  // these are the classes

var todoModel;
var todoControllerView;


// Model
TodoModel = Backbone.Model.extend({  // e.g. TodoModelClass
  defaults: {
    todos: []
  },
  todoSchema: {  // this schema affects all the data coming in and out of model
    id: 0,  // gives a unique identifier to this
    title: "",
    completed: false
  },
  fetch: function(){
    var data = lscache.get('todos');
    data = this.applySchema(data);
    this.set('todos', data);  // this sets the value of the todos to the value of 'data'
      // this takes the data from lscachs and put it in our model
  },
  save: function(){
    var data = this.get('todos');
    data = this.applySchema(data);
    lscache.set('todos', data);
  }
  applySchema: function(todos){
    var data = todos;
    var schema = this.todoSchema;        // classic Backbone bug: the 'this.todoSchema' is undefined because it hasn't been defined within this function.
    data = (_.isArray(todos)) ? data : [];   // shorthand if statement; stuff in parens is the condition to be evaluated for true or false.  If true, us the value after the '?', if false, use the stuff after the ':'
      // shorthand only for simple if else statement
      // ensuring this is an array
    data = data.map(function(todo, index){  // applies the enclosed function to each todo
      todo.id = index;  // index of the array?
      return _.defaults(todo, schema);  // was: defaults(todo, this.todoSchema) // this is the output value
    });  // stores the mapped data back into data variable
    return data;
  }
});

todoModel = new TodoModel();

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

todoControllerView = new TodoControllerView();  // this calls 'initialize'

module.exports = todoControllerView;

