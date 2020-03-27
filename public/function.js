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
  