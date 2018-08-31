import React, {Component, Fragment} from 'react'
import eventDrops from 'event-drops'
import * as d3 from 'd3'
import Tooltips from './ToolTips/Tooltips';
import ModalWrapper from './ModalWrapper'


import * as actions from './DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'


// const repositories= require('../../data.json')

const repositories= [{
                        'name': 'A',
                        'commits': [{
                            'subject': 'Prepare',
                            'content': '12344',
                            "date": "Tue, 23 Jan 2018 15:03:41 "
                        }]
                    }, {
                        'name': 'B',
                        'commits': [{
                            'subject': 'PrepareB',
                            'content': 'BBB',
                            "date": "Tue, 23 Jan 2018 15:03:41 +0100"
                        }]
                    }, {
                        'name': 'C',
                        'commits': [{
                            'subject': 'PrepareC',
                            'content': 'CCC',
                            "date": "Tue, 23 Jan 2018 15:03:41 +0100"
                        }]
                    }]
const repositoriesData = repositories.map(repository => ({
    name: repository.name,
    data: repository.commits,
}));

let line = {
    color : (line, index) => {
        if ( index % 3 === 0 ) {
            return 'rgb(116, 96, 238)'
         } else if ( index % 3 === 1 ) {
           return 'rgb(10, 173, 246)'
         } else {
           return 'rgb(40, 201, 109)'
         }
    }
};

const demoStyle = {
    width: '80%',
}
class Drops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            commit: {
                subject:'',
                content:'',
                date:''
            },
            loading: false,
			visible: false
        }
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      }
    
      handleCancel = () => {
        this.setState({ visible: false });
      }

    componentDidMount() {
        const tooltip = d3
             .select('.tooltip')

        let label= {
            text: row => (`${row.name} (${row.data.length})`)
        }

        let drop ={
            date: d => new Date(d.date),
            onMouseOver: commit =>{
                tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', 1) 
                    .style('pointer-events', 'auto')

                this.setState(() => ({
                    commit,
                }))

                tooltip
                    .style('left', `${d3.event.pageX - 30}px`)
                    .style('top', `${d3.event.pageY + 20}px`);  
            },

            onMouseOut: () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .style('pointer-events', 'none');
            },

            onClick: (commit) => {
                this.setState({
                    visible: true,
                    commit,
                  });
            }

        }

        let d2 = {d3,drop,line,label};
        const chart = eventDrops(d2);
        
        d3
        .select('#eventdrops-demo')
        .data([repositoriesData])
        .call(chart);
    }
    render() {
        const { visible, loading, commit, name } = this.state;
        return (
            <Fragment>
                <div className='drops' id='eventdrops-demo' style={demoStyle}>
                </div>
                <Tooltips commit={commit} />
                <ModalWrapper 
                    visible={visible} 
                    loading={loading}
                    handleOk={this.handleOk} 
                    handleCancel={this.handleCancel} 
                    commit={commit}
                    name={name}
                />

            </Fragment> 
        )
    }
}
export default Drops
function  mapStateToProps(state) {
    return {
        propname: state.event.data
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        addevent: bindActionCreators(actions.addEventAction, Dispatch)
    }
}