(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
// function listeningButton()

let formName= document.getElementById('searchMovie');
let searchVal =document.getElementById("search");
let submitBtn= document.getElementById('mybtn');

//NEED TP UNDERSTAND WELL HOW THIS WORKS

submitBtn.addEventListener("click", function(eventTriggered){
  eventTriggered.preventDefault();
  var movieName = searchVal.value;
  //this line returns the value that was entered into the search box.
    findMovie(movieName);
      //this invokes the function below on this movie entered.

});

function findMovie(movieName){
  var  url = (`http://www.omdbapi.com/?s=${movieName}`);
  return fetch(url)
  .then(function(moviePromise){
    // console.log(moviePromise);
    return moviePromise.json();
  })
  .then((moviePromise) => {
    let arrOfMovieObjs = moviePromise.Search;
// console.log(arrOfMovieObjs);
arrOfMovieObjs.forEach(function(obj){
  // console.log(obj.imdbID);

  movies.push({id: obj['imdbID'],
                poster: obj['Poster'],
                title: obj['Title'],
                year: obj['Year']})

});
renderMovies();
})

}

}) ();
