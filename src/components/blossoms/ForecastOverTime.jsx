import React, { useState, useEffect, useRef } from 'react'
import * as d3sc from 'd3-scale'
import * as d3sh from 'd3-shape'
import * as d3a from 'd3-array'
import { utcParse } from "d3-time-format";

import { doyToDate, formatDate } from './utils'

const d3 = Object.assign({}, d3a, d3sc, d3sh)

const parseUTC = utcParse("%Y-%m-%d");

//import dataIn from '../../data/latest_summary.json'


const Forecast = ({}) => {

    const [ dataIn, setDataIn ] = useState(null)
    const [ width, setWidth ] = useState(300)
    const height = 480

    useEffect(() => {

        fetch('https://raw.githubusercontent.com/tinius/peak-bloom-prediction/data/latest_summary.json')
            .then(resp => resp.json())
            .then( arr => setDataIn(arr) )

    }, [])

    useEffect(() => {

        if(svgRef.current) {
            setWidth(svgRef.current.getBoundingClientRect().width)
        }

    }, [dataIn])

    const svgRef = useRef()
    
    if(!dataIn) {
        return <div></div>
    }

    const data = dataIn.map(row => {
        return { ...row, forecast_date : parseUTC(row.forecast_date) }
    })

    const padding = {
        top: 40,
        right : 20,
        bottom: 45,
        left : 60
    }

   const xScale = d3.scaleUtc()
        .domain([
    parseUTC("2026-02-18"),
    parseUTC("2026-04-16")
  ])
        .range([padding.left, width - padding.right]);

    const yScale = d3.scaleLinear()
        .domain([68, 105])
        .range([ height - padding.bottom, padding.top ])

    const line = d3.line()
        .x(d => xScale(d.forecast_date))
        .y(d => yScale(d.q50))

    const area = d3.area()
        .x(d => xScale(d.forecast_date))
        .y0(d => yScale(d.q10))
        .y1(d => yScale(d.q90))

    const xGs = [ "2026-02-19", '2026-03-01', '2026-03-15', '2026-03-31', '2026-04-15'].map( dateStr => {

        const d = parseUTC(dateStr)

        return <g transform={`translate(${xScale(d)}, 0)`}>
            <line y1={padding.top} y2={height - padding.bottom} stroke='#dcdcdc'></line>
            <text y={ height - padding.bottom + 17 }
            className='xlabel'
            >{formatDate(d)}</text>
        </g>

    })

    const yGs = [ 70, 80, 90, 100 ].map(doy => {
        return <g transform={`translate(0, ${ yScale(doy) })`}>
            <line x1={padding.left} x2={width - padding.right + 5} stroke='#dcdcdc'></line>
            <text x={padding.left - 5} y={5} className='ylabel'>{ formatDate(doyToDate(doy)) }</text>
        </g>
    })

    const yTitle = <text x={0} y={22}
    className='ytitle'>↑ Predicted peak bloom</text>
    const xTitle= <text x={padding.left + (width - padding.left - padding.right)*0.45} y={ height - padding.bottom + 42 }
    className='xtitle'>Forecast issued →</text>

    const latest = data.slice(-1)[0]
    const medianLabel = <text x={xScale(latest.forecast_date) + 5} y={ yScale(latest.q50) + 5 }
    className='fc-median-label'>{formatDate( doyToDate(latest.q50) )}</text>

console.log(data)

    return <div className='fc-wrapper'>
        <svg ref={svgRef} width={width} height={height} className='fc-svg'
        >
            {xGs}
            {xTitle}
            {yGs}
            {yTitle}
            <path d={area(data)} className='fc-range'></path>
            <path d={line(data)} className='fc-median'></path>
            {medianLabel}
        </svg>
    </div>

}

export default Forecast