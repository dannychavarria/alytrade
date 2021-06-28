import React from 'react'
import { createUseStyles } from 'react-jss'
import * as Components from '../../components'

const useStyles = createUseStyles({
    MainContainer: {
        display: "table",
        width: "100%",
        height: "100%",
        tableLayout: "auto",
        zIndex:-1
    },
    LeftContainer: {
        display: "table-cell",
        width: "20%",
        minWidth: "273px"
    },
    RightContainer: {
        background:"#031621",
        display: "table-cell",
        width: "80%",
        zIndex: 10,
        position: "sticky",
        padding: "1rem 2.5rem 1rem 2.5rem",
        verticalAlign: "top"
    },
    
})

const MainContainer = ({ children }) => {
    const styles = useStyles()
    return (<div className={styles.MainContainer}>
        <div id="leftCont" className={styles.LeftContainer}>
            <Components.SideBar />
        </div>
        <div className={styles.RightContainer}>
            <Components.Dashboard/>
        </div>
    </div>)
}

export default MainContainer