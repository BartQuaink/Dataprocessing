// Created by: Bart Quaink
// Student nr.: 11121424

d3.csv("data/population.csv", function(data) {

    // get input from csv file
    for (var input in data) {
        // get country name and population amount
        var countryname = data[input].country_code.substring();
        var fillkey = getColor(data[input].population);
        data[countryname] = {fillKey : fillkey, population: data[input].population, code:countryname, country: data[input].country.substring()};
    }

    // create the world map
    var worldmap = new Datamap({
        // select element in html page
        element: document.getElementById("container"),
        projection: "mercator",
        // create a graduated coloring scheme for the filling colors
        fills: {
            "MAX": "#ff0000",
            "RHIGH": "#ed6f1f",
            "VHIGH": "#eeac3c",
            "HIGH": "#ffe713",
            "MED": "#f7e81f",
            "LOW": "#acff12",
            "MIN": "#8bff17",
            "No data": "lightgray",
            defaultFill: "lightgray"
        },
        // select data from data read by d3.csv up top
        data: data,
        // as per default options for maps, documented here: https://github.com/markmarkoh/datamaps#default-options
        geographyConfig: {
            dataUrl: null, // if not null, datamaps will fetch the map JSON
            borderWidth: 1,
            borderColor: "#FDFDFD",
            // don't show Antarctica
            hideAntarctica: true,
            // returns strings containing info about country and population
            popupTemplate: function(geography, data) {
              if (data === null) {
                  return '<div class="hoverinfo"><strong>' + geography.properties.name + ": No data :(" + "</strong></div>";
              }
              else {
                  return '<div class="hoverinfo"><strong>' + "Population in " + geography.properties.name + " : " + data.population + "000" + "</strong></div>";
              }
            },
            // highlights whatever the mouse is on
            highlightOnHover: true,
            highlightBorderColor: "#00000",
            highlightBorderWidth: 2
        }
    });
});

// create function to seperate the data in different sets
function getColor(population){
  if (population > 100000) { return "MAX";}
  else if (population > 50000) { return "RHIGH";}
  else if (population > 10000) { return "VHIGH";}
  else if (population > 5000) { return "HIGH";}
  else if (population > 2500) { return "MED";}
  else if (population > 1000) { return "LOW";}
  else if (population < 1000) { return "MIN";}
}
