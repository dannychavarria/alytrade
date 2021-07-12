import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import * as Components from '../../components'
import { getDashboardInformation } from '../../reducers/DashboardReducer'

const useStyles = createUseStyles({
    MainContainer: {
        display: "table",
        width: "100%",
        height: "100%",
        tableLayout: "auto",
        zIndex: -1
    },
    LeftContainer: {
        display: "table-cell",
        width: "20%",
        minWidth: "273px"
    },
    RightContainer: {
        background: "#031621",
        display: "table-cell",
        width: "80%",
        zIndex: 10,
        position: "sticky",
        padding: "1rem 2.5rem 1rem 2.5rem",
        verticalAlign: "top"
    },

})

const MainContainer = ({ children }) => {
    const dispatcher = useDispatch()
    const userInfo = useSelector(state => state.userInfo)
    const plans = useSelector(state => state?.plans?.length ? state.plans : undefined)

    useEffect(() => {
        dispatcher(getDashboardInformation())
    }, [dispatcher])
    const styles = useStyles()
    return (<div className={styles.MainContainer}>
        <div id="leftCont" className={styles.LeftContainer}>
            <Components.SideBar />
        </div>
        <div className={styles.RightContainer}>
            {plans ? <Components.Dashboard /> : ''}
        </div>
    </div>)
}

export default MainContainer