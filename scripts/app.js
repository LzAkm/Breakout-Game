import { render_ball, update_ball } from './ball.js';
import {canvas, context} from './canvas.js';
import {update_player, render_player} from './player.js';
import {ball} from './ball.js';
import {create_block, update_blocks, render_blocks} from './block.js';

create_block();

// relancer le jeu via le boutton
document.getElementById("btn").addEventListener("click", function hide(){
    var div = document.getElementById("scorer");

    if (div.style.display === "block") {
    div.style.display = "block";
    } else {
    div.style.display = "block";
    }

    window.location.reload();
})

// lancer le jeu via le boutton
document.getElementById("btn2").addEventListener("click", function start(){
    var div2 = document.getElementById("starter");

    if (div2.style.display === "none") {
    div2.style.display = "block";
    } else {
    div2.style.display = "none";
    }

    frame = requestAnimationFrame(run);

}) 

function update(){
    update_player();
    update_ball();
    update_blocks();

    // afficher la card game over
    if(ball.y - ball.r > canvas.height){
        cancelAnimationFrame(frame);
        var div = document.getElementById("scorer");

        if (div.style.display === "block") {
        div.style.display = "block";
        } else {
        div.style.display = "block";
        }
    }
}


function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    render_player();
    render_ball();
    render_blocks();
}

function run(){
    frame = requestAnimationFrame(run);

    update();
    render();
} 

let frame;