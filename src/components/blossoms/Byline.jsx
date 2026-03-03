import React from 'react'
import data from '../../data/latest_summary.json'
import { utcParse } from "d3-time-format";

import { doyToDate, formatDate, formatDateLong } from './utils'

const parseUTC = utcParse("%Y-%m-%d");

const latest = data.slice(-1)[0]

const Byline = () => {

    return <div className='byline'>
        <span className='date'></span>
        <p className='name'>By Niko Kommenda · Last updated <span style={{color: '#EF9798'}}>{ formatDateLong(parseUTC( latest.forecast_date )) }, 2026</span></p></div>

}

export default Byline