// Define SVG area dimensions
var svgWidth = 1300;
var svgHeight = 1000;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 20,
  bottom: 60,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parser = d3.timeParse("%Y/%m");

// Load data from miles-walked-this-month.csv
d3.csv("all_data.csv").then(function(allData) {

  // Print the allData
  console.log(allData);

  // Format the date and cast the miles value to a number
  allData.forEach(function(data) {
    data.month_year = parser(data.month_year);
    data.Brazil_tot_new_confirmed = +data.Brazil_tot_new_confirmed;
  });

  // Configure a time scale with a range between 0 and the chartWidth
  // Set the domain for the xTimeScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(allData, data => data.month_year));

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(allData, data => data.Brazil_tot_new_confirmed)]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a drawLine function which will use our scales to plot the line's points
  var drawLine = d3
    .line()
    .x(data => xTimeScale(data.month_year))
    .y(data => yLinearScale(data.Brazil_tot_new_confirmed));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for allData
    .attr("d", drawLine(allData))
    .classed("line", true);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis)
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", -20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Total Number of New Covid Cases"));

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis)
    .call(g => g.append("text")
        .attr("x", svgWidth - 100)
        .attr("y", margin.bottom - 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Month"));

  

}).catch(function(error) {
  console.log(error);
});
