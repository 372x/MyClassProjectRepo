var $ = require('jquery');
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone';
import lscache from 'lscache';


// Model
var TodoModel = Backbone.Model.extend({  // e.g. TodoModelClass
  defaults: {
    todos: []
  },
  todoSchema: {  // this schema affects all the data coming in and out of model
    id: 0,  // gives a unique identifier to this
    title: '',
    completed: false,
    isEditing: false
  },
  fetch: function(){
    var that = this;  // pay attention to this, usually a reason for it because of a later 'this'; developers put this in like a clue
   // debugger;
   // var data = lscache.get('todos');
   // data = this.applySchema(data);
   // this.set('todos', data);  // this sets the value of the todos to the value of 'data'
      // this takes the data from lscachs and put it in our model
    $.ajax({  // this is all one big object that gets sent to AJAX, but we don't know when it will complete
      url: '/api',
      method: 'GET',
      complete: function(response){  // new scope block where 'this' has a different meaning than above
        var dataString = response.responseText;
        var data = JSON.parse(dataString);
        data = that.applySchema(data);  // apply schema to parsed string
        that.set('todos', data);  // sets it into local model
      }
    });      
  },
  save: function(){
   // debugger;
   // var data = this.get('todos');
   // data = this.applySchema(data);
   // lscache.set('todos', data);
    var that = this;
    var todos = this.get('todos');  // can use 'this' here because inside the model, even though have already defined 'that' as 'this', therefore better to always use 'this' when you can, and fallback to 'that' only when needed
    $.ajax({
      url: '/api',
      method: 'POST',
      data: {todos: JSON.stringify(todos)},  // assigns the array 'todos' and sets it as the 'todos' variable (object?)
      complete: function(response){
        var dataString = response.responseText;
        var data = JSON.parse(dataString);
        data = that.applySchema(data);  // apply schema to parsed string
        that.set('todos', data);  // sets it into local model
        that.trigger('change');
      }
    });
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
    this.save(); 
  },
  removeItem: function(id){
    // takes the item out of the model and calls .save
    var todos = this.get('todos');
    todos.splice(id, 1);
    this.save();
  },
  itemCompleted: function(id){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});  // the first id is not a variable, it's the first of a key value pair
    item.completed = !item.completed;
    this.set('todos', todos);
    this.save();
  },
  editTitle: function(id, newTitle){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});  // the first id is not a variable, it's the first of a key value pair
    item.title = newTitle;
    item.isEditing = false;
    this.set('todos', todos);
    this.save();
  },
  startEditing: function(id){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});  // the first id is not a variable, it's the first of a key value pair
    item.isEditing = true;
    this.set('todos', todos);
    this.save();
  }  
});

var todoModel = new TodoModel();

module.exports = todoModel;
