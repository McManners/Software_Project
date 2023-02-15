import React from 'react';
import './game.css';
import Canvas from './Canvas';



const Game = () => {

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
      }

    return (
        <div className='Game_Container'>

            <div className='Game_Main'>
                <Canvas />
            </div>

        </div>
    )
}

export default Game;