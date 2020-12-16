import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import Navbar from './NavbarComponent.js';
import ProfPic from './ProfPic.js';
import $ from 'jquery'
var config = require('./Config.js')

class GraphVisualizer extends Component {
  constructor() {
    super();
    let data = {
      nodes: [{id: 'k', color: "White", size: 1 }],
      links: []
    };

   
    var request = $.post(config.serverUrl + '/user/' + localStorage.getItem('user') + '/get');
    request.done((result) => {
      const reactRef = this;
      let modData = { ...reactRef.state.data };
      let selectNode = modData.nodes.push({ id: localStorage.getItem('user'), name: result.first_name});
      reactRef.setState({ data: modData });
      });
    
    this.state = {
      data: data
    };
  }

  
  componentWillMount() {
    var request = $.post(config.serverUrl + '/friends');
    request.done((result) => {
      result.forEach((user) => {
        var request2 = $.post(config.serverUrl + '/user/' + user + '/get');
        request2.done((result2) => {
        const reactRef = this;
        let modData = { ...reactRef.state.data };
        let selectNode = modData.nodes.push({ id: user, name: result2.first_name});
        selectNode = modData.links.push({ source: user, target: localStorage.getItem('user'), color: "Blue" });
        reactRef.setState({ data: modData });
      });

    });

    });

    var request = $.post(config.serverUrl + '/affiliations/getaffiliates');
    request.done((result) => {
      result.forEach((user) => {
        var request2 = $.post(config.serverUrl + '/user/' + user + '/get');
        request2.done((result2) => {
        const reactRef = this;
        let modData = { ...reactRef.state.data };
        let selectNode = modData.nodes.push({ id: user, name: result2.first_name});
        selectNode = modData.links.push({ source: user, target: localStorage.getItem('user'), color: "Red" });
        reactRef.setState({ data: modData });
      });

    });

    });

  }

  render() {
    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used
    const myConfig = {
      nodeHighlightBehavior: true,
      height: window.innerHeight - 170,
      width: window.innerWidth - 40,
      node: {
        color: "lightgreen",
        size: 600,
        highlightStrokeColor: "blue",
        fontSize: 14,
        highlightFontSize: 17,
        labelProperty: n => (n.name)
      },
      link: {
        highlightColor: "lightblue"
      }, d3: {
        gravity: -100,
        linkLength: 150
      }
    };

    const reactRef = this;
    const onDoubleClickNode = function(nodeId) {
      
      var request = $.post(config.serverUrl + '/friends/' + nodeId + '/getfriends');
        request.done((result) => {
          result.forEach((user) => {
            var request2 = $.post(config.serverUrl + '/user/' + user + '/get');
            request2.done((result2) => {
              
              let modData = { ...reactRef.state.data };
              let selectNode = modData.nodes.push({ id: user, name: result2.first_name});
              if(modData.links.includes({source: user, target: nodeId, color: "Red" })){
                selectNode = modData.links.push({source: user, target: nodeId, color: "Green" });
              } else {
                selectNode = modData.links.push({source: user, target: nodeId, color: "Blue" });
              }
              
              reactRef.setState({ data: modData });
      });

    });

    });

    var request = $.post(config.serverUrl + '/affiliations/getaffiliates/' + nodeId);
        request.done((result) => {
          result.forEach((user) => {
            var request2 = $.post(config.serverUrl + '/user/' + user + '/get');
            request2.done((result2) => {
              
              let modData = { ...reactRef.state.data };
              let selectNode = modData.nodes.push({ id: user, name: result2.first_name});
              if(modData.links.includes({source: user, target: nodeId, color: "Blue" })){
                selectNode = modData.links.push({source: user, target: nodeId, color: "Green" });
              } else {
                selectNode = modData.links.push({source: user, target: nodeId, color: "Red" });
              }
              
              reactRef.setState({ data: modData });
      });

    });

    });

    };

    return (
      <div class="container-fluid p-0">

<Navbar name="Pranav Aurora" id ="123"/>

<div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', paddingTop: 20,
}}> <div class="border border-primary rounded">

<Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={this.state.data}
    config={myConfig}
    onDoubleClickNode={onDoubleClickNode}/>
    <div class="row">
    <div class="col" style = {{paddingLeft: 30}}><h2 class="row justify-content-center">Legend:</h2></div>
    <div class="col"><h5 class="p-3 mb-2 bg-primary text-white rounded"> Friends</h5></div>
    <div class="col "><h5 class="p-3 mb-2 bg-danger text-white rounded">Affiliation</h5></div>
     <div class="col"></div>
      <div class="col"></div>
       <div class="col"></div>
    <div class="col"></div>
      <div class="col"></div>
       <div class="col"></div>
</div>
</div>

</div>

</div> 
    );
  }
}
export default GraphVisualizer;


