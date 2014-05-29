(function() {
  "use strict";

  /* Function rounds numbers to decimal certain decimal place */

  /* Takes in a num and a round to point */
  var RackInfo, bounds, clearAllSelected, data, findMaxNumbers, getRackColor, getTopLists, getTopThreeValues, isNumber, rackDataFunc, shuffleView, toggleCamera, toggleColor, x3d, x3dWrapper;

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


  /* could use underscore will implement t later */


  /* Returns if a value is a number or not */

  isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  RackInfo = function(componentId, name, height, rackWidth, rackDepth, rackOrientation, xPosition, yPosition, numberingOrigin, overlappingAllowed, coolingMax, weightMax, powerMax, largestUnitLocation, largestUnitSize, usedUnitsCurrent, usedUnitsPlanned, weightCurrent, weightPlanned, heatDissipationCurrent, heatDissipationPlanned, powerCurrent, powerPlanned, powerActual, powerActualDerivation, floorPlanWidth, floorPlanHeight) {
    var obj;
    obj = {};
    obj.componentId = componentId;
    obj.name = name;

    /* convert and adjust the rack height into proper units */

    /* I dont remember the converted units ask PF */
    obj.height = height * 44.5 / 1000;
    obj.width = rackWidth;
    obj.depth = rackDepth;
    obj.rackOrientation = rackOrientation;

    /* adjust x position to move it from the center to the left edge */
    obj.adjustedXPosition = (xPosition - floorPlanWidth / 2) / 1000;

    /* adjust y position to move it from the center to the top edge */
    obj.adjustedYPosition = (yPosition - floorPlanHeight / 2) / 1000;
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

    /* heat is calculate based off of power. watss to BTU's */
    obj.heatCurrent = powerCurrent * 3.412141633;
    obj.heatPlanned = powerPlanned * 3.412141633;
    obj.powerCurrent = powerCurrent;
    obj.powerPlanned = powerPlanned;
    obj.powerActual = powerActual;
    obj.powerActualDerivation = powerActualDerivation;

    /* adjust the floorplan by a scale of 1000 */

    /* this is matched with the height */
    obj.floorPlanWidth = floorPlanWidth / 1000;
    obj.floorPlanHeight = floorPlanHeight / 1000;
    return obj;
  };


  /* This variable will contail all information about the racks */

  data = [];


  /* Manually put rackinformation into the data variable */

  data.push(new RackInfo(1470, "50M", 42, 483, 0, 0, 4250, 3650, 0, 1, 35000, 500, "NULL", 1, 41, 1, 0, 16, 0, 102, 0, "NULL", 0, 115, 1, 1500, 700));

  data.push(new RackInfo(1471, "50N", 42, 483, 0, 0, 4250, 2950, 0, 1, 35000, 500, 300, 1, 35, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1472, "50O", 42, 483, 0, 0, 4250, 2250, 0, 1, 35000, 500, 10000, 16, 27, 15, 0, 172.8, 0, 12700, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1473, "50P", 42, 483, 0, 0, 4250, 1550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1500, "50Q", 42, 483, 0, 0, 4250, 150, 1, 1, 35000, 500, 10000, 11, 22, 10, 0, 0, 0, 0, 0, 5600, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1501, "50R", 42, 483, 0, 0, 4250, -550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1502, "50S", 42, 483, 0, 0, 4250, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1503, "50T Tile", 42, 483, 0, 0, "NULL", -1950, 0, 1, 35000, 500, 10000, 1, 31, 11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1504, "50U", 42, 483, 0, 0, 4250, -2650, 0, 1, 35000, 500, 10000, 1, 32, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1474, "51M", 42, 483, 0, 0, 1450, 3650, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1475, "51N", 42, 483, 0, 0, 1450, 2950, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1476, "51O", 42, 483, 0, 0, 1450, 2250, 0, 1, 35000, 500, 10000, 1, 38, 4, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1477, "51P", 42, 483, 0, 0, 1450, 1550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1478, "51Q", 42, 483, 0, 0, 1450, 850, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1479, "51R", 42, 483, 0, 0, 1450, 150, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1480, "51S", 42, 483, 0, 0, 1450, -550, 0, 1, 35000, 500, 10000, 1, 38, 4, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1481, "51T", 42, 483, 0, 0, 1450, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 86, 0, 5457, 0, 1300, 0, 1300, 1, 1500, 700));

  data.push(new RackInfo(1482, "51U", 42, 483, 0, 0, 1450, -1950, 0, 1, 35000, 500, 10000, 1, 36, 6, 0, 136, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfo(1483, "51V", 42, 483, 0, 0, 1450, -2650, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 136, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfo(1484, "51W", 42, 483, 0, 0, 1450, -3350, 1, 1, 35000, 500, 10000, 1, 37, 3, 0, 136, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfo(1510, "51X", 42, 483, 0, 0, 1450, -4050, 0, 1, 35000, 500, 10000, 1, 15, 16, 0, 422, 0, 32789, 0, 5600, 0, 5600, 1, 1500, 700));

  data.push(new RackInfo(1485, "52L", 42, 483, 0, 0, -1350, 4350, 0, 1, 35000, 500, 10000, 1, 36, 2, 0, 68, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfo(1486, "52M", 42, 483, 0, 0, -1350, 3650, 0, 1, 35000, 500, 10000, 1, 36, 6, 0, 68, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfo(1487, "52N", 42, 483, 0, 0, -1350, 2950, 0, 1, 35000, 500, 10000, 1, 36, 2, 0, 68, 0, 9832, 0, 1900, 0, 1900, 1, 1500, 700));

  data.push(new RackInfo(1488, "52O", 42, 483, 0, 0, -1350, 2250, 0, 1, 35000, 500, 10000, 1, 28, 14, 0, 154, 0, 20746, 0, 4500, 0, 4500, 1, 1500, 700));

  data.push(new RackInfo(1489, "52P", 42, 483, 0, 0, -1350, 1550, 0, 1, 35000, 500, 10000, 1, 24, 14, 0, 204, 0, 29496, 0, 5700, 0, 5700, 1, 1500, 700));

  data.push(new RackInfo(1490, "52Q", 42, 483, 0, 0, -1350, "NULL", 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1491, "52R", 42, 483, 0, 0, -1350, 150, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1492, "52S", 42, 483, 0, 0, -1350, -550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 5700, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1493, "52T", 42, 483, 0, 0, -1350, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1511, "52U", 42, 483, 0, 0, -1350, -1950, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1512, "52V", 42, 483, 0, 0, "NULL", "NULL", 0, 1, 35000, 500, 10000, 1, 28, 10, 0, 161, 0, 24039, 0, 4400, 0, 4400, 1, 1500, 700));

  data.push(new RackInfo(1494, "52W", 42, 483, 0, 0, -1350, -3350, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1495, "52X", 42, 483, 0, 0, -1350, -4050, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1496, "53M", 42, 483, 0, 0, -4150, 3650, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1497, "53N Tile", 42, 483, 0, 0, -4150, 2950, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1498, "53O", 42, 483, 0, 0, -4150, 2250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1499, "53P", 42, 483, 0, 0, -4150, 1550, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1505, "53Q", 42, 483, 0, 0, -4150, 150, 0, 1, 35000, 500, 10000, 1, 32, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1506, "53R", 42, 483, 0, 0, "NULL", -550, 0, 1, 35000, 500, 10000, 1, 26, 16, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1507, "53S", 42, 483, 0, 0, -4150, -1250, 0, 1, 35000, 500, 10000, 1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1508, "53T", 42, 483, 0, 0, -4150, -1950, 0, 1, 35000, 500, 10000, 1, 30, 12, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));

  data.push(new RackInfo(1509, "53U", 42, 483, 0, 0, -4150, -2650, 0, 1, 35000, 500, 10000, 1, 32, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1500, 700));


  /* This will filter out racks that do not have the right properties */


  /* Data cannot be named Tile, must have x, y position, width, and height */

  data = data.filter(function(data) {
    return data.name.indexOf("Tile") === -1 && isNumber(data.adjustedXPosition) && isNumber(data.adjustedYPosition) && isNumber(data.floorPlanWidth) && isNumber(data.floorPlanHeight);
  });


  /* bounds - object that contains info on the size and scale of the grid */

  bounds = {

    /* initialize the values to extremes to find actual value */

    /* not sure i need this anymore if I am getting values from data */

    /* will relook at this later */
    boundingBox: {
      minX: Number.MAX_VALUE,
      maxX: Number.MIN_VALUE,
      minY: Number.MAX_VALUE,
      maxY: Number.MIN_VALUE
    },

    /* find the max width and height of a rack to extend the grid and views */
    maxWidth: 0,
    maxHeight: 0,

    /* Recalculate the bounds based on the data */

    /* Was used if i want to change plans. Need to relook at the scale. */
    setBounds: function() {

      /* Will find the min and max values for x and y position */
      this.boundingBox.minX = Math.roundTo(d3.min(data, function(data) {
        return data.adjustedXPosition;
      }), 2);
      this.boundingBox.maxX = Math.roundTo(d3.max(data, function(data) {
        return data.adjustedXPosition;
      }), 2);
      this.boundingBox.minY = Math.roundTo(d3.min(data, function(data) {
        return data.adjustedYPosition;
      }), 2);
      this.boundingBox.maxY = Math.roundTo(d3.max(data, function(data) {
        return data.adjustedYPosition;
      }), 2);

      /* Will find the max width and height */
      this.maxWidth = Math.roundTo(d3.max(data, function(data) {
        return data.floorPlanWidth;
      }), 2);
      this.maxHeight = Math.roundTo(d3.max(data, function(data) {
        return data.floorPlanHeight;
      }), 2);
    },

    /* Returns the front distance needed for view */
    getFrontDistance: function() {
      return this.boundingBox.minY - this.maxHeight - (this.boundingBox.maxY - this.boundingBox.minX);
    },

    /* Returns the back distance needed for view */
    getBackDistance: function() {
      return this.getFrontDistance() * -1;
    },

    /* Returns the front distance needed for view */
    getSideDistance: function() {
      return this.boundingBox.maxX + this.maxWidth + (this.boundingBox.maxY - this.boundingBox.minY);
    },

    /* Returns the back distance needed for view */
    getTopDistance: function() {
      return this.boundingBox.maxX - this.boundingBox.minY + this.boundingBox.maxY - this.boundingBox.minY;
    }
  };

  bounds.setBounds();

  x3d = d3.select("#x3dElement").attr("height", "400px").attr("width", "700px");

  x3dWrapper = {

    /* Target the main x3d element */

    /* There is one scene element per x3d element */
    scene: x3d.append("scene"),

    /* Append the different viewpoints to the scene */
    createViewpoint: function(id, centerOfRotation, position, orientation, fieldOfView) {
      this.scene.append('viewpoint').attr("id", id).attr("centerOfRotation", centerOfRotation).attr("position", position).attr("orientation", orientation).attr("fieldOfView", fieldOfView);
    },

    /* Append the different lights to the scene */

    /* Color - input is a 0 to 1 value for r, g, and b */
    createPointlight: function(intensity, color, attenuation, location, radius) {
      this.scene.append("pointLight").attr('intensity', intensity).attr('color', color).attr('attenuation', attenuation).attr('location', location).attr('radius', radius);
    },

    /* Main display function */
    display: function(data) {

      /* for every piece of data */
      var shapesEnter, transforms;
      transforms = this.scene.selectAll('transform').data(data);

      /* Append a transform and a shape to each transform */

      /* they have a unique id and a class of rack */

      /* id and class are not needed yet. Plan to use them for hover over */
      shapesEnter = transforms.enter().append('transform').append('shape').data(data).attr('id', function(data) {
        return 'rack' + data.componentId;
      }).attr('class', 'rack');

      /* give each transform some transitions to move the boxes */
      transforms.transition().attr('translation', function(data) {
        return data.adjustedXPosition + ' ' + data.adjustedYPosition + ' 0.0';
      });

      /* append a material to each shape with a material element within it */
      shapesEnter.append('appearance').append('material');

      /* in the material set the color by calling the getRackColor function */

      /* contains some transitions between colors */
      this.scene.selectAll('material').data(data).transition().duration(1000).delay(500).attr('diffuseColor', function(data) {
        return getRackColor(data);
      });

      /* append a box to each shape */

      /* set the size of each box to the data of the rack */
      shapesEnter.append('box').data(data).attr('size', function(data) {
        return data.floorPlanWidth + ' ' + (data.floorPlanHeight - 0.1) + ' ' + data.height;
      });

      /* Not sure what this does here is more info
      https://github.com/mbostock/d3/wiki/Selections
       */
      transforms.exit();

      /* update the leaders of each property */
      getTopLists(data);
    },
    setupGrid: function(bounds) {

      /* Attach a shape to the scene */

      /* Give it a light grey color with transparency */
      var connections, coordinateConnections, coordinates, gridHeightEnd, gridHeightStart, gridStart, gridWidthEnd, gridWidthStart, set, shape;
      shape = this.scene.append('Transform').append('shape').attr('id', 'grid');
      shape.append('appearance').append('material').attr('id', 'gridMaterial').attr('diffuseColor', '0.8, 0.8, 0.8').attr('transparency', '0.65');

      /* coordinateConnections: string representing connection of coordinates
        all coordinates are connected until it reaches a -1
        1, 2, -1, 3, 4 will connect coordinate 1 and 2
        but will not connect coordinate 2 and 3
       */
      coordinateConnections = "";

      /* coordinates is a string representing the coordinates (x, y, z) */
      coordinates = "";

      /* connections signifies what set of line user is on */
      connections = 0;

      /* rounding to a .6 because that is the standard grid interval */
      gridHeightStart = Math.roundTo(Math.ceil((bounds.boundingBox.minY - bounds.maxHeight) / 0.6 - 1) * 0.6, 2);
      gridHeightEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxY + bounds.maxHeight) / 0.6 + 1) * 0.6, 2);
      gridWidthStart = Math.roundTo(Math.ceil((bounds.boundingBox.minX - bounds.maxWidth) / 0.6 - 1) * 0.6, 2);
      gridWidthEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxX + bounds.maxWidth) / 0.6 + 1) * 0.6, 2);

      /* Verticle lines on the Grid */
      gridStart = gridWidthStart;
      while (gridStart <= gridWidthEnd) {
        coordinates += "" + gridStart + " " + gridHeightStart + " -1 ";
        coordinates += "" + gridStart + " " + gridHeightEnd + " -1 ";
        coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
        gridStart = Math.roundTo(gridStart + 0.6, 2);
        connections += 2;
      }

      /* Horizontal Lines on the Grid */
      gridStart = gridHeightStart;
      while (gridStart <= gridHeightEnd) {
        coordinates += "" + gridWidthStart + " " + gridStart + " -1 ";
        coordinates += "" + gridWidthEnd + " " + gridStart + " -1 ";
        coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
        gridStart = Math.roundTo(gridStart + 0.6, 2);
        connections += 2;
      }

      /* set the final strings to the proper place */
      set = shape.append('indexedLineSet').attr('coordIndex', '#{coordinateConnections}');
      return set.append('coordinate').attr('point', "" + coordinates);
    }
  };


  /* Create some views */

  x3dWrapper.createViewpoint("Top View", "0 0 0", "0 0 " + (bounds.getTopDistance()), "0.0 0.0 0.0 0.0", '0.75');

  x3dWrapper.createViewpoint("Front View", "0 0 0", "0 " + (bounds.getFrontDistance()) + " 0", "1.0 0.0 0.0 1.570", '0.95');

  x3dWrapper.createViewpoint("Left View", "0 0 0", "" + (-1 * bounds.getSideDistance()) + " 0 0", "-0.50 0.50 0.5 " + (2.093 * 2), '0.75');

  x3dWrapper.createViewpoint("Right View", "0 0 0", "" + (bounds.getSideDistance()) + " 0 0.25", "0.50 0.50 0.50 2.093", '0.75');

  x3dWrapper.createViewpoint("Back View", "0 0 0", "0 " + (bounds.getBackDistance()) + " -.5", "0.0 0.75 0.65 3.14", '0.95');

  x3dWrapper.createViewpoint("Perspective", "0 0 0", "" + (bounds.getBackDistance() / 3) + " " + (-bounds.getSideDistance()) + " " + (bounds.getTopDistance() / 3), "1.0 0.25 0.25 1.25", '0.95');


  /* Custom View Removed */


  /* Create a Right and Left point Light */

  x3dWrapper.createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000', "" + (bounds.getSideDistance()) + " 0 0", '200.0');

  x3dWrapper.createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000', "" + (-1 * bounds.getSideDistance()) + " 0 0", '200.0');


  /* Dummy function that is supposed to act as a tool tip */


  /* Not implemented - Future will add a template */

  rackDataFunc = function(data) {};


  /* finds max number of a specific property within the data */

  findMaxNumbers = function(data, property, length) {
    var findMax, iterator, limit, list;
    list = [];
    iterator = 0;
    limit = Number.MAX_VALUE;
    findMax = function(data, limit) {
      return d3.max(data, function(data) {
        var value;
        value = data[property];
        if (isNumber(value) && value < limit) {
          return value;
        }
      });
    };
    while (iterator < length) {
      list[iterator] = findMax(data, limit);
      limit = list[iterator];
      iterator++;
    }
    return list;
  };


  /* displays the top 3 leaders of one property */

  getTopThreeValues = function(data, property, className, units) {
    var counter, dataSubset, datum, filterData, maxValueList, stringValues, target, _i, _len;
    maxValueList = findMaxNumbers(data, property, 3);
    stringValues = [];

    /* Dummy Function used to avoid making function in loop */

    /* Filters all data that match the same property */
    filterData = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        datum = data[_i];
        _results.push(datum[property] === maxValueList[counter]);
      }
      return _results;
    })();
    counter = 0;
    while (counter < maxValueList.length) {

      /* filter out all data with a particular value */
      dataSubset = filterData();

      /* change value to a string and add the units */
      stringValues[counter] = maxValueList[counter] + units + " rack" + (dataSubset.length > 1 ? "s:" : ":");

      /* add the names of the rack to the string */
      for (_i = 0, _len = dataSubset.length; _i < _len; _i++) {
        datum = dataSubset[_i];
        stringValues[counter] += " " + datum.name;
      }

      /* add the number of rack to the string */
      stringValues[counter] += " (" + dataSubset.length + " total)";
      counter++;
    }
    counter = 0;

    /* write the string into the innerHTML */
    while (counter < maxValueList.length) {
      target = className + (counter + 1);
      document.getElementsByClassName(target)[0].innerHTML = stringValues[counter];
      counter++;
    }
  };


  /* find the top three leaders of all these properties */


  /* some of the units are padding with a space */

  getTopLists = function(data) {
    getTopThreeValues(data, "powerCurrent", "power", " watts");
    getTopThreeValues(data, "heatCurrent", "heat", "BTUs");
    getTopThreeValues(data, "weightCurrent", "weight", "lb");
    getTopThreeValues(data, "usedUnitsCurrent", "used-units", " used units");
    getTopThreeValues(data, "largestUnitLocation", "largest-unit-location", "");
    getTopThreeValues(data, "largestUnitSize", "largest-unit-size", " unit size");
  };

  getTopLists(data);


  /* Remove all classes of a certain type */

  clearAllSelected = function(className) {
    var allSelected;
    allSelected = document.getElementsByClassName(className);

    /* For every item in the list remove it from the class list */
    while (allSelected.length) {
      allSelected[0].className = allSelected[0].className.replace(className, '');
    }

    /* Will Use jQuery .removeClass(str) */
  };


  /* this runs on a set interval just in case the data changes */

  setInterval((function() {
    return x3dWrapper.display(data);
  }), 10000);

  getRackColor = function(data) {
    var badDataFlag, color, green, greenString, red, redString, value;
    badDataFlag = false;

    /* look at what color is selected */
    switch (document.getElementsByClassName('selected-color')[0].value) {
      case "Power":
        value = data.powerCurrent / data.powerMax;
        if (!isNumber(value)) {
          badDataFlag = true;
        }
        break;
      case "Weight":
        value = data.weightCurrent / data.weightMax;
        if (!isNumber(value)) {
          badDataFlag = true;
        }
        break;
      case "Temperature":
        value = data.heatCurrent / data.coolingMax;
        if (!isNumber(value)) {
          badDataFlag = true;
        }
        break;
      default:
        badDataFlag = true;
    }

    /* change color based on max value and current value */

    /* color will be on a scale of green to red */
    if (value < 0.5) {
      red = Math.floor(value * 255);
      green = 200;
    } else {
      red = 255;
      green = Math.floor((1 - value) * 255);
    }

    /* Convert the red and green decimal values into a hex value */

    /* no ternary in coffeescript */
    redString = (red < 16 ? "0" : "") + red.toString(16);
    greenString = (green < 16 ? "0" : "") + green.toString(16);
    color = "#" + redString + greenString + "00";
    if (badDataFlag) {
      color = "steelblue";
    }
    return color;
  };


  /* remove all .selected-view and asign it to a the called item */

  toggleCamera = function() {
    clearAllSelected('selected-view');
    this.className += " selected-view";

    /* To activate a viewpoint you set "set_bind" to true */
    document.getElementById(this.value).setAttribute('set_bind', 'true');
  };


  /* remove all .selected-color and asign it to a the called item */

  toggleColor = function() {
    clearAllSelected('selected-color');
    this.className += " selected-color";

    /* redisplay the color to show changed color */
    x3dWrapper.display(data);
  };


  /* setup the grid */

  x3dWrapper.setupGrid(bounds);


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
    newView = document.getElementsByClassName("" + ('view' + selectedNumber))[0];
    clearAllSelected('selected-view');

    /* give the new view the correct class name for the css */
    newView.className += " selected-view";

    /* call the new view so it will change the view of the 3D model */
    document.getElementById(newView.value).setAttribute('set_bind', 'true');
    x3dWrapper.display(data);
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
    x3dWrapper.display(data);

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

      /* shuffleId is declared outside the scope of the if
          coffeescript automatically declares variables at the next level
       */
      var shuffleId;
      if (document.getElementById('view-shuffle').checked === true) {
        shuffleId = setInterval((function() {
          return shuffleView();
        }), 10000);
      } else {
        window.clearInterval(shuffleId);
      }
    };
  };

}).call(this);
