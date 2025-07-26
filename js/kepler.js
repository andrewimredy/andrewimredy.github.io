let G = 9.8;
let planetRadius = 30;
let moonRadius = 10;

let dragCurrent = null;
let despawn = false;

const moonColors = ['darkorange', 'lightblue', 'slategray', 'rosybrown', 'darkgrey', 'grey', 'aliceblue', 'tan'];


//calc distance between 2 particles
function distance(p1, p2){
    //whos that triangle nigga? pythagoras?
    const dist =  Math.sqrt( (p1.x - p2.x)**2 + (p1.y - p2.y)**2  );
    console.log('Distance : ' + dist);
    return dist;
}

function gravForce(p1, p2){
    //GMm is a constant hehe
    return G * 10 / (distance(p1, p2)**2) ;

    //this returns a scalar. force is a vector.
    //break down to component x and y?
}

function gravForceVector(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distSq = dx * dx + dy * dy;

    if (distSq === 0) return {Fx: 0, Fy: 0}; // avoid division by zero

    const force = G * 7 / distSq;
    const dist = Math.sqrt(distSq);
    const unitX = dx / dist;
    const unitY = dy / dist;

    return {
        Fx: force * unitX,
        Fy: force * unitY
    };
}


window.onload = function() {
    //particle should have Px Py Vx Vy
    let particles = [];
    let planet = {};

    const canvas = document.getElementById('space');
    const ctx = canvas.getContext('2d');
    const gravitySlider = document.getElementById('gravity-slider');
    const gravityValue = document.getElementById('gravity-value');
    const despawnRadio = document.getElementById('despawn'); 
    document.getElementById('clear-button').addEventListener('click', () => {particles = []});
    despawnRadio.addEventListener('change', function() {
        despawn = this.checked;
    });


    // Set initial slider value and position
    gravitySlider.value = 25; // Set slider to 9.8
    gravityValue.textContent = (25).toFixed(1); 
    G = 25; /

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        planet = {x: canvas.width / 2, y: canvas.height / 2};
        drawParticles();
    }

    //G slider?
    gravitySlider.addEventListener('input', function() {
        G = parseFloat(gravitySlider.value);
        gravityValue.textContent = G.toFixed(1);
    });

    function drawParticles() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            const gradient = ctx.createRadialGradient(p.x - 3, p.y - 3, 2, p.x, p.y, moonRadius);
            gradient.addColorStop(0, 'lightgrey');
            gradient.addColorStop(1, p.color);

            ctx.beginPath();
            ctx.arc(p.x, p.y, moonRadius, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // Draw the planet
        const gradient = ctx.createRadialGradient(planet.x - 10, planet.y - 10, 10, planet.x, planet.y, planetRadius);
        gradient.addColorStop(0, 'lightgrey');
        gradient.addColorStop(1, '#4588ff');

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planetRadius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw an arrow pointing toward dragStart
        if (isDragging && dragStart && dragCurrent) {
            const fromX = dragCurrent.x;
            const fromY = dragCurrent.y;
            const toX = dragStart.x;
            const toY = dragStart.y;

            // Draw shaft
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw arrowhead
            const headLength = 10; // Length of the arrowhead
            const angle = Math.atan2(toY - fromY, toX - fromX);

            ctx.beginPath();
            ctx.moveTo(toX, toY);
            ctx.lineTo(
                toX - headLength * Math.cos(angle - Math.PI / 6),
                toY - headLength * Math.sin(angle - Math.PI / 6)
            );
            ctx.moveTo(toX, toY);
            ctx.lineTo(
                toX - headLength * Math.cos(angle + Math.PI / 6),
                toY - headLength * Math.sin(angle + Math.PI / 6)
            );
            ctx.stroke();
        }
    }


    let isDragging = false;
    let dragStart = null;

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dragStart = { x, y };
        isDragging = true;
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        dragCurrent = { x, y };
    });

canvas.addEventListener('mouseup', function(e) {
    if (!isDragging) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const vx = (dragStart.x - x) * 0.01;
    const vy = (dragStart.y - y) * 0.01;

    const color = moonColors[Math.floor(Math.random() * moonColors.length)];

    particles.push({ x: dragStart.x, y: dragStart.y, vx, vy, color: color});

    isDragging = false;
    dragStart = null;
    dragCurrent = null;
});


    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    //TICK!
    function tick() {
        //calculate position
        for (const p of particles) {
            //Calculate Acceleration
            if (p.y < canvas.height) {
                //super dumb gravity
                //p.vy = p.vy + 0.001;
            }
            const grav = gravForceVector(p, planet);
            p.vx += grav.Fx;
            p.vy += grav.Fy;

            //Calculate Position
            p.y += p.vy;
            p.x += p.vx;
            //remove p on collision w planet
            particles = particles.filter(p => distance(p, planet) > planetRadius + moonRadius);
            if(despawn){
                particles = particles.filter(p => p.x >= 0 && p.x <= canvas.width && p.y >= 0 && p.y <= canvas.height);
            }
        }

        drawParticles();
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
};