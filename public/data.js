// Function for TOP 50 FR - not yet based on user location but the idea is to get user location and got top 50 of his country
(function() {
// Check if connected (If token is available)
if(token != undefined){
    // Setup playlist template
    var playlistSource = document.getElementById('playlist-template').innerHTML,
        playlistTemplate = Handlebars.compile(playlistSource),
        playlistPlaceholder = document.getElementById('top50FR');

    // Get top 50 France playlist
    $.ajax({
        // GET request to Spotify's API
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(top50FR) {
          // Get JSON data stored in 'top50FR'
          playlistPlaceholder.innerHTML = playlistTemplate(top50FR);

          // Creating playlist array with tracks object
          var tracks;
          var allGenres = [];
          for (var i = 0; i < top50FR.tracks.total; i++) {

              // For each track, get artist genre and add them to allGenres[] array
              id = top50FR.tracks.items[i].track.artists[0].id;
              $.ajax({
                // GET request to Spotify's API
                url: 'https://api.spotify.com/v1/artists/' + id,
                headers: {
                  'Authorization': 'Bearer ' + token
                },
                success: function(result) {
                  // Add all genres collected to the array
                  for(var j=0;j<result.genres.length;j++){
                    allGenres.push(result.genres[j]);
                  }

                }
              });

                // Creating tracks object
                tracks = {
                    tracksName: top50FR.tracks.items[i].track.name,
                    tracksAlbum: top50FR.tracks.items[i].track.album.name,
                    tracksArtist: top50FR.tracks.items[i].track.artists[0].name
                };

              // Creating table from tracks objects
              var table = document.getElementById("table_"+top50FR.id);
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

          // Set delay to make sure that 'allGenre' array are fill up
          setTimeout(() => {
            var genreCount = [];
            const genre = {
              genre: '',
              count: 0
            }

            // For each occurences in allGenres array, if doesnt alreay exist, create it, or add 1 to count in genreCount object array
            for(var z=0;z<allGenres.length;z++){
              if(genreCount.find(element => element.genre == allGenres[z]) != undefined){
                genreCount.find(element => element.genre == allGenres[z]).count ++;
              }
              else{
                var newObject = Object.create(genre);
                newObject.genre = allGenres[z];
                newObject.count = 1;
                genreCount.push(newObject)
              }
            }

            var genreCountG = [];
            var genreCountC = [];
            var Color = [];
            var ColorB = []

            for (let index = 0; index < genreCount.length; index++) {
              genreCountC[index] = genreCount[index].count;
              genreCountG[index] = genreCount[index].genre;

              // Get Randomly different color for each genre
              var r = getRandomInt(255);
              var g = getRandomInt(255);
              var b = getRandomInt(255);

              // Set background and border color
              var rgba = 'rgba('+r+','+g+','+b+', 0.2)';
              var rgbaB = 'rgba('+r+','+g+','+b+', 1)';

              // Add them to array
              Color.push(rgba);
              ColorB.push(rgbaB);
            
            }



          // Creating graph from Genres array

          var ctx = document.getElementById('graph_'+top50FR.id).getContext('2d');
          var ChartTop50FR = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: genreCountG,
                  datasets: [{
                      label: '# of genres',
                      data: genreCountC,
                      backgroundColor: Color,
                      borderColor: ColorB,
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });

        }, 1000);

        }
      });

}
})();

// Function for Top 50 World
(function() {
  // Check if connected (If token is available)
  if(token != undefined){ 
      // Setup playlist template
      var playlistSource = document.getElementById('playlist-template').innerHTML,
          playlistTemplate = Handlebars.compile(playlistSource),
          playlistPlaceholder = document.getElementById('top50World');
  
      // Get top 50 World playlist
      $.ajax({
          url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          success: function(top50World) {
            playlistPlaceholder.innerHTML = playlistTemplate(top50World);
  
            // Creating playlist array with tracks object
            var tracks;
            var allGenres = [];
            for (var i = 0; i < top50World.tracks.total; i++) {
  
                // For each track, get artist genre and add them to allGenres[]
                id = top50World.tracks.items[i].track.artists[0].id;
                $.ajax({
                  url: 'https://api.spotify.com/v1/artists/' + id,
                  headers: {
                    'Authorization': 'Bearer ' + token
                  },
                  success: function(result) {
  
                    for(var j=0;j<result.genres.length;j++){
                      allGenres.push(result.genres[j]);
                    }
  
                  }
                });
  
                  // Creating tracks object
                  tracks = {
                      tracksName: top50World.tracks.items[i].track.name,
                      tracksAlbum: top50World.tracks.items[i].track.album.name,
                      tracksArtist: top50World.tracks.items[i].track.artists[0].name
                  };
  
                // Creating table from tracks objects
                var table = document.getElementById("table_"+top50World.id);
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
  
            // Set delay to make sure that 'allGenre' array are fill up
            setTimeout(() => {
              var genreCount = [];
              const genre = {
                genre: '',
                count: 0
              }
  
              // For each occurences in allGenres array, if doesnt alreay exist, create it, or add 1 to count in genreCount object array
              for(var z=0;z<allGenres.length;z++){
                if(genreCount.find(element => element.genre == allGenres[z]) != undefined){
                  genreCount.find(element => element.genre == allGenres[z]).count ++;
                }
                else{
                  var newObject = Object.create(genre);
                  newObject.genre = allGenres[z];
                  newObject.count = 1;
                  genreCount.push(newObject)
                }
              }
  
              var genreCountG = [];
              var genreCountC = [];
              var Color = [];
              var ColorB = []
  
              for (let index = 0; index < genreCount.length; index++) {
                genreCountC[index] = genreCount[index].count;
                genreCountG[index] = genreCount[index].genre;
  
                // Get Randomly different color for each genre
                var r = getRandomInt(255);
                var g = getRandomInt(255);
                var b = getRandomInt(255);
  
                // Set background and border color
                var rgba = 'rgba('+r+','+g+','+b+', 0.2)';
                var rgbaB = 'rgba('+r+','+g+','+b+', 1)';
  
                // Add them to array
                Color.push(rgba);
                ColorB.push(rgbaB);
              
              }
  
  
  
            // Creating graph from Genres array
            var ctx = document.getElementById("graph_"+top50World.id).getContext('2d');
            var ChartTop50FR = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: genreCountG,
                    datasets: [{
                        label: '# of genres',
                        data: genreCountC,
                        backgroundColor: Color,
                        borderColor: ColorB,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
  
          }, 1000);
  
          }
        });
  
  }
  })();

// Function for Top 50 User
(function() {
  // Check if connected (If token is available)
  if(token != undefined){
      // Setup playlist template
      var userTrackSource = document.getElementById('user-tracks-template').innerHTML,
          userTrackTemplate = Handlebars.compile(userTrackSource),
          userTrackPlaceholder = document.getElementById('top50User');
  
      // Get top 50 User playlist
      $.ajax({
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          success: function(top50User) {
            userTrackPlaceholder.innerHTML = userTrackTemplate(top50User);
  
            //Creating playlist array with tracks object
            var tracks;
            var allGenres = [];
            for (var i = 0; i < top50User.total; i++) {
  
                // For each track, get artist genre and add them to allGenres[]
                id = top50User.items[i].artists[0].id;
                $.ajax({
                  url: 'https://api.spotify.com/v1/artists/' + id,
                  headers: {
                    'Authorization': 'Bearer ' + token
                  },
                  success: function(result) {
  
                    for(var j=0;j<result.genres.length;j++){
                      allGenres.push(result.genres[j]);
                    }
  
                  }
                });
  
                  // Creating tracks object
                  tracks = {
                      tracksName: top50User.items[i].name,
                      tracksAlbum: top50User.items[i].album.name,
                      tracksArtist: top50User.items[i].artists[0].name
                  };
  
                // Creating table from tracks objects
                var table = document.getElementById("table_user");
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
  
            // Set delay to make sure that 'allGenre' array are fill up
            setTimeout(() => {
              var genreCount = [];
              const genre = {
                genre: '',
                count: 0
              }
  
              // For each occurences in allGenres array, if doesnt alreay exist, create it, or add 1 to count in genreCount object array
              for(var z=0;z<allGenres.length;z++){
                if(genreCount.find(element => element.genre == allGenres[z]) != undefined){
                  genreCount.find(element => element.genre == allGenres[z]).count ++;
                }
                else{
                  var newObject = Object.create(genre);
                  newObject.genre = allGenres[z];
                  newObject.count = 1;
                  genreCount.push(newObject)
                }
              }
  
              var genreCountG = [];
              var genreCountC = [];
              var Color = [];
              var ColorB = []
  
              for (let index = 0; index < genreCount.length; index++) {
                genreCountC[index] = genreCount[index].count;
                genreCountG[index] = genreCount[index].genre;
  
                // Get Randomly different color for each genre
                var r = getRandomInt(255);
                var g = getRandomInt(255);
                var b = getRandomInt(255);
  
                // Set background and border color
                var rgba = 'rgba('+r+','+g+','+b+', 0.2)';
                var rgbaB = 'rgba('+r+','+g+','+b+', 1)';
  
                // Add them to array
                Color.push(rgba);
                ColorB.push(rgbaB);
              
              }
  
  
  
            // Creating graph from Genres array
            var ctx = document.getElementById("graph_user").getContext('2d');
            var ChartTop50FR = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: genreCountG,
                    datasets: [{
                        label: '# of genres',
                        data: genreCountC,
                        backgroundColor: Color,
                        borderColor: ColorB,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
  
          }, 1000);
  
          }
        });
  
  }
  })();




