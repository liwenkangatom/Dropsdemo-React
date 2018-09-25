import React, {Component, Fragment} from 'react';
import eventDrops from 'event-drops';
import * as d3 from 'd3';
import Tooltips from './ToolTips/Tooltips';
import ModalWrapper from './ModalWrapper';
import * as actions from './DropsRedux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { generateList, humanizeDate } from '../Common/utils';
import { DisplayWrapper, Number, Text, EventDrops } from './style';
import _default from 'antd/lib/date-picker';

let tooltip;
let drop;
let chart;
let zoom;
let numberCommitsContainer;
let zoomStart;
let zoomEnd;

// 行颜色
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
//获取所选标签下的所有事件
const getshowdata = (selectedKeys, eventtag, data, gdata) =>{
    let showdata =[];
    selectedKeys.forEach((key) => {
        let showdateitem = {
            name:'',
            commits:[]
        }
        gdata.forEach((tag) => {

            if(tag.key == key){
                showdateitem.name = tag.title 
            }
        })
        eventtag.forEach((item) => {
            if(item.tagkey == key){
                const eventkey = item.eventkey
                data.forEach((value) => {
                    if(value.key === eventkey){
                        showdateitem.commits.push(value)
                    }
                })
            } 
        })
        showdata.push(showdateitem)
    })
    return showdata;
}

const demoStyle = {
    width: '80%',
    position: 'absolute',
    margin: '64px auto'
}


class Drops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commit: {
                subject:'',
                content:'',
                date:''
            },
            loading: false,
            visible: false,

        }
    }

    updateCommitsInformation = chart => {
        const filteredData = chart
            .filteredData()
            .reduce((total, repo) => total.concat(repo.data), []);

        numberCommitsContainer.innerText = filteredData.length;
        zoomStart.innerText = humanizeDate(chart.scale().domain()[0]);
        zoomEnd.innerText = humanizeDate(chart.scale().domain()[1]);
    };
    

    //事件展示
    show = () =>{
        const repositories = getshowdata(this.props.selectedKeys, this.props.eventtag, this.props.data, this.props.gdata );
        const repositoriesData = repositories.map(repository => ({
            name: repository.name,
            data: repository.commits,
        }));
        
        drop ={
            date: d => new Date(d.date),
            onClick: () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .style('pointer-events', 'none');
                this.setState({
                    visible: true,
                });
            },

            onMouseOver: commit =>{
                tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', 1) 
                    .style('pointer-events', 'auto')
        
                this.props.getShowCommit(commit);
                // console.log(this.props.siderwidth)
                tooltip
                    .style('left', `${d3.event.pageX - 60 - this.props.siderwidth}px`)
                    .style('top', `${d3.event.pageY -200}px`);  
            },
        
            onMouseOut: () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .style('pointer-events', 'none');
            }
        }
        
        let d2;
        if(chart === undefined){
            d2 = {d3,drop,line,zoom}
        } else {
            const range = {
                start: chart.scale().domain()[0],
                end: chart.scale().domain()[1]
            }
            d2 = {d3,drop,line,zoom,range}
        } 
        console.log('chart: ',chart)
        // let d2 = {d3,drop,line,zoom};

        chart = eventDrops(d2);
        d3
        .select('#eventdrops-demo')
        .data([repositoriesData])
        .call(chart);
        this.updateCommitsInformation(chart);
    }

    handleOk = () => {
        if(this.props.showtags.length > 0){
            this.setState({ loading: true });
            this.props.changeCommit(this.props.changecommit,this.props.showtags); 
            setTimeout(() => {
            this.setState({ loading: false, visible: false });
            }, 3000);
        }  
    }

    
    handleCancel = () => {
        this.setState({ visible: false });
    }


    handleDelete = () => {
        this.props.deleteEvent(this.props.changecommit.key);
        this.setState({ visible: false });
    }

    componentDidUpdate() {
        this.show();
    }

    componentDidMount(){
        zoom = {
            onZoomEnd: () => this.updateCommitsInformation(chart),
        };
        tooltip = d3.select('.tooltip');

        numberCommitsContainer = document.getElementById('numberCommits');
        zoomStart = document.getElementById('zoomStart');
        zoomEnd = document.getElementById('zoomEnd');
        this.show();
    }

    render() {
        const { visible, loading, commit } = this.state;
        return (
            <Fragment>
                <DisplayWrapper>
                    <div>
                        <Number id="numberCommits"></Number>
                        <Text className="deep"> events</Text>
                        <Text className="shallow"> found between</Text>
                    </div>
                    <div>
                        <Text className="deep" id="zoomStart"></Text>
                        <Text className="shallow"> and </Text>
                        <Text className="deep" id="zoomEnd"></Text>
                    </div>
                </DisplayWrapper>
                <EventDrops className='drops' id='eventdrops-demo' style={demoStyle}></EventDrops>
                <Tooltips />
                <ModalWrapper 
                    visible={visible} 
                    loading={loading}
                    handleOk={this.handleOk} 
                    handleCancel={this.handleCancel} 
                    handleDelete={this.handleDelete}
                    commit={commit}
                />
            </Fragment> 
        )
    }
}

function  mapStateToProps(state) {
    console.log("redux:",state.home.event)
    console.log("state:",state)
    console.log('gdata:',state.home.treebar.gData)
    return {
        selectedKeys: state.home.treebar.selectedKeys,
        data: state.home.event.data,
        eventtag: state.home.event.eventtag,
        gdata: state.home.treebar.gData,
        changecommit: state.home.event.changecommit,
        showtags: state.home.event.showtags,
        siderwidth: state.home.treebar.siderwidth,
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getShowCommit: bindActionCreators(actions.getShowCommit,Dispatch),
        changeCommit: bindActionCreators(actions.changeCommit,Dispatch),
        deleteEvent: bindActionCreators(actions.deleteEvent,Dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drops);