
import $ from 'jquery';
import Handlebars from 'handlebars';
import photoTemplate from 'templates/flickrImage.html';

var compiledTemplate = Handlebars.compile(photoTemplate);

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    app.$input = $('.search-container input');
    app.bindEvents();
  },
  bindEvents: function(){
    app.$input.on('keypress', app.searchKeypress);
  },
  searchKeypress: function(event){
    if (event.which === 13) {
      app.doSearch();
    }
  },
  doSearch: function(){
    var phrase = app.$input.val();
    // AJAX request
    $.ajax({   // asynchronous, which means we don't know when it will occur
      url: 'https://api.flickr.com/services/rest',
      method: 'GET',  // retrieves data, use all CAPS for the method
      data: {
        text: phrase,
        method: 'flickr.photos.search',
        api_key: '731717db25329eb6aa65703cb6b71970',
        format: 'json',
        per_page: 30
      },
      complete: function(response){   // could also use a success: function(){} or an error: function(error){}, but complete is best
        var text = response.responseText;
        text = text.slice(14, text.length - 1);
        var data = JSON.parse(text);
        app.renderResults(data);
      }
    });
  },
  renderResults: function(data){
    var html = '';
    var myPhotos = data.photos.photo;
    myPhotos.forEach(function(item){
      html = html + compiledTemplate(item);
    });
    // var html = compiledTemplate(data.photos.photo[0]);
    // append result to the .search-result div, but use .html, b/c append doesn't remove the old stuff
    // .map would work, .each, _.each, _.map
    $('.search-results').html(html);
  }
};

module.exports = app;


/*
import $ from 'jquery';
import Handlebars from 'handlebars';
import photoTemplate from 'templates/flickrImage.html';

var compiledTemplate = Handlebars.compile(photoTemplate);
var app = {
  init: function(){
    // app.render();
    app.bindEvents();
  },
  render: function(){
    // app.$input = $('.search-container input');
    // app.bindEvents();
    
  },
  bindEvents: function(){
    // app.$input.on('keypress', app.searchKeypress);
    $('.input-search').on('keypress', function(event){
      if (event.which === 13) {
        app.doSearch();
      }
    });
  },
  // searchKeypress: function(event){
  //  if (event.which === 13) {
  //    app.doSearch();
  //  }
  // },
  doSearch: function(){
    // var phrase = app.$input.val();
    var phrase = $('.input-search').val();
    // AJAX request
    $.ajax({
      url: 'https://api.flickr.com/services/rest',
      method: 'GET',
      data: {
        text: phrase,
        method: 'flickr.photos.search',
        api_key: '731717db25329eb6aa65703cb6b71970',
        format: 'json',
        per_page: 3
      },
      complete: function(response){
        var text = response.responseText;
        text = text.slice(14, text.length - 1);
        var data = JSON.parse(text);
        app.renderResults(data);
      }
    });
  },
  renderResults: function(data){
    // pass data to the template
    var html = compiledTemplate(data.photos.photo[0]);
    // append result to the .search-result div
    // .map
    $('.search-result').html(html);
  }
};

module.exports = app; */
