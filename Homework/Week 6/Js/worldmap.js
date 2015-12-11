// Created by: Bart Quaink
// Student nr.: 11121424
d3.json("Data/populationgrowth.json", function(data) {

    // start map at year 2014
    strUser = "2014";
    updateddata = {};

    // ------------------------------------- CREATE THE WORLD MAP ----------------------------------------- //
    // update selected year
    var dropdownyear = document.getElementById("dropdown");
    dropdownyear.onchange = function(){
      var strUser = dropdownyear.options[dropdownyear.selectedIndex].value;
    };

    // create the world map
    var worldmap = new Datamap({
        // select element in html page
        element: document.getElementById("containermap"),
        done: function(datamap) {
          // get the country name on click
          datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
            clickedcountryname = geography.properties.name;
            // push the clicked country name to the html
            document.getElementById("clickedcountryname").innerHTML = clickedcountryname;
          });
        },
        // create a graduated coloring scheme for the filling colors
        fills: {
            ">2": "#ff0000",
            ">1.75": "#ed6f1f",
            ">1.50": "#eeac3c",
            ">1.25": "#ffe713",
            ">1": "#f7e81f",
            "<1": "#acf60e",
            "<0": "#0a13f7",
            "No data": "lightgray",
            defaultFill: "lightgray"
        },

        // select data from data read by d3.json up top
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
                  return '<div class="hoverinfo"><strong>' + "Population growth in % in " + geography.properties.name + " : " + data.population.substring(0,5) + "</strong></div>";
              }
            },
            // highlights whatever the mouse is on
            highlightOnHover: true,
            highlightBorderColor: "#00000",
            highlightBorderWidth: 2
        }
    });

    //resize window when window size is changed
    d3.select(window).on('resize', function() {
        worldmap.resize();
    });

    // get input from json file and update when year is changed, but I can't figure out why it won't update
    if(strUser === "2000"){
      for (var year2000 in data) {
          // get country name and population amount in specific year
          countryname = data[year2000].country_code;
          fillkey = getColor(data[year2000].y2000);
          // create new data
          updateddata[countryname] = {fillKey : fillkey, population: data[year2000].y2000, code:countryname, country: data[year2000].country};
          // update map with new data
          worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2005"){
      for (var year2005 in data) {
        countryname = data[year2005].country_code;
        fillkey = getColor(data[year2005].y2005);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2005].y2005, code:countryname, country: data[year2005].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2006"){
      for (var year2006 in data) {
        countryname = data[year2006].country_code;
        fillkey = getColor(data[year2006].y2006);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2006].y2006, code:countryname, country: data[year2006].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2007"){
      for (var year2007 in data) {
        countryname = data[year2007].country_code;
        fillkey = getColor(data[year2007].y2007);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2007].y2007, code:countryname, country: data[year2007].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2008"){
      for (var year2008 in data) {
        countryname = data[year2008].country_code;
        fillkey = getColor(data[year2008].y2008);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2008].y2008, code:countryname, country: data[year2008].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2009"){
      for (var year2009 in data) {
        countryname = data[year2009].country_code;
        fillkey = getColor(data[year2009].y2009);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2009].y2009, code:countryname, country: data[year2009].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2010"){
      for (var year2010 in data) {
        countryname = data[year2010].country_code;
        fillkey = getColor(data[year2010].y2010);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2010].y2010, code:countryname, country: data[year2010].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2011"){
      for (var year2011 in data) {
        countryname = data[year2011].country_code;
        fillkey = getColor(data[year2011].y2011);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2011].y2011, code:countryname, country: data[year2011].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2012"){
      for (var year2012 in data) {
        countryname = data[year2012].country_code;
        fillkey = getColor(data[year2012].y2012);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2012].y2012, code:countryname, country: data[year2012].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2013"){
      for (var year2013 in data) {
        countryname = data[year2013].country_code;
        fillkey = getColor(data[year2013].y2013);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2013].y2013, code:countryname, country: data[year2013].country};
        worldmap.updateChoropleth(updateddata);
      }
    }
    if(strUser ==="2014"){
      for (var year2014 in data) {
        countryname = data[year2014].country_code;
        fillkey = getColor(data[year2014].y2014);
        updateddata[countryname] = {fillKey : fillkey, population: data[year2014].y2014, code:countryname, country: data[year2014].country};
        worldmap.updateChoropleth(updateddata);
      }
    }

    // create legend
    worldmap.legend();
});

// create function based on population difference from year before
function getColor(population){
  if (population > 2) { return ">2";}
  else if (population > 1.75) { return ">1.75";}
  else if (population > 1.50) { return ">1.50";}
  else if (population > 1.25) { return ">1.25";}
  else if (population > 1) { return ">1";}
  else if (population > 0) { return "<1";}
  else if (population < 0) { return "<0";}
}
