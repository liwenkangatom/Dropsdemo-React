import React, {Component, Fragment} from 'react'
import eventDrops from 'event-drops';
import * as d3 from 'd3';
import Tooltips from '../ToolTips/Tooltips';
<<<<<<< HEAD
import ModalDemo from '../Modal/modal'
const repositories= require('../../data.json')
const repositoriesData = repositories.map(repository => ({
    name: repository.name,
    data: repository.commits,
}));
=======
import store from '../../store';

>>>>>>> ff89af305f1e09345102c53e6db16ac15c42fa85
const demoStyle = {
    width: '90%',
    height: '100px'
}
class Dropsdemo extends Component {
    constructor(props) {
        super(props);
        this.handleRepChange = this.handleRepChange.bind(this);
        store.subscribe(this.handleRepChange);
        this.state = {
            commit: {
                sha: '',
                message: '',
                author: {
                    email: '',
                    name: ''
                },
                date:''
            },
            data: []
        }
    }

    handleRepChange(){
       
        this.setState(() =>({
            data: store.getState().data
        }))
        const repositories= this.state.data;
        const repositoriesData = repositories.map(repository => ({
            name: repository.name,
            data: repository.commits,
        }));

        const tooltip = d3
                .select('.tooltip')

        let drop ={
            date: d => new Date(d.date),
            onMouseOver: commit =>{
                
                tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', 1)
                    .style('left', `${d3.event.pageX - 30}px`)
                    .style('pointer-events', 'auto')
                    .style('top', `${d3.event.pageY + 20}px`);  
                this.setState(() => ({
                    commit: commit,
                }))
            },
            onMouseOut: () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .style('pointer-events', 'none');
            }
        }
        let d2 = {d3,drop}
        const chart = eventDrops(d2)
        d3
        .select('#eventdrops-demo')
        .data([repositoriesData])
        .call(chart);  
    
    }

    componentWillMount() {
        this.setState(() =>({
            data: store.getState().data
        }))
        
    }
    componentDidMount() {
        this.handleRepChange();
    }

    render() {
       
        return (
            <Fragment>
                <div className='drops' id='eventdrops-demo' style={demoStyle}>
                    <ModalDemo></ModalDemo>
                </div>
                <Tooltips commit={this.state.commit} />
            </Fragment> 
        )
    }
}
export default Dropsdemo