import { canvas, context } from "./canvas.js";
import { keyboard } from "./input.js";


const PLAYER_HEIGHT = 15;

export const player = {
    x: canvas.width/2 - PLAYER_HEIGHT - 40,
    y: canvas.height - PLAYER_HEIGHT - 6,
    width: 120,
    height: PLAYER_HEIGHT,
    color: 'white',
    speed: 12,
}

export function update_player(){
    context.beginPath();
    if(keyboard.left == true){
        player.x -= player.speed;
    }

    if(keyboard.right == true){
        player.x += player.speed;
    }

    if(player.x <= 0 ){
        player.x = 0;
    }

    if(player.x >= canvas.width - player.width){
        player.x = canvas.width - player.width;
    }
    context.closePath();
}

export function render_player(){
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height)
}