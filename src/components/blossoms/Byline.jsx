import React, { useEffect, useState } from 'react'

import { utcParse } from "d3-time-format";

import { doyToDate, formatDate, formatDateLong } from './utils'

const parseUTC = utcParse("%Y-%m-%d");


const Byline = () => {

    const [ data, setData ] = useState(null)

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/tinius/peak-bloom-prediction/data/latest_summary.json')
            .then(resp => resp.json())
            .then( data => setData(data) )
    }, [])


    const latest = data ? data.slice(-1)[0] : null
    const lu = data ? <span>· Last updated <span style={{color: '#EF9798'}}>{ formatDateLong(parseUTC( latest.forecast_date )) }, 2026</span></span> : ''

    return <div className='byline'>
        <span className='date'></span>
        <p className='name'>By Niko Kommenda {lu}</p></div>

}

export default Byline