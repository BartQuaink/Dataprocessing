// Made by: Bart Quaink
// Student nr.: 11121424

// get wanted data
var data = document.getElementById("rawdata").value;
data = JSON.parse(data);

// create lists for date and temperature
var date = [];
var temperature = [];

// iterate over whole json list
for(var i = 0; i < data.length; i++)  {
  date.push(new Date(data[i][0]));
  temperature.push(data[i][1]);
}

// create canvas and get values
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var canwidth = canvas.width;
var canheight = canvas.height;
var padding = 50;
var maxtemp = 400;
var xdays = 365;

// transform x and y values, 0 is base point of canvas
var transformx = createTransform([0,xdays], [padding, canwidth - padding]);
var transformy = createTransform([0,maxtemp], [canheight - padding, padding]);

// convert milliseconds to days
dayslist = [];
for (var i = 0; i < date.length; i++){
  x = date[i] / 1000;
  seconds = x % 60;
  x /= 60;
  minutes = x % 60;
  x /= 60;
  hours = x % 24;
  x /= 24;
  days = x;
  if (i == 0) {
    startdays = days;
  }
  // error checking for parsing floats to ints
  if (i > 313) {
    dayslist.push(parseInt(days - startdays) + 2);
  }
  else
    dayslist.push(parseInt(days - startdays) + 1);
}

// start line at first value and origin
ctx.beginPath();
ctx.moveTo(dayslist[0] + padding, transformy(temperature[0]));

// iterate over all the temperatures and draw line to new temperature point
for (i = 1; i < temperature.length; i++) {
  ctx.lineTo(transformx(dayslist[i]), transformy(temperature[i]));
}
ctx.strokeStyle = "blue";
ctx.stroke();

// create y-axis
ctx.beginPath();
ctx.moveTo(dayslist[0] + padding, canheight);
ctx.strokeStyle="#000000";
ctx.lineTo(dayslist[0] + padding, padding - canheight);
ctx.stroke();

// create labels
var labels = 8;
for (var i = 0; i < labels; i++) {
    ctx.textAlign = "center";
    ctx.font = "16px serif";
    ctx.fillText(String(i * maxtemp / labels) / 10, 25, transformy(i * maxtemp / labels));
};

// create x-axis
ctx.beginPath();
ctx.moveTo(dayslist[0], transformy(0));
ctx.strokeStyle="#000000";
ctx.lineTo(transformx(dayslist[364]), transformy(0));
ctx.stroke();

// create labels and put them in the right spot, at least try to
var xlabels = 12;
var xmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
for(var i = 0; i < xlabels; i++) {
  ctx.textAlign = "left";
  ctx.font = "15px serif";
  ctx.fillText(xmonths[i], padding + 20 + (i * (canwidth-padding - 80)/xlabels), canheight - 30);

  // create lines, still could not get this to work as intended
  ctx.beginPath();
  ctx.moveTo(padding  + (i * (canwidth-padding - 80)/xlabels), transformy(0));
  ctx.lineTo(padding + (i * (canwidth-padding - 80)/xlabels), transformy(0) - 5);
  ctx.strokeStyle="#000000";
  ctx.stroke();
}

// transform function
function createTransform(domain, range) {
	var alpha = (range[1] - range[0]) / (domain[1] - domain[0]);
  var beta = range[0] - (alpha * domain[0]);
	return function(x) {
		return alpha * x + beta;
	};
}

// create crosshairs //

// create reverse transformmation
reverse_transformx = createTransform([padding, canwidth - padding], [0, xdays]);

// initialise the canvas and add listener to mouse movement
canvas2 = document.getElementById("crosshairs");
ctx2 = canvas2.getContext("2d");
canvas2.addEventListener("mousemove", domousemove, false);

// create function for mousemovement on x-axis
function domousemove() {
  canvas_x = event.pageX;
  ctx2.clearRect(0,0,canwidth,canheight);
  tooltip.style.visibility = "hidden";

  // draw vertical line
  if (canvas_x < transformx(dayslist[364] + 10)) {
    ctx2.beginPath();
    ctx2.moveTo(canvas_x - 20,0);
    ctx2.lineTo(canvas_x - 20,1000);
    ctx2.stroke();
  }

  // get temperature from x value
  crosshair_x = parseInt((reverse_transformx(canvas_x))- 7);
  canvas_y = temperature[crosshair_x];

  // draw horizontal line
  ctx2.beginPath();
  ctx2.moveTo(padding, transformy(canvas_y));
  ctx2.lineTo(canwidth, transformy(canvas_y));
  ctx2.stroke();

  // set timer to 1.5 seconds before showing tooltip
  setTimeout(showtooltip, 1500);
}

// create function to show tooltip
function showtooltip() {
  // set position relative to crosshair
  tooltip = document.getElementById("tooltip");
  tooltip.style.left = (canvas_x + 10)+"px";
  tooltip.style.top = (transformy(canvas_y) + 65) +"px";

  // update tooltip with correct information
  document.getElementById("tooltip").innerHTML = "Date: " + data[crosshair_x][0] + "<br> Max temp: " + (temperature[crosshair_x] / 10) + "&deg";
  tooltip.style.visibility = "visible";
  mousemove = false;
}
