const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
//the CANVAS RESOLUTION IS 1000 * 600

ctx.fillStyle = 'red';
ctx.fillRect(0,0,10,10);

mapGrid = new Array(200);
for(let i = 0; i < 200; i++){
    col = new Array(200)
    for(let j = 0; j < 200; j++){
        col[j] = (j + i) % 2 === 0 ? 0 : 1
    }

    mapGrid[i] = col
}

console.log(mapGrid);

player_x = 100
player_y = 100
player_theta = 0
camera_height = 2
