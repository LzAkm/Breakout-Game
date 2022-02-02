import { context, canvas } from "./canvas.js";

export const blocks = [];

const block_col = 5;
const block_row = 4;
const block_width = 100;
const block_height = 25;
const block_gap = 10;

const x_spacing = (canvas.width - (block_col * (block_width + block_gap))) / 2;

export function create_block(){
    for(let i=0; i < block_col; i++){
        for(let j=0; j < block_row; j++){
            blocks.push({
                x: x_spacing + i * block_width + i * block_gap,
                y: block_gap + j * block_height + j * block_gap,
                width: block_width,
                height: block_height,
                color: '#f3a81c'
            });
        }
    }
}

export function update_blocks(){}

export function render_blocks() {
    for(let i=0; i < blocks.length; i++){
        let block = blocks[i];

        context.fillStyle = block.color;
        context.fillRect(block.x, block.y, block.width, block.height);
    }
}