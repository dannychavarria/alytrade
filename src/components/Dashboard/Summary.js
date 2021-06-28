import React from 'react'
import ProgressBar from '../ProgressBar'
import { createUseStyles } from 'react-jss'
import * as Colors from '../../constants/colors.json'
import btcPNG from '../../assets/img/btcLogo.png'
import ltcPNG from '../../assets/img/ltcLogo.png'
import dashPNG from '../../assets/img/dashLogo.png'
import alyPNG from '../../assets/img/alyLogo.png'
import usdtPNG from '../../assets/img/usdtLogo.png'
import xrpPNG from '../../assets/img/xrpLogo.png'
import dogePNG from '../../assets/img/dogeLogo.png'

const useStyle = createUseStyles({
    Container: {
        display: 'flex',
        flexFlow: 'column',
        background: Colors.selectorActive,
        borderRadius: "10px",
        padding: "10px"
    },
    summaryData: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: "space-around",
    },
    coinNameText: {
        fontSize: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    summaryTextLabel: {
        color: Colors.smallTextColor,
        fontSize: "0.8rem"
    },
    summaryText: {
        color: Colors.textColor
    },
    summaryContainer: {
        textAlign: "end"
    },
    footerContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    footerText: {
        fontSize: "0.8rem",
        color: Colors.textColor
    }
})

const initialState = {
    coinName: "Plan Bitcoin",
    startDate: "13 May. 2020",
    amountToGain: 4.40975,
    investment: 2.20488,
    symbol: "BTC",
    currentAmount: 2.60581457,
}

const Summary = ({ coinName, currentAmount, startDate, amountToGain, investment, symbol }) => {

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

        return <img src={logo} alt="logo" width="50" height="50" style={{ paddingRight: "10px" }} />
    }

    const style = useStyle()

    const percentage = () => {
        const current = currentAmount ? currentAmount : initialState.currentAmount
        const toGain = amountToGain ? amountToGain : initialState.amountToGain

        return ((current * 100) / toGain).toFixed(2)
    }

    return (<div className={style.Container}>
        <div className={style.summaryData}>
            <div className={style.coinNameText}>
                <span>
                    {coinLogo(symbol ? symbol : initialState.symbol)}
                </span>
                <span>
                    {coinName ? coinName : initialState.coinName}
                </span>
            </div>
            <div className={style.summaryContainer}>
                <span className={style.summaryTextLabel}>Fecha Incio</span><br /><span>{startDate ? startDate : initialState.startDate}</span>
            </div>
            <div className={style.summaryContainer}>
                <span className={style.summaryTextLabel}>Monto a Ganar</span><br /><span>{amountToGain ? `${amountToGain} ${symbol}` : `${initialState.amountToGain} ${initialState.symbol}`}</span>
            </div>
            <div className={style.summaryContainer}>
                <span className={style.summaryTextLabel}>Monto Invertido</span><br /><span>{investment ? `${investment} ${symbol}` : `${initialState.investment} ${initialState.symbol}`}</span>
            </div>
            <div className={style.summaryContainer}>
                <span className={style.summaryTextLabel}>Restante</span><br /><span>{Number(amountToGain) && Number(investment) ? `${amountToGain - investment}` : `${(initialState.amountToGain - initialState.investment).toPrecision(8)} ${initialState.symbol}`}</span>
            </div>
        </div>
        <div>
            <ProgressBar bgcolor={Colors.btcColor} completed={percentage()} />
        </div>
        <div className={style.footerContainer}>
            <div className={style.footerText}>
                {currentAmount ? currentAmount : initialState.currentAmount} {symbol ? symbol : initialState.symbol} / {amountToGain ? amountToGain : initialState.amountToGain} {symbol ? symbol : initialState.symbol}
            </div>
            <div className={style.footerText}>
                Ganado ({`${percentage()} %`})
            </div>
        </div>
    </div>)
}

export default Summary