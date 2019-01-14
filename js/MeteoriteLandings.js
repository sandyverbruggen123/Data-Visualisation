// https://all-free-download.com/free-vector/download/simple-world-maps-vector_578782.html

// color scale
var color = d3.scaleSequential(d3.interpolateRdPu);

// create svg element and append it to the body
var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "75%");

// get div moreInfo div
var moreInfoDiv = document.getElementById("moreInfo");

// variables
var minX, maxX, minY, maxY, minM, maxM, xRange, yRange, mRange, minYear, maxYear, yearRange;
var xAxis, yAxis;

var margin = 50;
var vizW = 1000;
var vizH = 700;

// araays to put data in
var arrayReclongs = [];
var arrayReclats = [];
var arrayMass = [];
var arrayNames = [];
var arrayYears = [];

// https://stackoverflow.com/questions/12464101/svg-stretching-an-image
// https://stackoverflow.com/questions/19484707/how-can-i-make-an-svg-scale-with-its-parent-container

// Get json data from file
d3.json("data/MeteoritesData.json").get(function (error, data) {

  // loop trough the data and put the data in the right arrays
  for (var i = 0; i < data.length; i++) {
    arrayReclongs[i] = data[i].reclong;
    arrayReclats[i] = data[i].reclat;
    arrayMass[i] = data[i].mass;
    arrayNames[i] = data[i].name;
    arrayYears[i] = data[i].year.substr(0, 4);
  }

  // calculate minimum and maximum year
  minYear = Math.min.apply(null, arrayYears);
  maxYear = Math.max.apply(null, arrayYears);

  // calculate minimum and maximum longitude
  minX = Math.min.apply(null, arrayReclongs);
  maxX = Math.max.apply(null, arrayReclongs);

  // calculate minimum and maximum latitude
  minY = Math.min.apply(null, arrayReclats);
  maxY = Math.max.apply(null, arrayReclats);

  // calculate minimum and maximum mass
  minM = Math.min.apply(null, arrayMass);
  maxM = Math.max.apply(null, arrayMass);

  // scale year, longitude, latitute, mass according min and max 
  yearRange = d3.scaleLinear().domain([minYear, maxYear]).range([0, 1]);
  xRange = d3.scaleLinear().domain([minX, maxX]).range([0, vizW]);
  xAxis = d3.axisBottom(xRange);
  yRange = d3.scaleLinear().domain([minY, maxY]).range([vizH, 0]);
  yAxis = d3.axisRight(yRange);
  mRange = d3.scaleLog().domain([minM, maxM]).range([2, 8]);

  // draw circle for each element in the dataset
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    // x and y position depends on longitude and latitude data
    .attr("cx", function (d, i) {
      return xRange(d.reclong);
    })
    .attr("cy", function (d, i) {
      return yRange(d.reclat);
    })
    // radius depends on mass 
    .attr("r", function (d, i) {
      return mRange(d.mass);
    })
    // color of the dot depends on year
    .attr("fill", function (d, i) {
      // year is full data but I only need the year 
      // so i just need the 4 first charachters
      var year4 = d.year.substr(0, 4);
      return color(yearRange(parseInt(year4)));
  })
  
  .attr("transform", "translate("+margin+","+margin+")")
    // functions to call if the mouse goes over or out a meteorite
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler)

  // create x-axis (longitude)
  svg.append("g").attr("class", "axis x").attr("transform", "translate("+margin+","+margin+")").call(xAxis)

  // create y-axis (latitude)
  svg.append("g").attr("class", "axis y").attr("transform", "translate("+margin+","+margin+")").call(yAxis)

  // create x-axis label (longitude)
  svg.append('text').attr("transform", "translate(950, 40)").attr("fill", "deepPink").attr("font-family", "Space Mono").text("Longitude")

  // create y-axis label (latitude)
  svg.append('text').attr("transform", "translate(40, 725) rotate(-90)").attr("fill", "deepPink").attr("font-family", "Space Mono").text("Latitude")

});

// function when your mouse is on an meteorite
function mouseOverHandler(d, i) {

  // select the object where your mouse is
  d3.select(this)
    // collor the dot white
    .attr("fill", "white");

  // Put info from metorite (where mouse is hovered) into the right variables
  var name = d.name;
  var mass = d.mass;
  var year = d.year;
  var reclong = d.reclong;
  var reclat = d.reclat;

  // Change info about the hovered meteorite
  document.getElementById("name").innerHTML = "Name: " + name;
  document.getElementById("mass").innerHTML = "Mass: " + mass + " g";
  document.getElementById("year").innerHTML = "Year: " + year.substr(0, 4);
  document.getElementById("reclong").innerHTML = "Long: " + reclong;
  document.getElementById("reclat").innerHTML = "Lat: " + reclat;

}

// function when your mouse leaves the dot of the meteorite
function mouseOutHandler(d, i) {
  d3.select(this)
    // give the color back the right color according the year
    .attr("fill", function (d, i) {
      var year4 = d.year.substr(0, 4);
      return color(yearRange(parseInt(year4)))
    })

}