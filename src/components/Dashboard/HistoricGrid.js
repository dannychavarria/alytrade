import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import btcPNG from '../../assets/img/btcLogo.png'
import ltcPNG from '../../assets/img/ltcLogo.png'
import dashPNG from '../../assets/img/dashLogo.png'
import alyPNG from '../../assets/img/alyLogo.png'
import usdtPNG from '../../assets/img/usdtLogo.png'
import xrpPNG from '../../assets/img/xrpLogo.png'
import dogePNG from '../../assets/img/dogeLogo.png'
import * as Colors from '../../constants/colors.json'
import { useSelector } from 'react-redux'
const useStyle = createUseStyles({
    gridContainer: {
        display: "flex",
        flexFlow: "column",
        marginTop: "1rem"
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        background: Colors.selectorActive,
        marginTop: "10px",
        padding: "5px",
        fontWeight: "Bold"

    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        '& tbody': {
            '&:before':{
                content: '"-"',
                lineHeight:"0.8rem",
                display:"block",
                color:"transparent"
            }
        },
        '& tbody>tr': {
            borderBottom: `solid ${Colors.tableBodyTextColor} 0.01px`,
            color: Colors.tableBodyTextColor
        },
        '& td': {
            padding: "10px 0 10px 0",
            textAlign: "center",
        }
    }

})

const initialState = [
    { date: 'may. 24, 2021', currency: 'btc', percentage: 99, amount: 0.0661464, gainUsd: 1.45 },
]

const HistoricGrid = ({ data }) => {
    const style = useStyle()
    const plan = useSelector(state => state.plans[state.selectedPlan])
    const interest = useSelector(state => state.plans[state.selectedPlan].interests)
    const coinLogo = (c) => {

        let logo = null
        switch (c.toLowerCase()) {
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

        return <img src={logo} alt="logo" width="15" height="15" style={{ paddingRight: "5px" }} />
    }
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    const buildRows = (dat) => {
        let workData = dat ? dat : initialState

        /*amount(pin): 0.12
        date(pin): "2021-08-09"
        currency(pin): "BTC"
        percentage(pin): 33.33
        gainUsd(pin): 3945.372829573997 */

        
        console.log("Join in")
        return workData.map((item, index) => {
            return <tr key={index}>
                <td>{item.date}</td>
                <td>{coinLogo(item.currency)}{item.currency}</td>
                <td>{`${item.percentage} %`}</td>
                <td>{item.amount}</td>
                <td>{formatter.format(item.gainUsd)}</td>
            </tr>
        })
    }

    console.log("interest", interest)
    return (
        <div className={style.gridContainer}>
            <span><h2>Historial</h2></span>
            <div>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Moneda</th>
                            <th>Porcentaje</th>
                            <th>Ganancia</th>
                            <th>USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildRows(interest)}
                    </tbody>
                </table>
            </div>
            <div className={style.footer}>
                <span>Total BTC: {plan.current}</span>
                <span>Total USD: {formatter.format(plan.currentUsd)}</span>
            </div>
        </div>
    )
}

export default HistoricGrid