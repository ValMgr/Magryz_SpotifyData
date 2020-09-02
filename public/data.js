/** data.js
 *  All scripts used to get data, read data, and draw charts
 *  Author: Valentin Magry
 */

// Function for TOP 50 FR - not yet based on user location but the idea is to get user location and got top 50 of his country
(async function() {
// Check if connected (If token is available)
if(token != undefined){
    // Setup playlist template
    const playlistSource = document.getElementById('playlist-template').innerHTML,
        playlistTemplate = Handlebars.compile(playlistSource),
        playlistPlaceholder = document.getElementById('top50FR');

    // Get top 50 France playlist
    const Top50Data = await $.ajax({
        // GET request to Spotify's API
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            console.log("Top50's Country succesfully loaded...");
        },
        error: function(req, status, error){
          console.log("Top50's County failed to load");
          console.log(error);
        }
      });

      // Get JSON data stored in 'top50FR'
      playlistPlaceholder.innerHTML = playlistTemplate(Top50Data);
      //Setup Top50 Table
      const table = document.getElementById("table_"+Top50Data.id);
      var AllGenres = [];

      for (var i = 0; i < Top50Data.tracks.total; i++) {

        // Creating tracks object
        const tracks = {
          tracksName: Top50Data.tracks.items[i].track.name,
          tracksAlbum: Top50Data.tracks.items[i].track.album.name,
          tracksArtist: Top50Data.tracks.items[i].track.artists[0].name
        };

        // Add new line to table from tracks objects
        AddLine(table, i, tracks.tracksName, tracks.tracksAlbum, tracks.tracksArtist);


        // For each track, get artist genre and add them to allGenres[] array
        const artistID = Top50Data.tracks.items[i].track.artists[0].id;
        await $.ajax({
          // GET request to Spotify's API
          url: 'https://api.spotify.com/v1/artists/' + artistID,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          complete: function(result) {          
            for(var j=0;j<result.responseJSON.genres.length;j++){
              AllGenres.push(result.responseJSON.genres[j]);
            }       
          },
          error: function(req, status, error){
            console.log("Error: Failed to load artist's genres");
            console.log(error);
          }
        });
      }
      
      CreateChart(AllGenres, Top50Data.id);
}
})();

//Function for Top 50 World
(async function() {
  // Check if connected (If token is available)
  if(token != undefined){ 
      // Setup playlist template
      var playlistSource = document.getElementById('playlist-template').innerHTML,
          playlistTemplate = Handlebars.compile(playlistSource),
          playlistPlaceholder = document.getElementById('top50World');
  
      // Get top 50 World playlist
      const Top50Data = await $.ajax({
        // GET request to Spotify's API
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            console.log("Top50's World succesfully loaded...");
        },
        error: function(req, status, error){
          console.log("Top50's World failed to load");
          console.log(error);
        }
      });

      // Get JSON data stored in 'top50FR'
      playlistPlaceholder.innerHTML = playlistTemplate(Top50Data);
      //Setup Top50 Table
      const table = document.getElementById("table_"+Top50Data.id);
      var AllGenres = [];

      for (var i = 0; i < Top50Data.tracks.total; i++) {

        // Creating tracks object
        const tracks = {
          tracksName: Top50Data.tracks.items[i].track.name,
          tracksAlbum: Top50Data.tracks.items[i].track.album.name,
          tracksArtist: Top50Data.tracks.items[i].track.artists[0].name
        };

        // Add new line to table from tracks objects
        AddLine(table, i, tracks.tracksName, tracks.tracksAlbum, tracks.tracksArtist);


        // For each track, get artist genre and add them to allGenres[] array
        const artistID = Top50Data.tracks.items[i].track.artists[0].id;
        await $.ajax({
          // GET request to Spotify's API
          url: 'https://api.spotify.com/v1/artists/' + artistID,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          complete: function(result) {          
            for(var j=0;j<result.responseJSON.genres.length;j++){
              AllGenres.push(result.responseJSON.genres[j]);
            }       
          },
          error: function(req, status, error){
            console.log("Error: Failed to load artist's genres");
            console.log(error);
          }
        });
      }
      
      CreateChart(AllGenres, Top50Data.id);
  
  }
  })();

// Function for Top 50 User
(async function() {
  // Check if connected (If token is available)
  if(token != undefined){
      // Setup playlist template
      var userTrackSource = document.getElementById('user-tracks-template').innerHTML,
          userTrackTemplate = Handlebars.compile(userTrackSource),
          userTrackPlaceholder = document.getElementById('top50User');
  
      // Get top 50 User playlist
      const Top50Data = await $.ajax({
        // GET request to Spotify's API
        url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            console.log("Top50's User succesfully loaded...");
        },
        error: function(req, status, error){
          console.log("Top50's User User to load");
          console.log(error);
        }
      });

      // Get JSON data stored in 'top50FR'
      userTrackPlaceholder.innerHTML = userTrackTemplate(Top50Data);
      //Setup Top50 Table
      const table = document.getElementById("table_user");
      var AllGenres = [];

      for (var i = 0; i < Top50Data.total; i++) {

        // Creating tracks object
        const tracks = {
          tracksName: Top50Data.items[i].name,
          tracksAlbum: Top50Data.items[i].album.name,
          tracksArtist: Top50Data.items[i].artists[0].name
        };

        // Add new line to table from tracks objects
        AddLine(table, i, tracks.tracksName, tracks.tracksAlbum, tracks.tracksArtist);


        // For each track, get artist genre and add them to allGenres[] array
        const artistID = Top50Data.items[i].artists[0].id;
        await $.ajax({
          // GET request to Spotify's API
          url: 'https://api.spotify.com/v1/artists/' + artistID,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          complete: function(result) {          
            for(var j=0;j<result.responseJSON.genres.length;j++){
              AllGenres.push(result.responseJSON.genres[j]);
            }       
          },
          error: function(req, status, error){
            console.log("Error: Failed to load artist's genres");
            console.log(error);
          }
        });
      }
      
      CreateChart(AllGenres, 'user');
  
  }
  })();
