
import $ from 'jquery';   // ES6 way to get jquery library
  // var $ = require('jquery'); == old way of doing this
import _ from 'underscore';

import Handlebars from 'handlebars';

// on document load
$(function(){
  
  // Data Model ==> our database
  var todos = [    // to do's always start with an empty array ==> var todos = [];
   // { title: "todo 1", completed: true },  // title & completed match the HTML in the template
   // { title: "todo 2", completed: false },
   // { title: "todo 3", completed: false }
  ];
  
  
//  Application
  var template; // initially undefined; var scopes the template; want var template outside var app
  var app = {   // this whole thing is a property with two properties of init and render; init sets things up; render renders the HTML; want to separate individual actions so modular;  the curly brackets means it's an object.
    // a function is a repository of code that will be executed later.  When you call the function, you are calling up the repository of code to run it at that time.
         x: 4,
//  }
    init: function(){
      app.compileTemplates();
      app.render();
    },
    render: function(){
      var todoHtml = _.map(todos, function(todo){
        return template(todo);
      });
      app.unbindEvents();
      $('ul.list-group').html(todoHtml.join(''));
      app.bindEvents();
    },
    compileTemplates: function(){
      template = $('[type="text/x-template"]');
      template = Handlebars.compile(template.first().html());
    },
    unbindEvents: function(){
      $('.list-group-item').off();
      $('.add-todo-container button').off();
      $('input[type="checkbox"]').off();
      $('.list-group-item button').off();
    },
    bindEvents: function(){
      app.bindHoverEvents();
      app.bindCheckboxEvents();
      app.bindAddTodoEvents();
      app.bindRemoveTodoEvents();
    },
    bindHoverEvents: function(){
      var $items = $('.list-group-item');
      $items.on('mouseover', function(){
        $(this).addClass('list-group-item-success');
      });
      $items.on('mouseout', function(){
        $(this).removeClass('list-group-item-success');
      });
    },
    bindCheckboxEvents: function(){
      var $checkboxes = $('input[type="checkbox"]');
      // console.log($checkboxes.length);
      $checkboxes.on('change', function(){
        var wasChecked = $(this).is(':checked');
        if (!wasChecked){
          $(this).parent().parent().removeClass('disabled');
        } else {
          $(this).parent().parent().addClass('disabled');
        }
      });  
    },
    bindAddTodoEvents: function(){
      $('.add-todo-container button').on('click', function(){
        var newTodoTitle = $('.add-todo-container input').val();
        if (_.isString(newTodoTitle) && newTodoTitle.length > 2) {
          var newTodoObject = { title: newTodoTitle, completed: false };
          todos.push(newTodoObject);
          $('.add-todo-container input').val('');
          app.render();
        }
      });
    },
    bindRemoveTodoEvents: function(){
      $('.list-group-item button').on('click', function(){
        var index = $(this).parent().parent().index();
        todos.splice(index, 1);
        app.render();
      });
    }
  };
  
  app.init();
  
});
