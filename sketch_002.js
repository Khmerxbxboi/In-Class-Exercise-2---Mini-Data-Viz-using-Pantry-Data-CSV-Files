let weather;

function setup() {
    createCanvas(400, 400);

    loadJSON("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=America%2FLos_Angeles&temperature_unit=fahrenheit", gotData);
}

function gotData(data){
    weather = data;
}

function draw() {
    background(0);

    if (weather) {
        fill(255); 
        textSize(16);
        textAlign(CENTER);

 
        let time = weather.hourly.time[0];
        let temp = weather.hourly.temperature_2m[0];

        text("Time: " + time, width / 2, 100);
        text("Temp: " + temp + "°F", width / 2, 130);

        let ellipseSize = map(temp, 30, 100, 10, 200); 

        fill(temp, 100, 200); 
        ellipse(width / 2, height / 2, ellipseSize);
    }
}
