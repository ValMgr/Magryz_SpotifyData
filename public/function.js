/** function.js 
 *  All simple function needed in other scripts or used to interact with app
 *  Author: Valentin Magry
 */

// Simple function to get random int between 0 and given max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
// Function to switch between both category: table / Chart
function toggle(target, section){
parent = target.parentElement.parentElement;
    switch (section) {
    case 'graph':
        $(parent).find("canvas").show();
        $(parent).find("table").hide();
        $(parent).find("h3:nth-child(2)").addClass("active-btn");
        $(parent).find("h3:nth-child(1)").removeClass("active-btn");
        
        break;

    case 'table':
        $(parent).find("canvas").hide();
        $(parent).find("table").show();
        $(parent).find("h3:nth-child(2)").removeClass("active-btn");
        $(parent).find("h3:nth-child(1)").addClass("active-btn");

        break;
    
    default:
        break;
    }
}


  // Funtion to create table with 4 column: index, data1, data2 and data3
  // and as many row as needed
  function AddLine(table, index, data1, data2, data3){
    // Creating table from tracks objects       
    var row = table.insertRow(index+1);
    var cell0 = row.insertCell(0)
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
  
    var j = index+1;
    cell0.innerHTML = j;
    cell1.innerHTML = data1;
    cell2.innerHTML = data2;
    cell3.innerHTML = data3;
  }
  
  // Function to draw bar charts, giving: canvas, labels, data, colorBackground and colorBorder
  function DrawChart(ctx, labels, data, colorBackground, colorBorder){
    var newChar = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: '# of genres',
              data: data,
              backgroundColor: colorBackground,
              borderColor: colorBorder,
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
  }
  
  // Function to setup chart content
  // Count genres, associate a color to each, get chart location then draw it
  function CreateChart(GenreArray, chartID){
    var genreCount = [];
    const genre = {
      genre: '',
      count: 0
    }

    // For each occurences in GenreArray array, if doesnt alreay exist, create it, or add 1 to count in genreCount object array
    for(var i=0;i<GenreArray.length;i++){
      if(genreCount.find(element => element.genre == GenreArray[i]) != undefined){
        genreCount.find(element => element.genre == GenreArray[i]).count ++;
      }
      else{
        var newObject = Object.create(genre);
        newObject.genre = GenreArray[i];
        newObject.count = 1;
        genreCount.push(newObject)
      }
    }

    var genreCountG = [];
    var genreCountC = [];
    var Color = [];
    var ColorB = []

    for (let j = 0; j < genreCount.length; j++) {
      genreCountC[j] = genreCount[j].count;
      genreCountG[j] = genreCount[j].genre;

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
  var ctx = document.getElementById('graph_'+chartID).getContext('2d');
  DrawChart(ctx, genreCountG, genreCountC, Color, ColorB);
  }