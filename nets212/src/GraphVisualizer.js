
import { Graph } from "react-d3-graph";
import Navbar from './Navbar.js'

function GraphVisualizer() {
    const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
    ],
};
 
// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 500,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
        color: "blue",
    },
};
 
// graph event callbacks
const onClickGraph = function() {
    window.alert(`Clicked the graph background`);
};
 
const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
};
 
const onDoubleClickNode = function(nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
};
 
const onRightClickNode = function(event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
};
 
const onMouseOverNode = function(nodeId) {
    
};
 
const onMouseOutNode = function(nodeId) {
    
};
 
const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
};
 
const onRightClickLink = function(event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
};
 
const onMouseOverLink = function(source, target) {
    
};
 
const onMouseOutLink = function(source, target) {
};
 
const onNodePositionChange = function(nodeId, x, y) {
    window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
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
    data={data}
    config={myConfig}
    onClickNode={onClickNode}
    onDoubleClickNode={onDoubleClickNode}
    onRightClickNode={onRightClickNode}
    onClickGraph={onClickGraph}
    onClickLink={onClickLink}
    onRightClickLink={onRightClickLink}
    onMouseOverNode={onMouseOverNode}
    onMouseOutNode={onMouseOutNode}
    onMouseOverLink={onMouseOverLink}
    onMouseOutLink={onMouseOutLink}
    onNodePositionChange={onNodePositionChange}/>
    <div class="row">
    <div class="col" style = {{paddingLeft: 30}}><h2 class="row justify-content-center">Legend:</h2></div>
    <div class="col"><h5 class="p-3 mb-2 bg-primary text-white rounded"> Friends</h5></div>
    <div class="col"><h5 class="p-3 mb-2 bg-danger text-white rounded">Affiliation</h5></div>
     <div class="col"></div>
      <div class="col"></div>
       <div class="col"></div>
</div>
</div>

</div>


</div> 

    )
}


export default GraphVisualizer;

