import React, {Component} from 'react'
import eventDrops from 'event-drops'
import * as d3 from 'd3'

const chart = eventDrops({d3})
const repositoriesData = [
    {
        name: 'react-test',
        data: [{data: new Date('2018/09/15 11:21:31')}]
    },
    {
        name: 'event-drops',
        data: [{ date: new Date('2014/09/15 13:24:57') } /* ... */]
    },
    {
        name: 'sedy',
        data: [{ date: new Date('2014/09/15 13:25:12') } /* ... */]
    },
    {
        name: 'hello',
        data: [{ date: new Date('2014/09/15 13:25:12') } /* ... */]
    },
    {
        name: 'add',
        data: [{ date: new Date('2014/09/15 13:25:12') } /* ... */]
    },
    {
        name: 'event',
        data: [{ date: new Date('2014/09/15 13:25:12') } /* ... */]
    }
]
const demoStyle = {
    width: '90%',
    height: '100px',

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