//calc distance between 2 particles
function distance(p1, p2){
    //whos that triangle nigga? pythagoras?
    const dist =  Math.sqrt( (p1.x - p2.x)**2 + (p1.y - p2.y)**2  );
    console.log('Distance : ' + dist);
    return dist;
}

function gravForce(){
    
}

window.onload = function() {
      const canvas = document.getElementById('space');
      const ctx = canvas.getContext('2d');
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

      function drawParticles() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, 2 * Math.PI);
          ctx.fillStyle = '#888';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.stroke();
        }
        //draw planet
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, 30, 0, 2*Math.PI);
        ctx.fillStyle = '#4588ff';
        ctx.fill();
      }      
      


      //create particle on click
      canvas.addEventListener('click', function(e) {
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
            if(p.y < canvas.height){
                //super dumb gravity
                p.vy = p.vy + .1
                p.y = p.y + p.vy
            }
        distance(particles[0], planet);

        }

        //log dist of 1 particle(test)



        drawParticles()
        requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    };