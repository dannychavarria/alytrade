import React from 'react'
import { createUseStyles } from 'react-jss'
import btcPNG from '../../assets/img/btcLogo.png'
import ltcPNG from '../../assets/img/ltcLogo.png'
import dashPNG from '../../assets/img/dashLogo.png'
import alyPNG from '../../assets/img/alyLogo.png'
import usdtPNG from '../../assets/img/usdtLogo.png'
import xrpPNG from '../../assets/img/xrpLogo.png'
import dogePNG from '../../assets/img/dogeLogo.png'
import * as Colors from '../../constants/colors.json'
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
        marginTop:"10px",
        padding: "5px",
        fontWeight: "Bold"

    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        '& tr': {
            borderBottom: `solid ${Colors.tableBodyTextColor} 0.01px`
        },
        '& td': {
            padding: "10px 0 10px 0",
            textAlign: "center",
        }
    }

})

const initialState = [
    { date: 'may. 24, 2021', coin: 'btc', percentage: 3, gain: 0.0661464, usd: 1.45 },
    { date: 'may. 24, 2021', coin: 'btc', percentage: 3, gain: 0.0661464, usd: 1.45 },
    { date: 'may. 24, 2021', coin: 'btc', percentage: 3, gain: 0.0661464, usd: 1.45 },
]

const HistoricGrid = ({ data }) => {
    const style = useStyle()
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

    const buildRows = (dat) => {
        let workData = dat ? dat : initialState

        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        console.log("Join in")
        return workData.map((item, index) => {
            return <tr key={index}>
                <td>{item.date}</td>
                <td>{coinLogo(item.coin)}{item.coin}</td>
                <td>{`${item.percentage} %`}</td>
                <td>{item.gain}</td>
                <td>{formatter.format(item.usd)}</td>
            </tr>
        })
    }

    return (
        <div className={style.gridContainer}>
            <span><h2>Historial</h2></span>
            <div>
                <table className={style.table}>
                    <thead>
                        <th>Fecha</th>
                        <th>Moneda</th>
                        <th>Porcentaje</th>
                        <th>Ganancia</th>
                        <th>USD</th>
                    </thead>
                    <tbody>
                        {buildRows(data)}
                    </tbody>
                </table>
            </div>
            <div className={style.footer}>
                <span>Total BTC: 0.0054</span>
                <span>Total USD: $14.03</span>
            </div>
        </div>
    )
}

export default HistoricGrid