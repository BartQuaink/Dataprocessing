// Made by: Bart Quaink
// Student nr.: 11121424

// get wanted data
var data = document.getElementById("rawdata").value;
lineresult = data.split('\n')

// create lists for date and temperature
var date = [];
var temperature = [];

// iterate over whole list, ignore first one
for(var i = 1; i < lineresult.length; i++)  {
  fullist = lineresult[i].split(",");
  date.push(new Date(fullist[0]));
  temperature.push(fullist[1]);
}

// create canvas and get values
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var canwidth = canvas.width;
var canheight = canvas.height;
var padding = 50;
var maxtemp = 400;
var xdays = 365;

// transform x and y values, 0 is base point of canvas
var transformx = createTransform([0,xdays], [0, canwidth - padding]);
var transformy = createTransform([0,maxtemp], [canheight, 0]);

// convert milliseconds to days
dayslist = [];
for (i = 0; i < date.length - 1; i++){
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
  dayslist.push(parseInt(days - startdays) + 1);
}
  console.log(dayslist)


// start line at first value and origin
ctx.beginPath();
ctx.moveTo(dayslist[0] + padding, transformy(temperature[0]));

// iterate over all the temperatures and draw line to new temperature point
for (i = 1; i < temperature.length - 1; i++) {
  ctx.lineTo(transformx(dayslist[i]) + padding, transformy(temperature[i]));
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
var labels = 8
for (var i = 0; i < labels; i++){
    ctx.textAlign = "center";
    ctx.font = "16px serif";
    ctx.fillText(String(i * maxtemp / labels), 25, transformy(i * maxtemp / labels));
};

// create x-axis
ctx.beginPath();
ctx.moveTo(dayslist[0] + padding, transformy(0));
ctx.strokeStyle="#000000";
ctx.lineTo(transformx(dayslist[364]) + padding, transformy(0));
ctx.stroke();

// create labels and put them in the right spot, at least try to
var xlabels = 12;
var xmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
for(var i = 0; i < xlabels; i++){
  ctx.textAlign = "center";
  ctx.font = "15px serif";
  ctx.fillText(xmonths[i], padding + ((canwidth/xlabels) * i), canheight);

  // create lines, doesn't work as intended
  ctx.beginPath();
  ctx.moveTo(padding + transformx(i), transformy(0));
  ctx.lineTo(padding + transformx(i), transformy(0) - 5);
  ctx.strokeStyle="#000000";
  ctx.stroke();
}

// Transform function ------------------------------------
function createTransform(domain, range){
	var alpha = (range[1] - range[0]) / (domain[1] - domain[0]) ;
  var beta = range[0] - (alpha * domain[0]);
	return function(x){
		return alpha * x + beta;
	};
}
