let G = 9.8;
let planetRadius = 30;
let moonRadius = 10;

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

    const force = G * 3 / distSq;
    const dist = Math.sqrt(distSq);
    const unitX = dx / dist;
    const unitY = dy / dist;

    return {
        Fx: force * unitX,
        Fy: force * unitY
    };
}


window.onload = function() {
      const canvas = document.getElementById('space');
      const ctx = canvas.getContext('2d');
      const gravitySlider = document.getElementById('gravity-slider');
      const gravityValue = document.getElementById('gravity-value');
      let particles = [];
      let planet = {};
      //particle should have Px Py Vx Vy

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        planet = {x: canvas.width/2, y: canvas.height/2};
        drawParticles();
      }

      //G slider?
      gravitySlider.addEventListener('input', function() {
        G = parseFloat(gravitySlider.value);
        gravityValue.textContent = G.toFixed(1);
    });

      function drawParticles() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, moonRadius, 0, 2 * Math.PI);
          ctx.fillStyle = '#888';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.stroke();
        }
        //draw planet
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planetRadius, 0, 2*Math.PI);
        ctx.fillStyle = '#4588ff';
        ctx.fill();
      }      
      


      //create particle on click
      canvas.addEventListener('click', function(e) {
        console.log('here a');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        particles.push({x, y, vx: 0, vy: 0});
        drawParticles();
      });

      window.addEventListener('resize', resizeCanvas);

      resizeCanvas();


      //TICK!
      function tick(){

        //calculate position
        for (const p of particles){

            //Calculate Acceleration
            if(p.y < canvas.height){
                //super dumb gravity
                p.vy = p.vy + .001
            }
            const grav = gravForceVector(p, planet);
            p.vx += grav.Fx;
            p.vy += grav.Fy;

            //Calculate Position

            p.y += p.vy;
            p.x += p.vx;
            //remove p? out of range
            particles = particles.filter(p => p.x >= 0 && p.x <= canvas.width && p.y >= 0 && p.y <= canvas.height 
                && distance(p, planet) > planetRadius + moonRadius);
        }

        drawParticles()
        requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    };