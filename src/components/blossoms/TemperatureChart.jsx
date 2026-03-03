import React, { useEffect, useState, useRef } from 'react'
import * as d3sc from 'd3-scale'
import * as d3sh from 'd3-shape'
import * as d3a from 'd3-array'
import { utcParse } from "d3-time-format";

import data from '../../data/temps.json'
import climRaw from '../../data/climatology.json'


import { doyToDate, formatDate } from './utils'

const d3 = Object.assign({}, d3a, d3sc, d3sh)

const parseUTC = utcParse("%Y-%m-%d");


const clim = climRaw.map(row => {
    return {
        date : doyToDate(row.doy),
        tempF : row.mean
    }
})

console.log(clim)

const TemperatureChart = () => {

    const [ width, setWidth ] = useState(300)
    const height = 400
    const padding = {
        top : 50,
        right: 0,
        bottom: 30,
        left : 65
    }

    const svgRef = useRef()

    const xScale = d3.scaleUtc()
        .domain([
            parseUTC("2026-01-31"),
            parseUTC("2026-04-16")
        ])
    .range([padding.left, width - padding.right]);

    const yScale = d3.scaleLinear()
        .domain([18, 82])
        .range([ height - padding.bottom, padding.top ])

    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.tempF))

    useEffect(() => {

        if(svgRef.current) {
            setWidth(svgRef.current.getBoundingClientRect().width)
        }

    }, [])

    const yGs = [ 20, 30, 40, 50, 60, 70, 80 ].map(deg => {
        return <g transform={`translate(0, ${ yScale(deg) })`}>
            <line x1={padding.left - 5} x2={width} stroke='#dcdcdc'></line>
            <text y={5} x={ padding.left - 10 }
            className='ylabel'>{deg}{ deg === 90 ? 'F' : '' }</text>
        </g>
    })

    const xGs = [ '2026-02-01', '2026-02-15',
        '2026-03-01', '2026-03-15',
        '2026-04-01', '2026-04-15'
     ].map(dateStr => {

        return <g transform={`translate(${ xScale( parseUTC(dateStr) ) }, 0)`}>
            <line y1={height - padding.bottom} y2={ padding.top } stroke='#dcdcdc'></line>
        <text y={ height - padding.bottom + 18 }
        className='xlabel'>{formatDate(parseUTC(dateStr))}</text>
       </g>

    })

    const lines = data.map(arr => {

        return <path d={ line(arr.map((row => {

            return { ...row, date : parseUTC(row.date) }

        }))) } stroke='#EF9798' strokeWidth='2' strokeOpacity='0.15' fill='none'></path>

    })

    const climLine = <path d={ line(clim) } stroke='#555' strokeWidth={2}
    fill='none'></path> 

    const possEntry = data[0][35]

    const possLabel = <text x={xScale(parseUTC(possEntry.date))} y={ yScale(possEntry.tempF) - 10 }
    className='poss-label'>Simulated 2026 paths</text>

    const avgLabel = <text x={xScale(parseUTC('2026-04-14'))} y={ yScale(55) + 28 }
    className='avg-label'>1990-2025 avg.</text>

    const yTitle = <text x={0} y={30} className='ytitle'>
        ↑ Daily mean temperature (°F)
    </text>

    return <svg width={width} height={height} ref={svgRef} className='temp-svg'>
        {yGs}
        {xGs}
        {yTitle}
        { lines }
        { climLine }
        { possLabel }
        { avgLabel }
    </svg>

}

export default TemperatureChart