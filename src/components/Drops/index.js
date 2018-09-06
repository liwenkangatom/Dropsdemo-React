import React, {Component, Fragment} from 'react'
import eventDrops from 'event-drops'
import * as d3 from 'd3'
import Tooltips from './ToolTips/Tooltips';
import ModalWrapper from './ModalWrapper'
import * as actions from './DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

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

const getshowdata = (selectedKeys, eventtag, data, gdata) =>{
    let showdata =[];

    selectedKeys.forEach((key) => {
        let showdateitem = {
            name:'',
            commits:[]
        }
        gdata.forEach((tag) => {
            if(tag.key === key){
                showdateitem.name = tag.title
            }
        })
        eventtag.forEach((item) => {
            if(item.tagkey === key){
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
/* 
const getshowdata = (selectedKeys, data) =>{
    let showdata =[];
    selectedKeys.forEach((key) => {
        data.forEach((item) => {
            if(item.key === key){
                showdata.push(item);
            }
        })
    })
    return showdata;
}
 */
const demoStyle = {
    width: '80%',
    position: 'absolute',
    marginTop: '64px',
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
			visible: false
        }
    }


    //事件展示
    show = () =>{

        let dataList = [];
        const generateList = (data) => {
          for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const key = node.key;
            dataList.push({ key, title: node.title });
            if (node.children) {
              generateList(node.children, node.key);
            }
          }
        };

        generateList(this.props.gdata);

        const repositories = getshowdata(this.props.selectedKeys, this.props.eventtag, this.props.data, dataList );
        const tooltip = d3
        .select('.tooltip')
    
        const repositoriesData = repositories.map(repository => ({
        name: repository.name,
        data: repository.commits,
        }));
    
        let drop ={
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
        
            
    
        }


        let range = {
            start: {},
            end: {}
        }
    
        let d2 = {d3,drop,line};
        const chart = eventDrops(d2);
    
        d3
        .select('#eventdrops-demo')
        .data([repositoriesData])
        .call(chart);
        console.log("de",chart)
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


    componentDidUpdate(){
        this.show();
    }

    render() {
        const { visible, loading, commit } = this.state;
        return (
            <Fragment>
                <div className='drops' id='eventdrops-demo' style={demoStyle}>
                </div>
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
    return {
        selectedKeys: state.tag.selectedKeys,
        data: state.event.data,
        eventtag: state.event.eventtag,
        gdata: state.tag.gData,
        changecommit: state.event.changecommit,
        showtags: state.event.showtags
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getShowCommit: bindActionCreators(actions.getShowCommit,Dispatch),
        changeCommit: bindActionCreators(actions.changeCommit,Dispatch),
        deleteEvent: bindActionCreators(actions.deleteEvent,Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drops);