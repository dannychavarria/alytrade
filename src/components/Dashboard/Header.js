import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    container: {
        display: "table",
        width: "100%",
        margin: "1rem 1px 1rem 0",
        alignContent: "top",
        height: "100%",
        textIndent: 0,
    },
    leftSide: {
        display: "table-cell",
        textAlign: "left",
        verticalAlign: "middle",
    },
    rightSide: {
        display: "table-cell",
        textAlign: "right",
        verticalAlign: "middle",
    },
})

const Header = () => {
    const styles = useStyles()
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.beginPath();
        context.arc(30, 30, 30, 0, 2 * Math.PI);
        context.fillStyle = '#FFFFFF'
        context.fill()
        context.stroke(); 
        context.arc(30, 30, 30, 0, 2 * Math.PI);
        context.fillStyle = '#000000'
        context.font = "30px Roboto";
        context.fillText('D',20,40)
        
    }, [])

    return (<div className={styles.container}>
        <div className={styles.leftSide}>
            <span><h1 style={{ margin: 0, fontWeight: "normal" }}>Dashboard</h1></span>
            <span><h5 style={{ margin: 0, fontWeight: "normal" }}>Bienvenido a Alytrade</h5></span>
        </div>
        <div className={styles.rightSide}>
            <canvas width="60" height="60" ref={canvasRef} />
            <h5 style={{ margin: 0, fontWeight: "normal" }}>Danny38</h5>
        </div>
    </div>)
}

export default Header