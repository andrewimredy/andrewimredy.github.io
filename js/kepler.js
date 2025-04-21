const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let x0;
let y0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x0 = canvas.width/2;
    y0 = canvas.height/2;
  }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);



function drawCircle(x, y, radius, colorHex){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx. fillStyle = colorHex;
    ctx.fill();
}

// background
ctx.fillStyle = '#d5deeb';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//draw sun
drawCircle(x0, y0, canvas.width * .05, "#ffae00")


//draw planet #1c69e6
function drawPlanetPolar(r, theta, size, colorHex){
    drawCircle(x0 + r * Math.sin(theta), y0 - r * Math.cos(theta), size, colorHex);
}

let lastE = 0;
const interval = 17; // milliseconds
let angleEarth = 0;

function orbitEarth(time){
    if (time - lastE >= interval) {
        //erase, then draw
        drawPlanetPolar(x0 /1.8, angleEarth, x0 / 30, "#d5deeb");
        drawPlanetPolar(x0 /1.8, angleEarth + .01, x0 / 40, "#1c69e6");
        angleEarth = (angleEarth + 0.01) % (Math.PI * 2); 
        lastE = time; 
    }
    requestAnimationFrame(orbitEarth);
}

let radiusMars = x0/1.2;

let angleM = 0;
let lastM = 0;
function orbitMars(time){
    if (time - lastM >= interval) {
        //erase, then draw
        drawPlanetPolar(radiusMars, angleM, x0 / 30, "#d5deeb");
        drawPlanetPolar(radiusMars, angleM + .007, x0 / 50, "#c24f32");
        angleM = (angleM + 0.007) % (Math.PI * 2); 
        lastM = time; 
    }
    requestAnimationFrame(orbitMars);
}

requestAnimationFrame(orbitEarth);
requestAnimationFrame(orbitMars);


