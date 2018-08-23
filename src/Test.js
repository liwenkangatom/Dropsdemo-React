import React, {Component, Fragment} from 'react'
import eventDrops from 'event-drops'
import * as d3 from 'd3'
import Tooltips from './Tooltips';

const tooltip = d3
    .select('.tooltip');

const chart = eventDrops({
    d3,
    drop: {
        onMouseOver: commit =>{
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 1)
                .style('left', `${d3.event.pageX - 30}px`)
                .style('pointer-events', 'auto')
                .style('top', `${d3.event.pageY + 20}px`);  
            this.setState(() => ({
                commit: commit
            }))
        }
    }
});

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
    constructor(props) {
        super(props);
        this.state = {
            commit: {}
        }
    }
    componentDidMount() {
        d3
        .select('#eventdrops-demo')
        .data([repositoriesData])
        .call(chart);
    }

    render() {
        return (
            <Fragment>
                <div className='drops' id='eventdrops-demo' style={demoStyle}></div>
                <Tooltips commit={this.state.commit} />
            </Fragment> 
        )
    }
}
export default Dropsdemo