import React, {Component} from 'react'
import eventDrops from 'event-drops'
import * as d3 from 'd3'

let drop ={
    date: d => new Date(d.date)
}
let d2 = {d3,drop}
const d4 = {d3, drop:{
    date: d => new Date(d.date)
}}
console.log(JSON.stringify(d2))
console.log(JSON.stringify(d4))
console.log(Object.is(d2, d4))

const chart = eventDrops(d2)
const repositories= require('./data.json')
const repositoriesData = repositories.map(repository => ({
    name: repository.name,
    data: repository.commits,
}));
const demoStyle = {
    width: '90%',
    height: '100px'
}
class Dropsdemo extends Component {
    componentDidMount() {
        d3
        .select('#eventdrops-demo')
        .data([repositoriesData])
        .call(chart)
    }
    render() {
        return (
            <div className='drops' id='eventdrops-demo' style={demoStyle}></div>
        )
    }
}
export default Dropsdemo