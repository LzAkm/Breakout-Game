import {canvas, context} from './canvas.js';
import { draw_circle } from './functions.js';
import { player } from './player.js';
import { blocks } from './block.js';
import { sounds } from './sounds.js';
export {sounds} from './sounds.js';
import { circleCollideWithRectangle } from './functions.js';

export const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    r: 11,
    color: 'white',
    speed: 6,
    speedX: 6,
    speedY: -6,
}

export function update_ball(){
    // déplacement de la balle
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // vérifier que la ball sorte de l'écran qu'en bas
    if(ball.x + ball.r > canvas.width){
        ball.speedX *= -1;
    }  

    if(ball.x - ball.r < 0){
        ball.speedX *= -1;
    }

    if(ball.y - ball.r < 0){
        ball.speedY *= -1;
    } 

    // est ce que la balle touche player ?
    if(ball.x > player.x && ball.x < player.x + player.width && ball.y + ball.r > player.y && ball.y + ball.r < player.y + ball.speedY){
        ball.speedY *= -1;

        // calcul angle de rebond
        let x1 = player.x;
        let x2 = player.x + player.width;
        let d = (ball.x - player.x) / player.width;

        ball.speedX = (d - 0.5) * 2 * ball.speed;

    }
        
    for(let i=0; i < blocks.length; i++){
        let block = blocks[i];

        // est ce qu'on detecte une collision
        if(circleCollideWithRectangle(ball, block)){

            let block_top = block.y;
            let block_left = block.x;
            let block_right = block.x + block.width;
            let block_bottom = block.y + block.height;
    
            let ball_moves_up = ball.speedY < 0;
            let ball_moves_down = ball.speedY > 0;

            // verifie où se trouve la ball par rapport au block
            if(ball.x < block_left && ball.y > block_top && ball.y < block_bottom) ball.speedX *= -1;
            else if(ball.x > block_right && ball.y > block_top && ball.y < block_bottom) ball.speedX *= -1;
            else if(ball.y < block_top && ball.x > block_left && ball.x < block_right) ball.speedY *= -1;
            else if(ball.y > block_bottom && ball.x > block_left && ball.x < block_right) ball.speedY *= -1;

            // On arrive ici, si collision 
            else if(
                ball.x > block_right && ball.y > block_bottom || 
                ball.x < block_left && ball.y > block_bottom ||
                ball.x > block_left && ball.y < block_top ||
                ball.x > block_right && ball.y < block_top
            ) {
                if(ball_moves_down) ball.speedY *= -1;
                if(ball_moves_up) ball.speedX *= -1;
            }

            blocks.splice(i, 1);
            i--;
            sounds.break.play();
        }
    }
} 

export function render_ball(){
    draw_circle(ball.x, ball.y, ball.r, ball.color, true);
}