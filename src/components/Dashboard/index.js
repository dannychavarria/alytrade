import React from 'react'
import { createUseStyles } from 'react-jss'
import Header from './Header'
import Summary from './Summary'
import Graph from './Graph'
import HistoricGrid from './HistoricGrid'
const useStyles = createUseStyles({
    DashboardContainer: {
        display: "table",
        width: "100%",
        overflowY: 'scroll',
        verticalAlign: "top"
    },
    Row: {
        display: "table-row"
    }
})

const Dashboard = () => {

    const styles = useStyles()

    return (<div className={styles.DashboardContainer} >
        <div className={styles.Row}>
            <Header />
        </div>
        <div className={styles.Row}>
            <Summary/>
        </div>
        <div className={styles.Row}>
            <Graph/>
        </div>
        <div className={styles.Row}>
            <HistoricGrid/>
        </div>
    </div>)
}

export default Dashboard