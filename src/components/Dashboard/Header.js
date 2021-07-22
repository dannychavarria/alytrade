import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/colors.json'
import { logOut } from '../../reducers/DashboardReducer'
import UserMenu from '../UserMenu'
import CharacterCanvas from './CharacterCanvas'
const useStyles = createUseStyles({
    container: {
        display: "flex",
        width: "100%",
        margin: "1rem 1px 1rem 0",
        alignContent: "top",
        height: "100%",
        textIndent: 0,
        justifyContent: 'space-between'
    },
    leftSide: {
        display: "flex",
        textAlign: "left",
        verticalAlign: "middle",
        flexDirection: "column"
    },
    rightSide: {
        display: "flex",
        flexDirection: "column",
    },
    menuContainer: {
        top: "110px",
        right: "10px",
        display: "flex",
        width: "100px",
        flexDirection: 'row',
        borderRadius: '12px',
        background: Colors.selectorActive,
        position: 'absolute',
        padding: "10px",
        border: `1px solid ${Colors.sideBarBg}`,
        ' & strong': {
            '&:hover': {
                background: Colors.tableBodyTextColor,
                cursor: 'pointer'
            }
        }
    }
})

const Header = () => {
    const styles = useStyles()
    const username = useSelector(state => state?.userInfo?.username)
    const canvas = useRef()
    const [state, setState] = useState(false)
    const dispatcher = useDispatch()

    const buildMenu = () => {
        // const container = document.createElement('div')
        // container.className = styles.menuContainer
        // container.id = "menu"
        // const cerrarSesion = document.createElement('strong')
        // cerrarSesion.innerText = "Cerrar Sesión"
        // container.appendChild(cerrarSesion)

        // return container

        return <UserMenu username={username}/>
    }

    const clickHandler = (e) => {
        e.preventDefault()
        console.log("estado",state,!state)
        setState(!state)
    }

    const buildCanvas = (letra) => {
        if(!canvas)
            return

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

    /*useEffect(() => {
        if (username) {
            buildCanvas(username.charAt(0).toUpperCase())
            
        }
    }, [username])*/

    return (<div className={styles.container}>
        <div className={styles.leftSide}>
            <span><h1 style={{ margin: 0, fontWeight: "normal" }}>Dashboard</h1></span>
            <span><h5 style={{ margin: 0, fontWeight: "normal" }}>Bienvenido a Alytrade</h5></span>
        </div>
        <div id="rightSide" className={styles.rightSide}>
            {/*<canvas ref={canvas} width="60" height="60" style={{width:'60px',height:'60px'}}></canvas>*/}
            {username?<CharacterCanvas letra={username.charAt(0).toUpperCase()} width="60" height="60" style={{width:'60px',height:'60px'}} /> : ''}
            <h5 style={{margin:0,fontWeight:"normal",cursor:"pointer"}} onClick={clickHandler}>{username}</h5>
            {state?buildMenu():''}
        </div>
    </div>)
}

export default Header