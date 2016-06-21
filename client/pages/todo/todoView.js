var $ = require('jquery');
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
// backbone relies on underscore and needs to come after it in the imports
import Backbone from 'backbone';
import Handlebars from 'handlebars';
// import lscache from 'lscache';
import todoItemTemplate from 'templates/todoItem.html';
// import todoControllerView from 'pages/todo/todoControllerView';

var TodoItemView = Backbone.View.extend({   // these are the user events; this is the class of TodoItemView
  tagName: 'li',  // el = <li>   i.e. el = an empty 'li' tag // 'el' is used when the item actually exists,, otherwise tagName is a placeholder, el will need to be appended at some point to the DOM    
  className: 'list-group-item row',
  events: {
    'click .close': 'removeItem',
    'change .completed-checkbox': 'completedClicked',  // change, not click, because from field
    'click .title': 'titleClicked',
    'keypress .title-edit-input': 'titleEditConfirm'
  },
  template: Handlebars.compile(todoItemTemplate),  // compiled once, then re-rendered multiple times
  initialize: function(todo, controller){
    this.controller = controller;
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
    this.controller.removeItem(this.data.id);  // the controller is what connects to the view model    
    // todoControllerView.removeItem(this.data.id);  // the controller is what connects to the view model
  },
  completedClicked: function(event){
    var isChecked = $(event.target).is(':checked');  // jquery converts the CSS selector :checked to a true or false
    this.controller.itemCompleted(this.data.id, isChecked);
    // todoControllerView.itemCompleted(this.data.id, isChecked);
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
      // todoControllerView.titleEdit(newTitle, this.data.id);
      this.controller.titleEdit(newTitle, this.data.id);
    }
  }
});

module.exports = TodoItemView;
