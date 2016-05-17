
import $ from 'jquery';
import _ from 'underscore';
import rawTemplate from 'templates/funnySquare.html';
import Handlebars from 'handlebars';

var template;
var app = {
  init: function(){   // initializes i.e. starts us off
    template = Handlebars.compile(rawTemplate);
    app.render();
  },
  render: function(){
    // display six squares
    var numberOfSquares = 6;
    var renderedHtml = '';
    _.times(numberOfSquares, function(index){  // using 'times' avoids using a 'for loop'
      renderedHtml += template({ id: index });
    });
    $('h1').after(renderedHtml);
  }
};

module.exports = app;
