// variables 
var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },

  width = 1000 - margin.left - margin.right,
  height = 1400 - margin.top - margin.bottom;

// append the svg canvas to the page
var svg = d3.select("#sankeyDiagram").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
  .nodeWidth(36)
  .nodePadding(40)
  .size([width, height]);

var path = sankey.link();

// load the data 
d3.csv("sankey.csv", function (error, data) {

  // graph variables for the data
  graph = {
    "nodes": [],
    "links": []
  };

  // array to put in the colors
  var colors = [];

  // for each datapoint
  data.forEach(function (d) {

    // add color 
    colors.push(d.color);

    graph.nodes.push({
      "name": d.source
    });
    graph.nodes.push({
      "name": d.target
    });
    graph.links.push({
      "source": d.source,
      "target": d.target,
      "value": +d.value
    });
  });

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(d3.nest()
    .key(function (d) {
      return d.name;
    })
    .map(graph.nodes));

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  //now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = {
      "name": d
    };
  });

  // add sankey
  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);


  // select all the links
  var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function (d) {

      // if weight is bigger, strokewidth = bigger
      if (Math.max(1, d.value) == 4) {
        return Math.max(1, d.value / 2);
      } else if (Math.max(1, d.value) == 4.25) {
        return Math.max(1, d.value)
      } else {
        return Math.max(1, d.value * 2)
      }
    })
    // add the right color to the stroke
    .style('stroke', function (d, i) {
      return colors[i];
    })


  // add in the nodes
  var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });


  // add the rectangles for the nodes with style and attributes
  node.append("rect")
    .attr("height", function (d) {
      return d.dy;
    })
    .attr("width", sankey.nodeWidth())
    .style("fill", function (d) {
      return "white";
    })
    .style("stroke", "black");
});