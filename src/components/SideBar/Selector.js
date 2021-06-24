import React from 'react'
import { createUseStyles } from 'react-jss'

import btcPNG from '../../assets/img/btcLogo.png'
import ltcPNG from '../../assets/img/ltcLogo.png'
import dashPNG from '../../assets/img/dashLogo.png'
import alyPNG from '../../assets/img/alyLogo.png'
import usdtPNG from '../../assets/img/usdtLogo.png'
import xrpPNG from '../../assets/img/xrpLogo.png'
import dogePNG from '../../assets/img/dogeLogo.png'

const useStyles = createUseStyles({
    dobles: {
        width: 0,
        height: "0.5em",
        //marginLeft: "13.5rem",
        borderRight: "1.5em solid transparent",
        borderBottom: "1.1rem solid #000000",
        zIndex: 11,
        position: "sticky",
        left: "110%",
    },
    block: {
        display: "block",
        verticalAlign: "middle",
        textAlign: "center",
        //width: "110%",
        height: "3rem",
        background: "#062131",
        color: "white",
        fontFamily: "Roboto",
        fontSize: "1.2rem",
        position: "sticky",
        zIndex: 11
    },
    blockInactive: {
        display: "block",
        verticalAlign: "middle",
        textAlign: "center",
        //width: "15rem",
        height: "3rem",
        background: "#070b11",
        color: "white",
        fontFamily: "Roboto",
        fontSize: "1.2rem",
        position: "sticky",
        zIndex: 9,

    },
    texto: {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        height: "100%",
        paddingRight: "5rem"
    },
    boton: {
        display: "block",
        margin: "0.5rem 0 0.5rem 0"
    }
})

const Selector = ({ text, selected, coin }) => {

    const styles = useStyles()

    const coinLogo = (c) => {

        let logo = null
        switch (c) {
            case 'btc':
                logo = btcPNG
                break
            case 'ltc':
                logo = ltcPNG
                break
            case 'dash':
                logo = dashPNG
                break
            case 'aly':
                logo = alyPNG
                break
            case 'usdt':
                logo = usdtPNG
                break
            case 'xrp':
                logo = xrpPNG
                break
            case 'doge':
                logo = dogePNG
                break
            default:
                logo = dogePNG
                break
        }

        return <img src={logo} width="50" height="50" style={{paddingLeft:"2rem",paddingRight:"8px"}} />
    }

    return (<div className={styles.boton}>
        {selected ?
            <div className={styles.dobles}>
            </div>
            : ''
        }

        <div className={selected ? styles.block : styles.blockInactive} >
            <div className={styles.texto}>
                {coinLogo(coin)}
                <a href="#">{text ? text : 'Empty'}</a>
            </div>
        </div>
    </div>)
}

export default Selector