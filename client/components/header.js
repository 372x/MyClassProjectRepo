
import $ from 'jquery';
import navbar from 'templates/navbar.html';

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('header').append(navbar);
    // event handler
  }
};

module.exports = app;
