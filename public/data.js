// Function for TOP 50 FR - not yet based on user location but the idea is to get user location and got top 50 of his country
(function() {
// Check if connected (If token is available)
if(token != undefined){

  var top50FR;

    // Setup playlist template
    var playlistSource = document.getElementById('playlist-template').innerHTML,
        playlistTemplate = Handlebars.compile(playlistSource),
        playlist0Placeholder = document.getElementById('top50FR');

    // Get top 50 France playlist
    $.ajax({
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(response) {
          top50FR = response;
          playlist0Placeholder.innerHTML = playlistTemplate(top50FR);

          // Creating playlist array with tracks object
          var tracks;
          var allGenres = [];
          for (var i = 0; i < response.tracks.total; i++) {

              // For each track, get artist genre and add them to allGenres[]
              id = response.tracks.items[i].track.artists[0].id;
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
                    tracksName: response.tracks.items[i].track.name,
                    tracksAlbum: response.tracks.items[i].track.album.name,
                    tracksArtist: response.tracks.items[i].track.artists[0].name
                };

              // Creating table from tracks objects
              var table = document.getElementById("table_"+response.id);
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

          var ctx = document.getElementById('graph_'+response.id).getContext('2d');
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

        }, 500);

        }
      });

}
})();

// Function for Top 50 World
(function() {
  // Check if connected (If token is available)
  if(token != undefined){
  
    var top50World;
  
      // Setup playlist template
      var playlistSource = document.getElementById('playlist-template').innerHTML,
          playlistTemplate = Handlebars.compile(playlistSource),
          playlist0Placeholder = document.getElementById('top50World');
  
      // Get top 50 World playlist
      $.ajax({
          url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          success: function(response) {
            top50World = response;
            playlist0Placeholder.innerHTML = playlistTemplate(top50World);
  
            // Creating playlist array with tracks object
            var tracks;
            var allGenres = [];
            for (var i = 0; i < response.tracks.total; i++) {
  
                // For each track, get artist genre and add them to allGenres[]
                id = response.tracks.items[i].track.artists[0].id;
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
                      tracksName: response.tracks.items[i].track.name,
                      tracksAlbum: response.tracks.items[i].track.album.name,
                      tracksArtist: response.tracks.items[i].track.artists[0].name
                  };
  
                // Creating table from tracks objects
                var table = document.getElementById("table_"+response.id);
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
            var ctx = document.getElementById("graph_"+response.id).getContext('2d');
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
  
          }, 500);
  
          }
        });
  
  }
  })();




