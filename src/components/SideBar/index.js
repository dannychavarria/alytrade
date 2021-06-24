import React from 'react'
import Selector from './Selector'
import { createUseStyles } from 'react-jss'
import logoSVG from '../../assets/img/Alytrade_Orbe.svg'
import logoPNG from '../../assets/img/Alytrade_Orbe.png'
const useStyles = createUseStyles({
    SideBar: {
        display: "table",
        tableLayout: "auto",
        background: "#070b11",
        width: "100%",
        padding: "-1.5rem",
        height: "100vh",
        minWidth: "273px"
    },
    SideBarUp: {
        display: "table-row",
        height: "20%"
    },
    SideBarDown: {
        display: "float",
        height: "80%"
    },
    Image: {
        display: "table-cell",
        verticalAlign: "middle",
        textAlign: "center",
        paddingTop: "2rem"
    },
    Botonera: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        left: 0,
        width: "108.2%",
    }
})

const SideBar = () => {
    const styles = useStyles()

    return (<div className={styles.SideBar}>
        <div className={styles.SideBarUp}>
            <div className={styles.Image}>
                <img src={logoSVG} height="130" width="130"  alt="logo" />
            </div>
        </div>
        <div className={styles.SideBarDown}>
            <div className={styles.Botonera}>
                <Selector coin="btc" text="Plan Bitcoin" selected />
                <Selector coin="eth" text="Plan Etherium"/>
                <Selector coin="ltc" text="Plan Litecoin"/>
                <Selector coin="dash" text="Plan Dash"/>
                <Selector coin="doge" text="Plan Dogecoin"/>
            </div>
        </div>
    </div>)
}

export default SideBar