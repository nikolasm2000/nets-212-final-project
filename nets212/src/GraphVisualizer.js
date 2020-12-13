import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import Navbar from './Navbar.js'

class GraphVisualizer extends Component {
  constructor() {
    super();
    let data = {
      nodes: [{ id: "Niko" }, { id: "Pranav" }, { id: "Sacha" }],
      links: [
        { source: "Niko", target: "Pranav", color: "Blue" },
        { source: "Niko", target: "Sacha", color: "Red" }
      ]
    };
    this.state = {
      data: data
    };
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
      let modData = { ...reactRef.state.data };
      let selectNode = modData.nodes.push({ id: "Henrique" });
      selectNode = modData.nodes.push({ id: "Henrique Still" });
      selectNode = modData.links.push({ source: nodeId, target: "Henrique", color: "Red" });
      selectNode = modData.links.push({ source: nodeId, target: "Henrique Still", color: "Blue" });
      reactRef.setState({ data: modData });
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


