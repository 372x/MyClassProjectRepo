
import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo';  // todos is what was app on the todo.js file
import project from 'pages/project';

$(function(){
  todos.init();
});

// this file manages all the pages of our website
