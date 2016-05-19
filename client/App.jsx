
import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo';  // todos is what was app on the todo.js file
import project from 'pages/project';
import funnySquares from 'pages/funnySquares';
import header from 'components/header';
import main from 'components/main';  // NEW NEW NEW 
import footer from 'components/footer';  // NEW NEW NEW 

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
      todos.init();
		break;
    case '/pages/project.html':
        // init the project javascript
		break;
    case '/pages/funnySquares.html':
        funnySquares.init();
    break;
  }

	// if (url === 'pages/todo.html'){
	//	todos.init();
	// }
  // todos.init();
});

// this file manages all the pages of our website
