
var $ = require('jquery');
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
// backbone relies on underscore and needs to come after it in the imports
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import todoItemTemplate from 'templates/todoItem.html';

// Backbone Todo App

var TodoModel;  // these are the classes
var TodoControllerView;  // these are the classes
var TodoView;  // these are the classes
var TodoItemView;

var todoModel;
var todoControllerView;

// Model
TodoModel = Backbone.Model.extend({  // e.g. TodoModelClass
  defaults: {
    todos: []
  },
  todoSchema: {  // this schema affects all the data coming in and out of model
    id: 0,  // gives a unique identifier to this
    title: '',
    completed: false
  },
  fetch: function(){
   // debugger;
    var data = lscache.get('todos');
    data = this.applySchema(data);
    this.set('todos', data);  // this sets the value of the todos to the value of 'data'
      // this takes the data from lscachs and put it in our model
  },
  save: function(){
   // debugger;
    var data = this.get('todos');
    data = this.applySchema(data);
    lscache.set('todos', data);
  },
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
  },
  addItem: function(newTitle){
    var newTodo = {title: newTitle};
    var todos = this.get('todos');
    todos.push(newTodo);
    this.set('todos', todos);
    this.save();  // 
  },
  removeItem: function(id){
    // takes the item out of the model and calls .save
    var todos = this.get('todos');
    todos.splice(id, 1);
    this.save();
  },
  itemCompleted: function(id, isCompleted){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});  // the first id is not a variable, it's the first of a key value pair
    item.completed = isCompleted;
    this.set('todos', todos);
    this.save();
  },
  editTitle: function(newTitle, id){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});  // the first id is not a variable, it's the first of a key value pair
    item.title = newTitle;
    this.set('todos', todos);
    this.save();
  }
});

todoModel = new TodoModel();

// Controller View: shifts between model and view, transport of data from model to view and back

TodoControllerView = Backbone.View.extend({
  el: '.todo-container',  // backbone automatically makes 'el' a '$el'// html element that has the class .container, refers to this DOM node; this is a jquery selector
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem'
  },
  inititalize: function(){
    this.model.fetch();
  },  
  render: function(){
    // debugger;
    // render the todo items
    var todos = this.model.get('todos');
    var $ul = this.$el.find('ul');
    $ul.html('');
    todos.map(function(todo){
      var view = new TodoItemView(todo);
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
 
TodoItemView = Backbone.View.extend({   // these are the user events; this is the class of TodoItemView
  tagName: 'li',  // el = <li>   i.e. el = an empty 'li' tag // 'el' is used when the item actually exists,, otherwise tagName is a placeholder, el will need to be appended at some point to the DOM    
  className: 'list-group-item row',
  events: {
    'click .close': 'removeItem',
    'change .completed-checkbox': 'completedClicked',  // change, not click, because from field
    'click .title': 'titleClicked',
    'keypress .title-edit-input': 'titleEditConfirm'
  },
  template: Handlebars.compile(todoItemTemplate),  // compiled once, then re-rendered multiple times
  initialize: function(todo){
    this.data = todo;
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.data));  // this.$el is generated in tagName, and is what is rendered
    this.$title = this.$el.find('.title');
    this.$titleEdit = this.$el.find('.title-edit');
    this.$titleInput = this.$titleEdit.find('.title-edit-input');
    this.$el.toggleClass('disabled', this.data.completed);  

  },
  removeItem: function(){
    // get the id of the current item and remove it from the DOM
    todoControllerView.removeItem(this.data.id);  // the controller is what connects to the view model
  },
  completedClicked: function(event){
    var isChecked = $(event.target).is(':checked');  // jquery converts the CSS selector :checked to a true or false
    todoControllerView.itemCompleted(this.data.id, isChecked);
  },
  titleClicked: function(){
    this.$title.addClass('hidden');
    this.$titleEdit.removeClass('hidden');
    this.$titleInput.focus();
    // in jquery: this.$title.add(this.$titleEdit).remove('hidden');
  },
  titleEditConfirm: function(event){
    if (event.which === 13) {
      // they hit the enter key
      var newTitle = this.$titleInput.val();
      todoControllerView.titleEdit(newTitle, this.data.id);
    }
  }
});

todoControllerView = new TodoControllerView();  // this calls 'initialize'

module.exports = todoControllerView;

