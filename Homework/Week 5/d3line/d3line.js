// Created by: Bart Quaink
// student nr.: 11121424
// Creates an "interactive" graph of the maximum temperature in 2014

// Achieve Data
d3.json("KNMI.json", function (data) {

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
        .x(function(d) {return x(d.date); })
        .y(function(d) {return y(d.max_temp);});

    // add the svg canvas
    var svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // parse the date to javascript format
    var parseDate = d3.time.format("%Y/%m/%d").parse;

    // add the temperature and parsed date to the data
    data.forEach(function(d){
        d.date = parseDate(d.date);
        d.max_temp =+ (d.max_temp/10);
    });

    // scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.max_temp; })]);

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
        .text("Max. temperature in C");

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

        // update value of x with the date
        var newdate = x(lastday)/3;

        // round the js date to an actual number
        var actualdate = data[Math.round(newdate)];

        // add the vertical line
        crosshair.append("line")
            .attr("class", "crosshair")
            .attr("x1", crossX)
            .attr("y1", margin.top)
            .attr("x2", crossX)
            .attr("y2", margin.top + height)
            .attr("stroke-width", 0.5)
            .attr("stroke", "black");

        // add the horizontal line
        crosshair.append("line")
            .attr("class", "crosshair")
            .attr("x1",margin.left)
            .attr("y1",y(actualdate.max_temp)+margin.top)
            .attr("x2",margin.left + width)
            .attr("y2",y(actualdate.max_temp)+margin.top)
            .attr("stroke-width", 0.5)
            .attr("stroke","black");

        // create info for tooltip, 0-15 is the date, then add the temperature
        var info = String(lastday).substring(0,15) + ": " + actualdate.max_temp + " degrees C";

        // add the tooltip, fixed location is bottom left of graph
        crosshair.append("text")
            .attr("class","infobox")
            .attr("class","infobox")
            .attr("x", margin.left + 10)
            .attr("y", height + margin.top - 10)
            .text(info);
    });
});
