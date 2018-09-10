import React, { Component } from 'react'
var tree = {
    title: "American Government System",
    childNodes: [
        {title: "Legislative", childNodes: [
            {title: "Congress", childNodes: [
                {title: "Agencies"}
            ]}
        ]},
        {title: "Executive", childNodes: [
            {title: "President", childNodes: [
                {title: "Cabinet", state: true},
                {title: "Exec Office Of The President"},
                {title: "Vice-president"},
                {title: "Independent Agencies", childNodes: [
                    {title: "Agriculture"},
                    {title: "Commerce"},
                    {title: "Defense"},
                    {title: "Education"},
                    {title: "......"}
                ]}
            ]}
        ]},
        {title: "Judicial", childNodes: [
            {title: "Supreme Court", childNodes: [
                {title: "Lower Courts"}
            ]}
        ]}
    ]
}
const h3= {
    "color": "#BF616A"
  }
  ,togglable ={
      "color": "#D78770",
      "cursor": "pointer",
      'margin-left': '0.5em'
  }

  ,togglableupafter = {
    "font-size": "8px",
    "margin-left": "0.5em"
  }
//   togglable-downafter {
//     content: "▼";
//     display: inline-block;
//   }
//   togglable-upafter {
//     content: "▶";
//     display: inline-block;
//   }

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            add: false,
            delete: false,
            rename: false,
            interValue: ''
        };
    }
    toggle(title) {
        this.setState({visible: !this.state.visible});
        this.setState({interValue: title})
    };

    render() {
        var childNodes;

        if (this.props.node.childNodes != null) {
            childNodes = this.props.node.childNodes.map(function(node, index){
                return <li key={index} > <Test node={node}/></li>
            })

            let className1 = 'togglable';
            let className2 = this.state.visible ? 'togglable-down' : 'togglable-up';
            var classNameFinal = className1 + ' ' + className2;
        }

        var style;

        if (!this.state.visible) {
            style = {display: "none"
        };
        } 

        return (
            <div>
                <h5 onClick={()=>{this.toggle(this.props.node.title)}} style={{...togglable, ...togglableupafter, ...style}}>
                    {this.props.node.title}
                </h5>
                <input type='text' value={this.state.interValue}></input>
                <ul style={{...style, ...togglableupafter}}>
                    <input type='text'></input>
                    {childNodes}
                </ul>
            </div>
        )   
    }
}
class Tree extends Component {
    render (){
        return (
            <Test node = {tree}></Test>
        )
    }
}
//导出组件
export default Tree;