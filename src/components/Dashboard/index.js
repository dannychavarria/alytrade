import React from 'react'
import { createUseStyles } from 'react-jss'
import Header from './Header'

const useStyles = createUseStyles({
    DashboardContainer: {
        display: "table",
        width:"100%",
        overflowY: 'scroll',
        verticalAlign: "top"
    }
})

const Dashboard = () => {

    const styles = useStyles()

    return (<div className={styles.DashboardContainer} >
        <Header/>
    </div>)
}

export default Dashboard