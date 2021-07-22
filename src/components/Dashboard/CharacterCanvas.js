import React, { useEffect, useRef } from 'react'

const CharacterCanvas = ({ letra, ...props }) => {
    const canvas = useRef()




    const buildCanvas = () => {
        if (!canvas?.current)
            return
        console.log(canvas)
        const context = canvas.current.getContext('2d')

        context.beginPath();
        context.arc(30, 30, 30, 0, 2 * Math.PI);
        context.fillStyle = '#FFFFFF'
        context.fill()
        context.stroke();
        context.arc(30, 30, 30, 0, 2 * Math.PI);
        context.fillStyle = '#000000'
        context.font = "30px Roboto";

        context.fillText(letra, 20, 40)
    }
    useEffect(() => {
        document.fonts.ready.then(function () {
            // Any operation that needs to be done only after all the fonts
            // have finished loading can go here.
            if (letra)
                buildCanvas()
        });

    }, [letra])
    return (<canvas ref={canvas} {...props} width="60" height="60" style={{ width: '60px', height: '60px' }}></canvas>)
}

export default CharacterCanvas