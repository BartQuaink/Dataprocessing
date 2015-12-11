

// run script everytime a new country is clicked, thus updating the linegraph
d3.json("Data/population.json", document.getElementById("containermap").onclick = function(data) {

  // get the innerHTML to update the linegraph
  var clickedcountryname = document.getElementById("clickedcountryname").innerHTML;

  datalist = [];

  // initialise i to get specific data of a country
  var i = 0;

  var datescale = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013];

  // search for selected country
  for(var year in data){
    // if found, get data from selected country and push data in list
    if(data[year].country === clickedcountryname){
      // if another country is found, clear list
      datalist = [];
      datalist.push(data[i].y2000, data[i].y2001, data[i].y2002, data[i].y2003, data[i].y2004, data[i].y2005, data[i].y2006, data[i].y2007, data[i].y2008, data[i].y2009, data[i].y2010, data[i].y2011, data[i].y2012, data[i].y2013, data[i].y2014);
    }
    // country not found? then next index
    i++;
  }

  // make canvas
  var margin = {top: 30, right: 50, bottom: 60, left: 100},
      width = 1250 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set times and scales for x-axis
  var x = d3.scale.linear()
      .domain([datescale[0], datescale[13]])
      .range([0,width]);
  var xAxis = d3.svg.axis().scale(x)
      .ticks(14)
      .orient("bottom");

  // set times and scales for y-axis
  var y = d3.scale.linear().range([height, 0]);
  var yAxis = d3.svg.axis().scale(y)
      .orient("left");

  // define the svg line
  var svgline = d3.svg.line()
      .x(function(d) {return x(datescale); })
      .y(function(d) {return y(datalist);});

  // add the svg canvas
  var svg = d3.select("body")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // scale the range of the data
  x.domain(d3.extent(data, function(d) { return datescale; }));
  // start y from population 2000
  y.domain([datalist[0], d3.max(data, function(d) { return datalist[14]; })]);

  // add the x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform","translate(0," + height + ")")
      .call(xAxis);

  // add the y axis
  svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("dy", ".71em")
        .attr("x", width - 100)
        .style("text-anchor", "end")
      .text("Population growth of " + clickedcountryname);

  // add the valueline path
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", svgline);
});
