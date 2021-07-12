import React, { useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import * as Chartjs from 'chart.js'
import * as Colors from '../../constants/colors.json'
import { useDispatch, useSelector } from 'react-redux'
import { getGraphData } from '../../reducers/DashboardReducer'
Chartjs.Chart.register(...Chartjs.registerables)

const useStyle = createUseStyles({
    graphContainer: {
        display: "flex",
        flexFlow: "column",
        marginTop: "1rem"
    },
})

const initialState = {
    labels: [
        'mar. 11 may',
        'mié. 12 may',
        'jue. 13 may',
        'vie. 14 may',
        'lun. 17 may',
        'mar. 18 may',
        'mie. 19 may',
        'jue. 20 may',
        'vie. 21 may',
        'lun. 24 may',
    ],
    data: [12, 19, 3, 5, 2, 3, 7, 8, 9, 10]
}

const Graph = ({ labels, data }) => {
    const style = useStyle()
    const graph = useRef()

    const plan = useSelector(state => state.plans[state.selectedPlan])
    const graphData = useSelector(state => {
        const currencyId = state?.plans[state?.selectedPlan]?.id_currency
        return state?.graphData[currencyId]
    })
    console.log(graphData)
    const buildGraph = () => {
        const container = document.getElementById('chartCont')
        container.innerHTML = null;
        const canvasChart = document.createElement('canvas')
        canvasChart.id = "chart"
        
        canvasChart.style.cssText = null
        container.appendChild(canvasChart)
        const ctx = canvasChart.getContext("2d") //document.getElementById('chart').getContext("2d") //graph.current.getContext("2d")
        const chart = new Chartjs.Chart(ctx, {
            type: 'line',
            data: {
                labels: graphData ? graphData.labels : initialState.labels,
                datasets: [{
                    label: false,
                    data: graphData ? graphData.data : initialState.data,
                    borderColor: Colors.btcColor,
                    borderWidth: 3,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                aspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    useEffect(() => {
        if (graphData)
            buildGraph()
    }, [graphData])

    return (<div className={style.graphContainer}>
        <span><h2>Seguimiento BTC</h2></span>
        <div id="chartCont" style={{ position: "relative", padding: "5px", marginTop: "10px", height: "30vh", width: "70vw" }}>

        </div>
    </div>
    )
}

export default Graph