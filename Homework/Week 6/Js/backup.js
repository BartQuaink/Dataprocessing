d3.json("Data/totalpopulation.json", function(data) {

  // set base of y axis for world map
  basetotal = 6000000000;

  // make canvas
  var margin = {top: 30, right: 50, bottom: 60, left: 100},
      width = 1250 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set times and scales for x-axis
  var x = d3.time.scale().range([0, width]);
  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom");

  // set times and scales for y-axis
  var y = d3.scale.linear().range([height, 0]);
  var yAxis = d3.svg.axis().scale(y)
      .orient("left");

  // define the svg line
  var svgline = d3.svg.line()
      .x(function(d) {return x(d.year); })
      .y(function(d) {return y(d.totalpop);});

  // add the svg canvas
  var svg = d3.select("body")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // parse the year to javascript format
  var parseyear = d3.time.format("%Y").parse;

  // add the population and parsed date to the graph
  data.forEach(function(d){
      d.year = parseyear(d.year);
  });

  // scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.year; }));
  y.domain([basetotal, d3.max(data, function(d) { return d.totalpop; })]);

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
        .attr("transform", "rotate(-90)")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
      .text("Total world population");

  // add the valueline path
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", svgline);

  // create crosshair
  var crosshair = d3.select("svg");

  // start function on mousemovement
  crosshair.on("mousemove", function () {

      // remove crosshair after updated event
      crosshair.selectAll(".crosshair").remove();
      crosshair.selectAll(".infobox").remove();

      // d3.mouse returns an array of [x,y] coördinates
      var crossX = d3.mouse(this)[0];
      var crossY = d3.mouse(this)[1];

      // make sure the crosshair stays in the canvas
      if (crossX < margin.left) { crossX = margin.left; }
      if (crossY > margin.left + width) { crossY = margin.left + width; }

      // get the last day
      var lastday = x.invert(crossX - margin.left);

      var newdate = x(lastday)/100;

      // update value of x with the date
      var actualyear = data[Math.round(x(lastday))];
    });
});
