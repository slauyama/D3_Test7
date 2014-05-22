(function() {
  "use strict";

  /* Largest Numbber in javascript */
  var HIGH_NUM, RackInfoConstructor, backDistance, bb, bounds, clearAllSelected, data, display, findMaxNumber, frontDistance, gridSetup, isNumber, rackDataFunc, scene, setRackColor, shuffleView, sideDistance, toggleCamera, toggleColor, topDataRacks, topDistance, topThreeLeader, x3d, zoomIn;

  HIGH_NUM = 9007199254740992;


  /* Function rounds numbers to decimal certain decimal place */


  /* Takes in a num and a round to point */

  Math.roundTo = function(num, amount) {
    if (amount == null) {
      amount = 0;
    }
    return Math.round(num * Math.pow(10, amount)) / Math.pow(10, amount);
  };


  /* Adds a timestamp to console.log */

  console.logDate = function() {
    var timestamp;
    if (arguments.length) {
      timestamp = '[' + new Date().toUTCString() + '] ';
      return console.log(timestamp, arguments);
    }
  };


  /* Returns if a value is a number or not */

  isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };


  /*                    ComponentID  Name  RackUnitHeight  RackWidth  RackDepth  RackOrientation   XPosition  yPosition  NumberingOrigin  OverlappingAllowed  CoolingMax  WeightMax  PowerMax  LargestUnitLocation  LargestUnitSize  UsedUnitsCurrent  UsedUnitsPlanned  WeightCurrent  WeightPlanned  HeatDissipationCurrent  HeatDissipationPlanned  PowerCurrent  PowerPlanned  PowerActual  PowerActualDerivation  FloorPlanWidth  FloorPlanHeight */

  RackInfoConstructor = function(componentID, name, rackUnitHeight, rackWidth, rackDepth, rackOrientation, xPosition, yPosition, numberingOrigin, overlappingAllowed, coolingMax, weightMax, powerMax, largestUnitLocation, largestUnitSize, usedUnitsCurrent, usedUnitsPlanned, weightCurrent, weightPlanned, heatDissipationCurrent, heatDissipationPlanned, powerCurrent, powerPlanned, powerActual, powerActualDerivation, floorPlanWidth, floorPlanHeight) {
    var obj;
    obj = {};
    obj.componentID = componentID;
    obj.name = name;
    obj.rackUnitHeight = rackUnitHeight * 44.5 / 1000;
    obj.width = rackWidth;
    obj.depth = rackDepth;
    obj.rackOrientation = rackOrientation;
    obj.xPosition = (xPosition - floorPlanWidth / 2) / 1000;
    obj.yPosition = (yPosition - floorPlanHeight / 2) / 1000;
    obj.numberingOrigin = numberingOrigin;
    obj.overlappingAllowed = overlappingAllowed;
    obj.coolingMax = coolingMax;
    obj.weightMax = weightMax;
    obj.powerMax = powerMax;
    obj.largestUnitLocation = largestUnitLocation;
    obj.largestUnitSize = largestUnitSize;
    obj.usedUnitsCurrent = usedUnitsCurrent;
    obj.usedUnitsPlanned = usedUnitsPlanned;
    obj.weightCurrent = weightCurrent;
    obj.weightPlanned = weightPlanned;
    obj.temperatureCurrent = powerCurrent * 3.412141633;
    obj.temperaturePlanned = powerPlanned * 3.412141633;
    obj.powerCurrent = powerCurrent;
    obj.powerPlanned = powerPlanned;
    obj.powerActual = powerActual;
    obj.powerActualDerivation = powerActualDerivation;
    obj.floorPlanWidth = floorPlanWidth / 1000;
    obj.floorPlanHeight = floorPlanHeight / 1000;
    return obj;
  };


  /* This variable will contail all information about the racks */

  data = [];


  /* Manually out rackinformation into the data variable */

  data.push(new RackInfoConstructor(1470, "50M", 42, 483, 0, 0, 4250, 3650, 0, 1, 35000, 500, "NULL", 1, 41, 1, 0, 16, 0, 102, 0, "NULL", 0, 115, 1, 1500, 700));

  data.push(new RackInfoConstructor(1471, "50N", 42, 483, 0, 0, 4250, 2950, 0, 1, 35000, 500, 300, 1, 35, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1472, "50O", 42, 483, 0, 0, 4250, 2250, 0, 1, 35000, 500, 10000, 16, 27, 15, 0, 172.8, 0, 12700, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1473, "50P", 42, 483, 0, 0, 4250, 1550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1500, "50Q", 42, 483, 0, 0, 4250, 150, 1, 1, 35000, 500, 10000, 11, 22, 10, 0, 0, 0, 0, 0, 5600, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1501, "50R", 42, 483, 0, 0, 4250, -550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1502, "50S", 42, 483, 0, 0, 4250, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1503, "50T Tile", 42, 483, 0, 0, "NULL", -1950, 0, 1, 35000, 500, 10000, 1, 31, 11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1504, "50U", 42, 483, 0, 0, 4250, -2650, 0, 1, 35000, 500, 10000, 1, 32, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1474, "51M", 42, 483, 0, 0, 1450, 3650, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1475, "51N", 42, 483, 0, 0, 1450, 2950, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1476, "51O", 42, 483, 0, 0, 1450, 2250, 0, 1, 35000, 500, 10000, 1, 38, 4, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1477, "51P", 42, 483, 0, 0, 1450, 1550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1478, "51Q", 42, 483, 0, 0, 1450, 850, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1479, "51R", 42, 483, 0, 0, 1450, 150, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1480, "51S", 42, 483, 0, 0, 1450, -550, 0, 1, 35000, 500, 10000, 1, 38, 4, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1481, "51T", 42, 483, 0, 0, 1450, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfoConstructor(1482, "51U", 42, 483, 0, 0, 1450, -1950, 0, 1, 35000, 500, 10000, 1, 36, 6, 0, 136, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfoConstructor(1483, "51V", 42, 483, 0, 0, 1450, -2650, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 136, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfoConstructor(1484, "51W", 42, 483, 0, 0, 1450, -3350, 1, 1, 35000, 500, 10000, 1, 37, 3, 0, 136, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfoConstructor(1510, "51X", 42, 483, 0, 0, 1450, -4050, 0, 1, 35000, 500, 10000, 1, 15, 16, 0, 422, 0, 32789, 0, 5600, 0, 5600, 1, 1500, 700));

  data.push(new RackInfoConstructor(1485, "52L", 42, 483, 0, 0, -1350, 4350, 0, 1, 35000, 500, 10000, 1, 36, 2, 0, 68, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfoConstructor(1486, "52M", 42, 483, 0, 0, -1350, 3650, 0, 1, 35000, 500, 10000, 1, 36, 6, 0, 68, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfoConstructor(1487, "52N", 42, 483, 0, 0, -1350, 2950, 0, 1, 35000, 500, 10000, 1, 36, 2, 0, 68, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfoConstructor(1488, "52O", 42, 483, 0, 0, -1350, 2250, 0, 1, 35000, 500, 10000, 1, 28, 14, 0, 154, 0, 20746, 0, 4500, 0, 4500, 1, 1500, 700));

  data.push(new RackInfoConstructor(1489, "52P", 42, 483, 0, 0, -1350, 1550, 0, 1, 35000, 500, 10000, 1, 24, 14, 0, 204, 0, 29496, 0, 5700, 0, 5700, 1, 1500, 700));

  data.push(new RackInfoConstructor(1490, "52Q", 42, 483, 0, 0, -1350, "NULL", 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1491, "52R", 42, 483, 0, 0, -1350, 150, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1492, "52S", 42, 483, 0, 0, -1350, -550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 5700, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1493, "52T", 42, 483, 0, 0, -1350, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1511, "52U", 42, 483, 0, 0, -1350, -1950, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1512, "52V", 42, 483, 0, 0, "NULL", "NULL", 0, 1, 35000, 500, 10000, 1, 28, 10, 0, 161, 0, 24039, 0, 4400, 0, 4400, 1, 1500, 700));

  data.push(new RackInfoConstructor(1494, "52W", 42, 483, 0, 0, -1350, -3350, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1495, "52X", 42, 483, 0, 0, -1350, -4050, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1496, "53M", 42, 483, 0, 0, -4150, 3650, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1497, "53N Tile", 42, 483, 0, 0, -4150, 2950, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1498, "53O", 42, 483, 0, 0, -4150, 2250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1499, "53P", 42, 483, 0, 0, -4150, 1550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1505, "53Q", 42, 483, 0, 0, -4150, 150, 0, 1, 35000, 500, 10000, 1, 32, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1506, "53R", 42, 483, 0, 0, "NULL", -550, 0, 1, 35000, 500, 10000, 1, 26, 16, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1507, "53S", 42, 483, 0, 0, -4150, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1508, "53T", 42, 483, 0, 0, -4150, -1950, 0, 1, 35000, 500, 10000, 1, 30, 12, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfoConstructor(1509, "53U", 42, 483, 0, 0, -4150, -2650, 0, 1, 35000, 500, 10000, 1, 32, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));


  /* This will filter out racks that do not have the right properties */


  /* Data must not be name Tile, must have a x, y position, a width, and a height */

  data = data.filter(function(d) {
    return d.name.indexOf("Tile") === -1 && isNumber(d.xPosition) && isNumber(d.yPosition) && isNumber(d.floorPlanWidth) && isNumber(d.floorPlanHeight);
  });


  /* bounds - object that contains info on the size and scale of the grid */

  bounds = {
    boundingBox: {
      minX: HIGH_NUM,
      maxX: -HIGH_NUM,
      minY: HIGH_NUM,
      maxY: -HIGH_NUM
    },

    /* find the max width and height of a rack to extend the grid and views */
    maxWidth: -HIGH_NUM,
    maxHeight: -HIGH_NUM,
    resetBounds: function() {
      this.boundingBox.minX = this.boundingBox.minY = HIGH_NUM;
      this.boundingBox.maxX = this.boundingBox.maxY = -HIGH_NUM;
      this.maxWidth = this.maxHeight = -HIGH_NUM;
    },

    /* recalculate the bounds based on the data */

    /* was used if i want to change plans. Need to relook at the scale. */
    calculateBounds: function() {
      this.resetBounds();
      this.boundingBox.minX = Math.roundTo(d3.min(data, function(d) {
        return d.xPosition;
      }), 2);
      this.boundingBox.maxX = Math.roundTo(d3.max(data, function(d) {
        return d.xPosition;
      }), 2);
      this.boundingBox.minY = Math.roundTo(d3.min(data, function(d) {
        return d.yPosition;
      }), 2);
      this.boundingBox.maxY = Math.roundTo(d3.max(data, function(d) {
        return d.yPosition;
      }), 2);
      this.maxWidth = Math.roundTo(d3.max(data, function(d) {
        return d.floorPlanWidth;
      }), 2);
      this.maxHeight = Math.roundTo(d3.max(data, function(d) {
        return d.floorPlanHeight;
      }), 2);
    }
  };

  bounds.calculateBounds();


  /* These variables are used to declare starting positions of the views */

  bb = bounds.boundingBox;

  frontDistance = bb.minY - bounds.maxHeight - (bb.maxX - bb.minX);

  backDistance = -frontDistance;

  sideDistance = bb.maxX + bounds.maxWidth + (bb.maxY - bb.minY);

  topDistance = (bb.maxX - bb.minY) + (bb.maxY - bb.minY);


  /* Target the main x3d element */

  x3d = d3.select("#x3dElement").attr("height", "400px").attr("width", "700px");


  /* Add in a couple buttons to the element */


  /* Buttons do not work */

  zoomIn = x3d.append('button').attr('id', "zoom-in");

  document.getElementById('zoom-in').innerHTML = "Zoom In";

  zoomIn = x3d.append('button').attr('id', "zoom-out");

  document.getElementById('zoom-out').innerHTML = "Zoom Out";


  /* There is one scene element per x3d element */

  scene = x3d.append("scene");


  /* Append the different viewpoints */


  /* All viewpoints have a centerOfRotation, position, orientation, */


  /* and fieldOfView */

  scene.append("viewpoint").attr("id", "Top View").attr("centerOfRotation", "0 0 0").attr("position", "0 0 " + topDistance).attr("orientation", "0.0 0.0 0.0 0.0").attr("fieldOfView", '0.75');

  scene.append("viewpoint").attr("id", "Front View").attr("centerOfRotation", "0 0 0").attr("position", "0 " + frontDistance + " 0").attr("orientation", "1.0 0.0 0.0 1.570").attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Left View").attr("centerOfRotation", "0 0 0").attr("position", "" + (-sideDistance) + " 0 0.25").attr("orientation", "-0.50 0.50 0.50 " + (2.093 * 2)).attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Right View").attr("centerOfRotation", "0 0 0").attr("position", "" + sideDistance + " 0 0.25").attr("orientation", "0.50 0.50 0.50 2.093").attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Back View").attr("centerOfRotation", "0 0 0").attr("position", "0 " + backDistance + " -.5").attr("orientation", "0.0 0.75 0.65 3.14").attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Perspective").attr("centerOfRotation", "0 0 0").attr("position", "" + (backDistance / 3) + " " + (-sideDistance) + " " + (topDistance / 3)).attr("orientation", "1.0 0.25 0.25 1.25").attr("fieldOfView", '0.95');


  /* Custom View Removed
  scene.append("viewpoint").attr("id", "Custom View")
    .attr( "centerOfRotation", "0 0 0")
    .attr( "position", "#{-backDistance / 3} #{-sideDis} #{topDistance / 3}"  )
    .attr( "orientation", "1.0 -0.2 -0.1 1.25" ).attr( "fieldOfView", '0.75')
   */


  /* Right point Light */

  scene.append("pointLight").attr("on", "true").attr('intensity', '.50').attr('color', '1.0 1.0 1.0').attr('attenuation', '1.0000 0.0000 0.0000').attr('location', "" + sideDistance + " 0 0").attr('radius', '200.0');


  /* Left point Light */

  scene.append("pointLight").attr("on", "true").attr('intensity', '.50').attr('color', '1.0 1.0 1.0').attr('attenuation', '1.0000 0.0000 0.0000').attr('location', "" + (-sideDistance) + " 0 0").attr('radius', '200.0');


  /* Dummy function that is supposed to act as a tool tip */

  rackDataFunc = function(data) {};


  /* finds max number of a specific property within the data */

  findMaxNumber = function(data, property, limit) {
    if (limit == null) {
      limit = HIGH_NUM;
    }
    return d3.max(data, function(d) {
      if (typeof d[property] === "number" && d[property] < limit) {
        return d[property];
      }
    });
  };


  /* displays the top 3 leaders of one property */

  topThreeLeader = function(data, property, className, units) {
    var counter, dataSubset, max;
    max = [];
    max[0] = findMaxNumber(data, property.toString());
    max[1] = findMaxNumber(data, property.toString(), max[0]);
    max[2] = findMaxNumber(data, property.toString(), max[1]);
    counter = 0;
    while (counter < 3) {

      /* filter out all data with a particular value */
      dataSubset = data.filter(function(d) {
        return d[property.toString()] === max[counter];
      });

      /* change value to a string and add the units */
      max[counter] = max[counter].toString() + units.toString() + " rack" + (dataSubset.length > 1 ? "s:" : ":");

      /* add the names of the rack to the string */
      dataSubset.forEach(function(d) {
        return max[counter] += " " + d.name;
      });

      /* add the number of rack to the string */
      max[counter] += " (" + dataSubset.length + " total)";
      counter++;
    }
    counter = 1;

    /* write the string into the innerHTML */
    while (counter < 4) {
      document.getElementsByClassName(className.toString(), +counter.toString())[0].innerHTML = max[counter - 1];
      counter++;
    }
  };


  /* find the top three leaders of all these properties */

  topDataRacks = function(data) {
    topThreeLeader(data, "powerCurrent", "power", " watts");
    topThreeLeader(data, "temperatureCurrent", "temperature", "BTUs");
    topThreeLeader(data, "weightCurrent", "weight", "lb");
    topThreeLeader(data, "usedUnitsCurrent", "used-units", " used units");
    topThreeLeader(data, "largestUnitLocation", "largest-unit-location", " units");
    topThreeLeader(data, "largestUnitSize", "largest-unit-size", " unit size");
  };


  /* Remove all classes of a certain type */

  clearAllSelected = function(str) {
    var allSelected;
    allSelected = document.getElementsByClassName(str);

    /* For every item in the list remove it from the class list */
    while (allSelected.length) {
      allSelected[0].className = allSelected[0].className.replace(str, '');
    }
  };


  /* Main display function */

  display = function(data) {

    /* for every piece of data */
    var shapesEnter, transforms;
    transforms = scene.selectAll('transform').data(data);

    /* Append a transform and a shape to each transform */

    /* they have a unique id and a class of rack */

    /* id and class are not needed for css but was planning on using them for hover over */
    shapesEnter = transforms.enter().append('transform').append('shape').data(data).attr('id', function(d) {
      return 'rack' + d.componentID;
    }).attr('class', 'rack');

    /* give each transform some transitions to move the boxes */
    transforms.transition().attr('translation', function(d, i) {
      console.log(d.xPosition, d.yPosition);
      return d.xPosition + ' ' + d.yPosition + ' 0.0';
    });

    /* append a material to each shape with a material element within it */
    shapesEnter.append('appearance').append('material');

    /* within the material set the color by calling the setRackColor function */

    /* contains some transitions between colors */
    scene.selectAll('material').data(data).transition().duration(1000).delay(500).attr('diffuseColor', function(d) {
      return setRackColor(d);
    });

    /* append a box to each shape and set the size of each box to the data of the rack */
    shapesEnter.append('box').data(data).attr('size', function(d) {
      return d.floorPlanWidth + ' ' + (d.floorPlanHeight - 0.1) + ' ' + d.rackUnitHeight;
    });

    /* Not sure what this does here is more info https://github.com/mbostock/d3/wiki/Selections */
    transforms.exit();

    /* update the leaders of each property */
    topDataRacks(data);
  };

  setInterval((function() {
    return display(data);
  }), 10000);

  setRackColor = function(data) {

    /* look at what color is selected */
    var g, r, value;
    switch (document.getElementsByClassName('selected-color')[0].value) {
      case "Power":
        value = data.powerCurrent / data.powerMax;
        value = isNumber(value) ? value : "steelblue";
        break;
      case "Weight":
        value = data.weightCurrent / data.weightMax;
        value = isNumber(value) ? value : "steelblue";
        break;
      case "Temperature":
        value = data.temperatureCurrent / data.coolingMax;
        value = isNumber(value) ? value : "steelblue";
        break;
      default:
        value = "steelblue";
    }

    /* if there is missing data assign color blue */
    if (value === "steelblue") {
      return "steelblue";
    }

    /* change color based on max value and current value */

    /* color will be on a scale of green to red */
    if (value < 0.5) {
      r = Math.floor(value * 255);
      g = 200;
    } else {
      r = 255;
      g = Math.floor((1 - value) * 255);
    }
    return "#" + (r < 16 ? "0" : "") + r.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + "00";
  };


  /* remove all .selected-view and asign it to a the called item */

  toggleCamera = function() {
    clearAllSelected('selected-view');
    this.className += " selected-view";

    /* call the new view */
    document.getElementById(this.value).setAttribute('set_bind', 'true');
  };


  /* remove all .selected-color and asign it to a the called item */

  toggleColor = function() {
    clearAllSelected('selected-color');
    this.className += " selected-color";

    /* redisplay the color to show changed color */
    display(data);
  };

  gridSetup = function(bounds) {

    /* Attach a shape to the scene */

    /* Give it a light grey color with transparency */
    var connections, coordinateConnections, coordinates, gridHeightEnd, gridHeightStart, gridStart, gridWidthEnd, gridWidthStart, set, shape;
    shape = scene.append('Transform').append('shape').attr('id', 'grid');
    shape.append('appearance').append('material').attr('id', 'gridMaterial').attr('diffuseColor', '0.8, 0.8, 0.8').attr('transparency', '0.65');

    /* coordinateConnections is a string representing connections between coordinates */

    /* all coordinates are connected until it reaches a -1 */

    /* 1, 2, -1, 3, 4 will connect coordinate 1 and 2 but will not connect coordinate 2 and 3 */
    coordinateConnections = "";

    /* coordinates is a string representing the coordinates (x, y, z) */
    coordinates = "";

    /* connections signifies what set of line user is on */
    connections = 0;

    /* rounding to a .6 interval */
    gridHeightStart = Math.roundTo(Math.ceil((bounds.boundingBox.minY - bounds.maxHeight) / 0.6 - 1) * 0.6, 2);
    gridHeightEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxY + bounds.maxHeight) / 0.6 + 1) * 0.6, 2);
    gridWidthStart = Math.roundTo(Math.ceil((bounds.boundingBox.minX - bounds.maxWidth) / 0.6 - 1) * 0.6, 2);
    gridWidthEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxX + bounds.maxWidth) / 0.6 + 1) * 0.6, 2);
    console.log(gridHeightStart, gridHeightEnd, gridWidthStart, gridWidthEnd);

    /* Verticle lines on the Grid */
    gridStart = gridWidthStart;
    while (gridStart <= gridWidthEnd) {
      coordinates += "" + gridStart + " " + gridHeightStart + " -1 " + gridStart + " " + gridHeightEnd + " -1 ";
      coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
      gridStart = Math.roundTo(gridStart + 0.6, 2);
      connections += 2;
    }

    /* Horizontal Lines on the Grid */
    gridStart = gridHeightStart;
    while (gridStart <= gridHeightEnd) {
      coordinates += "" + gridWidthStart + " " + gridStart + " -1 " + gridWidthEnd + " " + gridStart + " -1 ";
      coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
      gridStart = Math.roundTo(gridStart + 0.6, 2);
      connections += 2;
    }

    /* set the final strings to the proper place */
    set = shape.append('indexedLineSet').attr('coordIndex', '#{coordinateConnections}');
    return set.append('coordinate').attr('point', "" + coordinates);
  };


  /* setup the grid */

  gridSetup(bounds);


  /* shuffle between different views */


  /* there is a bug in the code */

  shuffleView = function() {

    /* what view are you currently on in terms of number */
    var initialNumber, newView, selectedNumber;
    initialNumber = document.getElementsByClassName('selected-view')[0].className.replace('button', '').replace('selected-view', '').replace('view', '').replace(/\s/, '');

    /* Look for the next view based on the initial number position */
    if (parseInt(initialNumber) < document.getElementsByClassName('camera-option')[0].children.length - 1) {
      selectedNumber = parseInt(initialNumber) + 1;
    } else {
      selectedNumber = 0;
    }
    newView = document.getElementsByClassName("" + ('view' + selectedNumber.toString()))[0];
    clearAllSelected('selected-view');

    /* give the new view the correct class name for the css */
    newView.className += " selected-view";

    /* call the new view so it will change the view of the 3D model */
    document.getElementById(newView.value).setAttribute('set_bind', 'true');
    display(data);
  };

  window.onload = function() {

    /* options setup. Initializes the button to proper function */
    var cameraButton, colorButton, _i, _j, _len, _len1, _ref, _ref1;
    _ref = document.getElementsByClassName('color-option')[0].children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      colorButton = _ref[_i];
      colorButton.onmouseover = toggleColor;
    }
    _ref1 = document.getElementsByClassName('camera-option')[0].children;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      cameraButton = _ref1[_j];
      cameraButton.onmouseover = toggleCamera;
    }

    /* this will turn off movement controls */

    /* document.getElementById('x3dElement').runtime.noNav() */
    display(data);

    /* this will toggle the grid transpareaancy */
    document.getElementById('grid-toggle').onclick = function() {
      if (document.getElementById('gridMaterial').transparency === "1.0") {
        document.getElementById('gridMaterial').transparency = ".65";
      } else {
        document.getElementById('gridMaterial').transparency = "1.0";
      }
    };

    /* if shuffle is clicked it will call shuffleView every 10sec */
    document.getElementById('view-shuffle').onclick = function() {
      var shuffleID;
      if (document.getElementById('view-shuffle').checked === true) {
        shuffleID = setInterval((function() {
          return shuffleView();
        }), 10000);
      } else {
        window.clearInterval(shuffleID);
      }
    };
  };

}).call(this);
