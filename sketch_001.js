let x = 0;
let spaceData;

function setup() {
  createCanvas(400, 400);

  loadJSON("http://api.open-notify.org/astros.json", gotData);
}
  function gotData(data) {
    //console.log(spaceData.people[2]); 
    spaceData = data;
  }



function draw() {
  background(0);
  randomSeed(4); 
  
  stroke(255);
  line(x, 0, x, height);

  x = x + 1;

    if (spaceData) {

    for (let i = 0; i < spaceData.number; i++) {
      let X = random(width);
      let Y = random(height);
      ellipse(X, Y, 15);
      
      
let spacePeople = spaceData.people[i].name;

      text(spacePeople, X, Y - 10); 
    }
  }




  }





