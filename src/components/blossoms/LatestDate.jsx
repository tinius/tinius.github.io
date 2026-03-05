import React, { useEffect, useState, useRef } from 'react'

import * as d3sc from 'd3-scale'
import * as d3a from 'd3-array'

import chroma from 'chroma-js'

const d3 = Object.assign({}, d3a, d3sc)

import { doyToDate, formatDate, formatDateLong } from './utils'

import { utcParse } from "d3-time-format";

const parseUTC = utcParse("%Y-%m-%d");

const cScale = chroma.scale([ '#eaeaea', 'palevioletred' ])
    .domain([ 1, 9, 10 ])

const Comparison = ({ data }) => {

    const [ width, setWidth ] = useState(300)
    const svgRef = useRef()
    const height = 152

    const histData = [
        { label : '2026 forecast', doy : data.q50, q10 : data.q10, q90 : data.q90,
            textColor : '#e2777b',
            color : '#EF9798', fw : '500'
         },
    {"label" : '2025', doy : 87, color : '#767676'},
    {"label" : '2024', doy : 77, color : '#767676'},
    {"label" :  '1990-2025 avg.', doy : 91, color : '#000'},
    {"label" : '1921-2025 avg.', doy : 94, color : '#000'}
    ]
    
    useEffect(() => {
        if(svgRef.current) {
        setWidth( svgRef.current.getBoundingClientRect().width )
        }
    }, [])


    const paddingLeft = 120
    const paddingTop = 46

   const xScale = d3.scaleUtc()
        .domain([
        parseUTC("2026-03-15"),
        parseUTC("2026-04-15")
    ]).range([paddingLeft, width])


    const gHeight = 24

    const xTicks = ['2026-03-21', '2026-04-01', '2026-04-11'].map(str => {
        return <g transform={`translate(${ xScale(parseUTC(str)) }, 20)`}>
            <text textAnchor='middle'>{ formatDate(parseUTC(str)) }</text>
        </g>
    })

    const xGs = d3.range(75, 105).map(doy => {
        return <g transform={`translate(${xScale(doyToDate(doy))}, 0)`}>
            <line y1={paddingTop - 18} y2={height} stroke={ [80, 91, 101].indexOf(doy) >= 0 ? '#aaa' : '#eaeaea' }></line>
        </g>
    })

    const gs = histData.map((row, i) => {

        return <g transform={`translate(0, ${gHeight*i + paddingTop})`}>
            <text x={paddingLeft} textAnchor='end'
            fill={row.textColor || row.color}
            style={{ fontWeight : row.fw }}>{row.label}</text>
            
            <line y1={-4} y2={-4} x1={paddingLeft + 7} x2={width} stroke='#dcdcdc'
            style={{ mixBlendMode : 'multiply' }}></line>

             { row.q10 && <rect x={ xScale(doyToDate(row.q10)) }
        fill='#EF9798'
        fillOpacity={0.3}
        height={18}
        y={-14}
        width={ xScale( doyToDate(row.q90)) - xScale(doyToDate(row.q10))} 
        ></rect> }
            
            <circle r={9} cy={-5} cx={ xScale(doyToDate(row.doy)) }
            fill={ row.invert ? 'none' : row.color } stroke={ row.invert ? row.color : 'none' }
            strokeWidth={2}></circle>
        
       

        </g>

    })

    return <svg width={width} height={height} 
    ref={svgRef} className='recent-svg'>
        {xTicks}
        {xGs}
        {gs}
        </svg>

}

const LatestDate = () => {

    const svgRef = useRef()
    const [width, setWidth] = useState(300)
    const height = 320

    const [ data, setData ] = useState(null)
    const [ probs, setProbs ] = useState(null)

    useEffect(() => {

        fetch('https://raw.githubusercontent.com/tinius/peak-bloom-prediction/data/latest_summary.json')
            .then( resp => resp.json() )
            .then( data => setData(data) )

        fetch('https://raw.githubusercontent.com/tinius/peak-bloom-prediction/data/bloom_probabilities.json')
            .then( resp => resp.json() )
            .then( probs => setProbs(probs) )

    }, [])

    useEffect(() => {
        if(svgRef.current) {
            setWidth(svgRef.current.getBoundingClientRect().width)
        }
    }, [data, probs])

    if(!(data && probs)) {
        return <div></div>
    }

    const latest = data.slice(-1)[0]

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

    <p>Here is how the predicted range compares to previous bloom dates:</p>
    <Comparison data={latest} />

    </div>
}

export default LatestDate