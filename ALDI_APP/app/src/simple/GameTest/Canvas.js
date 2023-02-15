import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const getPixelRatio = context => {
    var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
    
    return (window.devicePixelRatio || 1) / backingStore;
};

const Canvas = () => {
    let ref = useRef();
     
    useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext('2d');

        let ratio = getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
         
        canvas.width = 500;
        canvas.height = 500;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        let requestId,
            i = 0;
        const render = () => {
            context.beginPath();
            
            context.fillRect(200, 0, 300, 1);

            context.fillRect(20, 50, 55, 100);

            // context.fillRect(100, 100, 2, 100);
            i += 0.05;
            requestId = requestAnimationFrame(render);
        };

        render();

        return () => {
                cancelAnimationFrame(requestId);
            };
    });
    
    return (
        <canvas
            ref={ref} 
            style={{ width: '500px', height: '500px' }}
        />
    );
};
 
 export default Canvas;