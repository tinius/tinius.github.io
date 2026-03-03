import React, { useEffect, useState, useRef } from 'react'

import probs from '../../data/bloom_probabilities.json'
import data from '../../data/latest_summary.json'
import * as d3sc from 'd3-scale'
import * as d3a from 'd3-array'

import chroma from 'chroma-js'

const d3 = Object.assign({}, d3a, d3sc)

import { doyToDate, formatDate, formatDateLong } from './utils'

import { utcParse } from "d3-time-format";

const parseUTC = utcParse("%Y-%m-%d");

const cScale = chroma.scale([ '#eaeaea', 'palevioletred' ])
    .domain([ 1, 9, 10 ])

const latest = data.slice(-1)[0]

const LatestDate = () => {

    const svgRef = useRef()
    const [width, setWidth] = useState(300)
    const height = 320

    useEffect(() => {
        if(svgRef.current) {
            setWidth(svgRef.current.getBoundingClientRect().width)
        }
    }, [])

    const padding = {
        top : 40,
        right : 0,
        bottom: 20,
        left : 0
    }


    const yScale = d3.scaleLinear()
        .domain([ 0, d3.max(probs, d => d.prob_percent) ])
        .range([ 0, height - padding.bottom - padding.top ])

    const bw = width/probs.length

    const medianIndex = probs.findIndex(row => {
        return formatDate(parseUTC(row.DATE)) === formatDate(doyToDate(latest.q50))
    })

    const minIndex = probs.findIndex(row => {
        return row.prob_percent >= 0.2
    })

    const maxIndex = probs.length - probs.slice().reverse().findIndex(row => {
        return row.prob_percent >= 0.2
    })

    const q10Index = probs.findIndex(row => {
        return formatDate(parseUTC(row.DATE)) === formatDate(doyToDate(latest.q10))
    })

    const q90Index = probs.findIndex(row => {
        return formatDate(parseUTC(row.DATE)) === formatDate(doyToDate(latest.q90))
    })

    const dates = [ minIndex, q10Index, medianIndex, q90Index, maxIndex ]

    const bars = probs.map((row, i) => {

        return <g transform={`translate(${ bw*i }, 0)`}>
            <rect y={ height - padding.bottom - yScale(row.prob_percent) }
            height={ yScale(row.prob_percent) }
                width={bw - 1} x={0.5} 
                fill={ i >= q10Index && i <= q90Index ? '#EF9798' : '#a9a9a9'}
                fillOpacity={ i === medianIndex ? 1 : 0.3 }
                
                //fill={cScale(row.prob_percent)}


            ></rect>

            { dates.indexOf(i) >= 0 && <g transform={`translate(${bw/2}, ${height - padding.bottom})`}>
                <line y1={0} y2={5} stroke='#767676'></line>
                <text
            className='hist-xlabel'
            y={ 20 }
            >{ formatDate(parseUTC(row.DATE)) }</text>
            </g>
            }
        </g>

    })

    const medianBar = <rect width={bw} x={ bw*medianIndex}
    height={yScale(probs[medianIndex].prob_percent)} y={
        height - padding.bottom - yScale(probs[medianIndex].prob_percent)
    }
    stroke='black' fill='none' strokeWidth={1.5}
    ></rect>

    const medianLabel = <text x={ bw*(medianIndex + 1) + 5 } y={height*0.55}>
        Median
    </text>

    const probLabel = <text x={padding.left} y={ padding.top }
    className='hist-problabel'>
        ↑ More likely
    </text>

    return <div><p className='large'>The current best estimate for peak bloom is <strong>{formatDateLong(doyToDate(latest.q50))}</strong>. The likely range spans from <strong>{formatDateLong(doyToDate(latest.q10))}</strong> to <strong>{formatDateLong(doyToDate(latest.q90))}</strong>.</p>

    <svg width={width} height={height} ref={svgRef} className='hist-svg'>
        {bars}
        {probLabel}
        {medianBar}
        {medianLabel}
    </svg>

    {/* <p className='note'>Updated on { formatDate(parseUTC(latest.forecast_date)) }</p>
    
     */}
    </div>
}

export default LatestDate