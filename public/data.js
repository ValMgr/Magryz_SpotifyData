var top50FR;
var top50User;
var top50World;


(function() {
      
if(token != undefined){



    var playlistSource = document.getElementById('playlist-template').innerHTML,
        playlistTemplate = Handlebars.compile(playlistSource),
        playlist0Placeholder = document.getElementById('top50FR');

    // Get top 50 France tracks
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

          // Set delay to make sure that 'allGenre' array are fill up

          var genreCount = [];
          const genre = {
            genre: '',
            count: 0
          }

          setTimeout(() => {
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

              var r = getRandomInt(255);
              var g = getRandomInt(255);
              var b = getRandomInt(255);


              var rgba = 'rgba('+r+','+g+','+b+', 0.2)';
              var rgbaB = 'rgba('+r+','+g+','+b+', 1)';

              Color.push(rgba);
              ColorB.push(rgbaB);
            
            }



          // Creating graph from Genres array
          var ctx = document.getElementById(response.id).getContext('2d');
          var myChart = new Chart(ctx, {
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function toggle(target, section){

  parent = target.parentElement.parentElement;
    switch (section) {
      case 'graph':
        $(parent).find("canvas").show();
        $(parent).find("table").hide();
        $(parent).find("h3").toggleClass("active-btn");

        break;

      case 'table':
        $(parent).find("canvas").hide();
        $(parent).find("table").show();
        $(parent).find("h3").toggleClass("active-btn");


        break;
    
      default:
        break;
    }
}


