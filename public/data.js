(function() {

  var playlistSource = document.getElementById('playlist-template').innerHTML,
      playlistTemplate = Handlebars.compile(playlistSource),
      playlistPlaceholder = document.getElementById('top50FR');

      
if(token != undefined){

    // Get top 50 France tracks
    $.ajax({
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(response) {
          playlistPlaceholder.innerHTML = playlistTemplate(response);
          var tracks;
          for (var i = 0; i < response.tracks.total; i++) {
            tracks = {
                  tracksName: response.tracks.items[i].track.name,
                  tracksAlbum: response.tracks.items[i].track.album.name,
                  tracksArtist: response.tracks.items[i].track.artists[0].name

              };
              var table = document.getElementById("tracks");
              var row = table.insertRow(i+1);
              var cell0 = row.insertCell(0)
              var cell1 = row.insertCell(1);
              var cell2 = row.insertCell(2);
              var cell3 = row.insertCell(3);
  
              var j = i+1;
              cell0.innerHTML = j;
              cell1.innerHTML = tracks.tracksName;
              cell2.innerHTML = tracks.tracksAlbum;
              cell3.innerHTML = tracks.tracksArtist;
    
          }
        


        }
      });

      
      // Get top 50 users tracks
      $.ajax({
        url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(response) {
          playlistPlaceholder.innerHTML = playlistTemplate(response);

        }
      });

}
})();


