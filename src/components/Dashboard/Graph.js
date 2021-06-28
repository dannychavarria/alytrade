import React, { useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import * as Chartjs from 'chart.js'
import * as Colors from '../../constants/colors.json'
Chartjs.Chart.register(...Chartjs.registerables)

const useStyle = createUseStyles({
    graphContainer: {
        display: "flex",
        flexFlow: "column",
        marginTop: "1rem"
    }
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

    const buildGraph = (lab, dat) => {
        const ctx = graph.current.getContext("2d")
        const chart = new Chartjs.Chart(ctx, {
            type: 'line',
            data: {
                labels: lab ? lab : initialState.labels,
                datasets: [{
                    label: false,
                    data: dat ? dat : initialState.data,
                    borderColor: Colors.btcColor,
                    borderWidth: 3,
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    useEffect(() => {
        buildGraph(labels, data)
    }, [labels, data])

    return (<div className={style.graphContainer}>
        <span><h2>Seguimiento BTC</h2></span>
        <div style={{ position: "relative", padding: "5px", marginTop: "10px" }}>
            <canvas id="chart" ref={graph} height="100px" width="500px"></canvas>
        </div>
    </div>
    )
}

export default Graph