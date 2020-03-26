(function() {

  var playlistSource = document.getElementById('playlist-template').innerHTML,
      playlistTemplate = Handlebars.compile(playlistSource),
      playlistPlaceholder = document.getElementById('top50FR');

if(token != undefined){

    $.ajax({
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(response) {
          playlistPlaceholder.innerHTML = playlistTemplate(response);
          console.log(response.tracks.items);
        }
      });
}
})();
