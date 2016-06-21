var $ = require('jquery');
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
// backbone relies on underscore and needs to come after it in the imports
import Backbone from 'backbone';
import Handlebars from 'handlebars';
// import lscache from 'lscache';
import todoModel from 'pages/todo/todoModel';
import TodoItemView from 'pages/todo/todoView';

// Controller View

var TodoControllerView = Backbone.View.extend({
  el: '.todo-container',  // backbone automatically makes 'el' a '$el'// html element that has the class .container, refers to this DOM node; this is a jquery selector
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem'
  },
  initialize: function(){
    this.model.fetch();  // fetch is an ajax request, so might take some time but render will happen right away
    // go fetch this model, and when you have it,render it
    // instead of 'this.render;''  use backbone feature that allows it to listen to a model
    // this.listenTo(this.model, 'change', this.render);  // backbone approach
    this.model.on('change', this.render, this);   // instructor prefers this
  },  // the above line is important re: ajax and waiting for the asynchronous stuff to execute
  render: function(){
    // debugger;
    // render the todo items
    var todos = this.model.get('todos');
    var $ul = this.$el.find('.list-group');
    $ul.html('');
    var controller = this;
    todos.map(function(todo){
      var view = new TodoItemView(todo, controller);
      $ul.append(view.$el);  // can't do an append inside a .mpa  // reading to and from the DOM is slow,and appending in writing to the DOM, and map is doing an append for every item in the todo
    });
  },  // render does all the visual parts
  // someFunction: function(){},
  // closeView: function(){} // not part of Backbone, these are event handlers we created
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');  // 'el' is the todo-container; el is the DOM node, $el wraps the DOM node in jquery
    var newTitle = $input.val();
    if (newTitle === '') { return; }  // the'return' exits you out of this
    this.model.addItem(newTitle);
    $input.val('');  // clears out value of input
    this.render();  // have to rerender to the change from adding the item
  },
  removeItem: function(id){
    this.model.removeItem(id);  // id of what will be removed is passed to the model for removal
    this.render();  // have to rerender to see the change from removing the item
  },
  itemCompleted: function(id, isCompleted){
    this.model.itemCompleted(id, isCompleted);
    this.render();
  },
  titleEdit: function(newTitle, id){
    this.model.editTitle(newTitle, id);
    this.render();
  }
});

// todoControllerView = new TodoControllerView();  // this calls 'initialize'

module.exports = TodoControllerView;
