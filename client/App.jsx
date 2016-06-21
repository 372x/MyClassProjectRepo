// import all our styles and pages

import $ from 'jquery';
import 'styles/main.scss';
// import todos from 'pages/todo-backbone';  // todos is what was app on the todo.js file
// import todos from 'pages/todo/todoController';  // todos is what was app on the todo.js file
import TodoControllerView from 'pages/todo/todoController';  // todos is what was app on the todo.js file
import project from 'pages/project';
import funnySquares from 'pages/funnySquares';
import header from 'components/header';
import main from 'components/main';  // NEW NEW NEW 
import footer from 'components/footer';  // NEW NEW NEW 
// import formsBackbone from 'pages/formsBackbone';
// import listTemplate from 'templates/accountList.html';
import photoSearch from 'pages/photoSearch';

$(function(){
  // $('header').append(navbar);
  header.init();
  main.init();  // NEW NEW NEW 
  footer.init();  // NEW NEW NEW  
	// what page are we on?
  var url = window.location.pathname;

    // our first javascript router; better syntax than if statement;
  switch (url){   // switch statement; going to look for lots of values of 'url'; executes same as if statement, but better syntax, better-looking code
    case '/pages/todo.html':  // takes place of if statement
    todos.render();   // todos.init();
		break;
    
    case '/pages/project.html':
        // init the project javascript
		break;
    
    case '/pages/funnySquares.html':
      funnySquares.init();
    break;

    case '/pages/photoSearch.html':
      photoSearch.init();
    break;

    case '/pages/todo.html':
      var todoControllerView = new TodoControllerView();
    break;

    case '/':
      // init the project javascript
      // home.init();
    break;

    /* case '/pages/formsBackbone.html':
        formsBackbone.render();
    break; */

    default: break;  
  }

	// if (url === 'pages/todo.html'){
	//	todos.init();
	// }
  // todos.init();
});

// this file manages all the pages of our website

// Fancy Console Message for Developers only to see; it's all all pages if it's on app.jsx, can move to home page only
// console.log('============================');
// console.log('============================');
// console.log('===I am looking for a job===');
// console.log('============================');
// console.log('==========call me===========');
// console.log('============================');
// console.log('============================');
