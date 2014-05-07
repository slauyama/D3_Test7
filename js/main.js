(function() {
  "use strict";
  var HIGH_NUM, RackInfoConstructor, backDistance, bounds, clearAllSelected, data, display, frontDistance, gridSetup, isNumber, rackDataFunc, scene, setRackColor, shuffleView, sideDistance, toggleCamera, toggleColor, topDataRacks, topDistance, topThreeLeader, x3d, zoomIn;

  Math.roundTo = function(num, amount) {
    if (amount == null) {
      amount = 0;
    }
    return Math.round(num * Math.pow(10, amount)) / Math.pow(10, amount);
  };

  console.logDate = function() {
    var timestamp;
    if (arguments.length) {
      timestamp = '[' + new Date().toUTCString() + '] ';
      return console.log(timestamp, arguments);
    }
  };

  isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

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
    obj.temperatureCurrent = heatDissipationCurrent;
    obj.temperaturePlanned = heatDissipationPlanned;
    obj.powerCurrent = powerCurrent;
    obj.powerPlanned = powerPlanned;
    obj.powerActual = powerActual;
    obj.powerActualDerivation = powerActualDerivation;
    obj.floorPlanWidth = floorPlanWidth / 1000;
    obj.floorPlanHeight = floorPlanHeight / 1000;
    return obj;
  };

  data = [];

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

  console.log(data.length);

  data = data.filter(function(d) {
    return d.name.indexOf("Tile") === -1 && isNumber(d.xPosition) && isNumber(d.yPosition) && isNumber(d.floorPlanWidth) && isNumber(d.floorPlanHeight);
  });

  console.log(data.length);

  bounds = {
    boundingBox: {
      minX: HIGH_NUM,
      maxX: -HIGH_NUM,
      minY: HIGH_NUM,
      maxY: -HIGH_NUM
    },
    maxWidth: -HIGH_NUM,
    maxHeight: -HIGH_NUM,
    resetBounds: function() {
      this.boundingBox.minX = this.boundingBox.minY = HIGH_NUM;
      this.boundingBox.maxX = this.boundingBox.maxY = -HIGH_NUM;
      this.maxWidth = this.maxHeight = -HIGH_NUM;
    },
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

  frontDistance = bounds.boundingBox.minY - bounds.maxHeight - (bounds.boundingBox.maxX - bounds.boundingBox.minX);

  backDistance = -frontDistance;

  sideDistance = bounds.boundingBox.maxX + bounds.maxWidth + (bounds.boundingBox.maxY - bounds.boundingBox.minY);

  topDistance = (bounds.boundingBox.maxX - bounds.boundingBox.minY) + (bounds.boundingBox.maxY - bounds.boundingBox.minY);

  x3d = d3.select("#x3dElement").attr("height", "400px").attr("width", "700px");

  zoomIn = x3d.append('button').attr('id', "zoom-in");

  document.getElementById('zoom-in').innerHTML = "Zoom In";

  zoomIn = x3d.append('button').attr('id', "zoom-out");

  document.getElementById('zoom-out').innerHTML = "Zoom Out";

  scene = x3d.append("scene");

  scene.append("viewpoint").attr("id", "Top View").attr("centerOfRotation", "0 0 0").attr("position", "0 0 " + topDistance).attr("orientation", "0.0 0.0 0.0 0.0").attr("fieldOfView", '0.75');

  scene.append("viewpoint").attr("id", "Front View").attr("centerOfRotation", "0 0 0").attr("position", "0 " + frontDistance + " 0").attr("orientation", "1.0 0.0 0.0 1.570").attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Left View").attr("centerOfRotation", "0 0 0").attr("position", "" + (-sideDistance) + " 0 0.25").attr("orientation", "-0.50 0.50 0.50 " + (2.093 * 2)).attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Right View").attr("centerOfRotation", "0 0 0").attr("position", "" + sideDistance + " 0 0.25").attr("orientation", "0.50 0.50 0.50 2.093").attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Back View").attr("centerOfRotation", "0 0 0").attr("position", "0.0 " + backDistance + " -.50").attr("orientation", "0.0 0.75 0.65 3.14").attr("fieldOfView", '0.95');

  scene.append("viewpoint").attr("id", "Perspective").attr("centerOfRotation", "0 0 0").attr("position", "" + (backDistance / 3) + " " + (-sideDistance) + " " + (topDistance / 3)).attr("orientation", "1.0 0.25 0.25 1.25").attr("fieldOfView", '0.95');

  scene.append("PointLight").attr("on", "TRUE").attr('intensity', '.50').attr('color', '1.0 1.0 1.0').attr('attenuation', '1.0000 0.0000 0.0000').attr('location', "" + sideDistance + " 0 0").attr('radius', '200.0');

  scene.append("PointLight").attr("on", "TRUE").attr('intensity', '.50').attr('color', '1.0 1.0 1.0').attr('attenuation', '1.0000 0.0000 0.0000').attr('location', "" + (-sideDistance) + " 0 0").attr('radius', '200.0');

  HIGH_NUM = 9007199254740992;

  rackDataFunc = function(data) {
    console.log("justforshure");
  };

  topThreeLeader = function(data, property, className, units) {
    var dataSubset, max;
    max = [];
    max[0] = d3.max(data, function(d) {
      if (typeof d[property.toString()] === "number") {
        return d[property.toString()];
      }
    });
    max[1] = d3.max(data, function(d) {
      if (typeof d[property.toString()] === "number" && d[property.toString()] < max[0]) {
        return d[property.toString()];
      }
    });
    max[2] = d3.max(data, function(d) {
      if (typeof d[property.toString()] === "number" && d[property.toString()] < max[1]) {
        return d[property.toString()];
      }
    });
    dataSubset = data.filter(function(d) {
      return d[property.toString()] === max[0];
    });
    max[0] = max[0].toString() + units.toString() + " rack" + (dataSubset.length > 1 ? "s:" : ":");
    dataSubset.forEach(function(d) {
      return max[0] += " " + d.name;
    });
    max[0] += " (" + dataSubset.length + " total)";
    dataSubset = data.filter(function(d) {
      return d[property.toString()] === max[1];
    });
    max[1] = max[1].toString() + units.toString() + " rack" + (dataSubset.length > 1 ? "s:" : ":");
    dataSubset.forEach(function(d) {
      return max[1] += " " + d.name;
    });
    max[1] += " (" + dataSubset.length + " total)";
    dataSubset = data.filter(function(d) {
      return d[property.toString()] === max[2];
    });
    max[2] = max[2].toString() + units.toString() + " rack" + (dataSubset.length > 1 ? "s:" : ":");
    dataSubset.forEach(function(d) {
      return max[2] += " " + d.name;
    });
    max[2] += " (" + dataSubset.length + " total)";
    document.getElementsByClassName(className.toString() + "1")[0].innerHTML = max[0];
    document.getElementsByClassName(className.toString() + "2")[0].innerHTML = max[1];
    document.getElementsByClassName(className.toString() + "3")[0].innerHTML = max[2];
  };

  topDataRacks = function(data) {
    topThreeLeader(data, "powerCurrent", "power", " ohms");
    topThreeLeader(data, "temperatureCurrent", "temperature", "&#186;K");
    topThreeLeader(data, "weightCurrent", "weight", "lb");
    topThreeLeader(data, "usedUnitsCurrent", "used-units", " used units");
    topThreeLeader(data, "largestUnitLocation", "largest-unit-location", " units");
    topThreeLeader(data, "largestUnitSize", "largest-unit-size", " unit size");
  };

  clearAllSelected = function(str) {
    var allSelected;
    allSelected = document.getElementsByClassName(str);
    while (allSelected.length) {
      allSelected[0].className = allSelected[0].className.replace(str, '');
    }
  };

  display = function(data) {
    var shapesEnter, transforms;
    transforms = scene.selectAll('transform').data(data);
    shapesEnter = transforms.enter().append('transform').append('shape').data(data).attr('id', function(d) {
      return 'rack' + d.componentID;
    }).attr('class', 'rack');
    transforms.transition().attr('translation', function(d, i) {
      return d.xPosition + ' ' + d.yPosition + ' 0.0';
    });
    shapesEnter.append('appearance').append('material');
    scene.selectAll('material').data(data).transition().duration(1000).delay(500).attr('diffuseColor', function(d) {
      return setRackColor(d);
    });
    shapesEnter.append('box').data(data).attr('size', function(d) {
      return d.floorPlanWidth + ' ' + (d.floorPlanHeight - 0.1) + ' ' + d.rackUnitHeight;
    });
    topDataRacks(data);
  };

  setInterval((function() {
    return display(data);
  }), 10000);

  setRackColor = function(data) {
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
    if (value === "steelblue") {
      return "steelblue";
    }
    if (value < 0.5) {
      r = Math.floor(value * 255);
      g = 200;
    } else {
      r = 255;
      g = Math.floor((1 - value) * 255);
    }
    return "#" + (r < 16 ? "0" : "") + r.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + "00";
  };

  toggleCamera = function() {
    clearAllSelected('selected-view');
    this.className += " selected-view";
    document.getElementById(this.value).setAttribute('set_bind', 'true');
  };

  toggleColor = function() {
    clearAllSelected('selected-color');
    this.className += " selected-color";
    return display(data);
  };

  gridSetup = function(bounds) {
    var coordinateString, gridHeightEnd, gridHeightStart, gridStart, gridWidthEnd, gridWidthStart, lineString, lineset, set, shape;
    shape = scene.append('Transform').append('Shape').attr('id', 'grid');
    shape.append('Appearance').append('Material').attr('id', 'gridMaterial').attr('diffuseColor', '0.8, 0.8, 0.8').attr('transparency', '0.65');
    coordinateString = "";
    lineString = "";
    lineset = 0;
    gridHeightStart = Math.roundTo(Math.ceil((bounds.boundingBox.minY - bounds.maxHeight) / 0.6 - 1) * 0.6, 2);
    gridHeightEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxY + bounds.maxHeight) / 0.6 + 1) * 0.6, 2);
    gridWidthStart = Math.roundTo(Math.ceil((bounds.boundingBox.minX - bounds.maxWidth) / 0.6 - 1) * 0.6, 2);
    gridWidthEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxX + bounds.maxWidth) / 0.6 + 1) * 0.6, 2);
    gridStart = gridWidthStart;
    while (gridStart <= gridWidthEnd) {
      lineString += "" + gridStart + " " + gridHeightStart + " -1 " + gridStart + " " + gridHeightEnd + " -1 ";
      coordinateString += "" + lineset + " " + (lineset + 1) + " -1 ";
      gridStart = Math.roundTo(gridStart + 0.6, 2);
      lineset += 2;
    }
    gridStart = gridHeightStart;
    while (gridStart <= gridHeightEnd) {
      lineString += "" + gridWidthStart + " " + gridStart + " -1 " + gridWidthEnd + " " + gridStart + " -1 ";
      coordinateString += "" + lineset + " " + (lineset + 1) + " -1 ";
      gridStart = Math.roundTo(gridStart + 0.6, 2);
      lineset += 2;
    }
    set = shape.append('IndexedLineSet').attr('coordIndex', '#{coordinateString}');
    return set.append('Coordinate').attr('point', "" + lineString);
  };

  gridSetup(bounds);

  shuffleView = function() {
    var initialNumber, newView, selectedNumber;
    initialNumber = document.getElementsByClassName('selected-view')[0].className.replace('button', '').replace('selected-view', '').replace('view', '').replace(/\s/, '');
    if (parseInt(initialNumber) < document.getElementsByClassName('camera-option')[0].children.length - 1) {
      selectedNumber = parseInt(initialNumber) + 1;
    } else {
      selectedNumber = 0;
    }
    newView = document.getElementsByClassName("" + ('view' + selectedNumber.toString()))[0];
    clearAllSelected('selected-view');
    newView.className += " selected-view";
    document.getElementById(newView.value).setAttribute('set_bind', 'true');
    display(data);
  };

  window.onload = function() {
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
    display(data);
    document.getElementById('grid-toggle').onclick = function() {
      if (document.getElementById('gridMaterial').transparency === "1.0") {
        document.getElementById('gridMaterial').transparency = ".65";
      } else {
        document.getElementById('gridMaterial').transparency = "1.0";
      }
    };
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
