RackInfo = (componentId, name, height, rackWidth, rackDepth,
   rackOrientation, xPosition, yPosition, numberingOrigin, overlappingAllowed,
   coolingMax, weightMax, powerMax, largestUnitLocation, largestUnitSize,
   usedUnitsCurrent, usedUnitsPlanned, weightCurrent, weightPlanned,
   heatDissipationCurrent, heatDissipationPlanned, powerCurrent, powerPlanned,
   powerActual, powerActualDerivation, floorPlanWidth, floorPlanHeight) ->
  obj = {}
  obj.componentId = componentId
  obj.name = name
  ### convert and adjust the rack height into proper units ###
  ### I dont remember the converted units ask PF ###
  obj.height = height * 44.5 / 1000
  obj.width = rackWidth
  obj.depth = rackDepth
  obj.rackOrientation = rackOrientation
  ### adjust x position to move it from the center to the left edge ###
  obj.adjustedXPosition = (xPosition - floorPlanWidth / 2) / 1000
  ### adjust y position to move it from the center to the top edge ###
  obj.adjustedYPosition = (yPosition - floorPlanHeight / 2) / 1000
  obj.numberingOrigin = numberingOrigin
  obj.overlappingAllowed = overlappingAllowed
  obj.coolingMax = coolingMax
  obj.weightMax = weightMax
  obj.powerMax = powerMax
  obj.largestUnitLocation = largestUnitLocation
  obj.largestUnitSize = largestUnitSize
  obj.usedUnitsCurrent = usedUnitsCurrent
  obj.usedUnitsPlanned = usedUnitsPlanned
  obj.weightCurrent = weightCurrent
  obj.weightPlanned = weightPlanned
  ### heat is calculate based off of power. watss to BTU's ###
  obj.heatCurrent = powerCurrent * 3.412141633
  obj.heatPlanned = powerPlanned * 3.412141633
  obj.powerCurrent = powerCurrent
  obj.powerPlanned = powerPlanned
  obj.powerActual = powerActual
  obj.powerActualDerivation = powerActualDerivation
  ### adjust the floorplan by a scale of 1000 ###
  ### this is matched with the height ###
  obj.floorPlanWidth = floorPlanWidth / 1000
  obj.floorPlanHeight = floorPlanHeight / 1000
  return obj

### This variable will contail all information about the racks ###
data = []

### Manually put rackinformation into the data variable ###
data.push(new RackInfo(1470, "50M", 42, 483, 0, 0, 4250,   3650, 0,
   1, 35000, 500, "NULL", 1,  41, 1,  0, 16,    0,   102,   0, "NULL",   0, 115
   , 1, 1500, 700))
data.push(new RackInfo(1471, "50N", 42, 483, 0, 0, 4250,   2950, 0,
   1, 35000, 500, 300,   1,  35, 5,  0, 0,     0,   0,     0, 0,     0, 0,    1
   , 1500, 700))
data.push(new RackInfo(1472, "50O", 42, 483, 0, 0, 4250,   2250, 0,
 1, 35000, 500, 10000, 16, 27, 15, 0, 172.8, 0,   12700, 0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1473, "50P", 42, 483, 0, 0, 4250,   1550, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1500, "50Q", 42, 483, 0, 0, 4250,   150,  1,
 1, 35000, 500, 10000, 11, 22, 10, 0, 0,     0,   0,     0, 5600,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1501, "50R", 42, 483, 0, 0, 4250,  -550,  0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1502, "50S", 42, 483, 0, 0, 4250,  -1250, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1503, "50T Tile", 42, 483, 0, 0, "NULL",  -1950, 0,
 1, 35000, 500, 10000, 1,  31, 11, 0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1504, "50U", 42, 483, 0, 0, 4250,  -2650, 0,
 1, 35000, 500, 10000, 1,  32, 10, 0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1474, "51M", 42, 483, 0, 0, 1450,   3650, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1475, "51N", 42, 483, 0, 0, 1450,   2950, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1476, "51O", 42, 483, 0, 0, 1450,   2250, 0,
 1, 35000, 500, 10000, 1,  38, 4,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1477, "51P", 42, 483, 0, 0, 1450,   1550, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1478, "51Q", 42, 483, 0, 0, 1450,   850,  0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1479, "51R", 42, 483, 0, 0, 1450,   150,  0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1480, "51S", 42, 483, 0, 0, 1450,  -550,  0,
 1, 35000, 500, 10000, 1,  38, 4,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1481, "51T", 42, 483, 0, 0, 1450,  -1250, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
  1, 1500, 700))
data.push(new RackInfo(1482, "51U", 42, 483, 0, 0, 1450,  -1950, 0,
 1, 35000, 500, 10000, 1,  36, 6,  0, 136,   0,   9832,  0, 1900,  0, 1900,
  1, 1500, 700))
data.push(new RackInfo(1483, "51V", 42, 483, 0, 0, 1450,  -2650, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 136,   0,   9832,  0, 1900,  0, 1900,
  1, 1500, 700))
data.push(new RackInfo(1484, "51W", 42, 483, 0, 0, 1450,  -3350, 1,
 1, 35000, 500, 10000, 1,  37, 3,  0, 136,   0,   9832,  0, 1900,  0, 1900,
  1, 1500, 700))
data.push(new RackInfo(1510, "51X", 42, 483, 0, 0, 1450,  -4050, 0,
 1, 35000, 500, 10000, 1,  15, 16, 0, 422,   0,   32789, 0, 5600,  0, 5600,
  1, 1500, 700))
data.push(new RackInfo(1485, "52L", 42, 483, 0, 0, -1350,  4350, 0,
 1, 35000, 500, 10000, 1,  36, 2,  0, 68,    0,   9832,  0, 1900,  0, 1900,
  1, 1500, 700))
data.push(new RackInfo(1486, "52M", 42, 483, 0, 0, -1350,  3650, 0,
 1, 35000, 500, 10000, 1,  36, 6,  0, 68,    0,   9832,  0, 1900,  0, 1900,
  1, 1500, 700))
data.push(new RackInfo(1487, "52N", 42, 483, 0, 0, -1350,  2950, 0,
 1, 35000, 500, 10000, 1,  36, 2,  0, 68,    0,   9832,  0, 1900,  0, 1900,
  1, 1500, 700))
data.push(new RackInfo(1488, "52O", 42, 483, 0, 0, -1350,  2250, 0,
 1, 35000, 500, 10000, 1,  28, 14, 0, 154,   0,   20746, 0, 4500,  0, 4500,
  1, 1500, 700))
data.push(new RackInfo(1489, "52P", 42, 483, 0, 0, -1350,  1550, 0,
 1, 35000, 500, 10000, 1,  24, 14, 0, 204,   0,   29496, 0, 5700,  0, 5700,
  1, 1500, 700))
data.push(new RackInfo(1490, "52Q", 42, 483, 0, 0, -1350,  "NULL",  0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1491, "52R", 42, 483, 0, 0, -1350,  150,  0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1492, "52S", 42, 483, 0, 0, -1350, -550,  0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 5700,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1493, "52T", 42, 483, 0, 0, -1350, -1250, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1511, "52U", 42, 483, 0, 0, -1350, -1950, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1512, "52V", 42, 483, 0, 0, "NULL", "NULL", 0,
 1, 35000, 500, 10000, 1,  28, 10, 0, 161,   0,   24039, 0, 4400,  0, 4400,
  1, 1500, 700))
data.push(new RackInfo(1494, "52W", 42, 483, 0, 0, -1350, -3350, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1495, "52X", 42, 483, 0, 0, -1350, -4050, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1496, "53M", 42, 483, 0, 0, -4150,  3650, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1497, "53N Tile", 42, 483, 0, 0, -4150,  2950, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1498, "53O", 42, 483, 0, 0, -4150,  2250, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1499, "53P", 42, 483, 0, 0, -4150,  1550, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1505, "53Q", 42, 483, 0, 0, -4150,  150,  0,
 1, 35000, 500, 10000, 1,  32, 10, 0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1506, "53R", 42, 483, 0, 0, "NULL", -550,  0,
 1, 35000, 500, 10000, 1,  26, 16, 0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1507, "53S", 42, 483, 0, 0, -4150, -1250, 0,
 1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1508, "53T", 42, 483, 0, 0, -4150, -1950, 0,
 1, 35000, 500, 10000, 1,  30, 12, 0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))
data.push(new RackInfo(1509, "53U", 42, 483, 0, 0, -4150, -2650, 0,
 1, 35000, 500, 10000, 1,  32, 10, 0, 0,     0,   0,     0, 0,     0, 0,
     1, 1500, 700))

### This will filter out racks that do not have the right properties ###
### Data cannot be named Tile, must have x, y position, width, and height ###
data = data.filter((data) ->
  data.name.indexOf("Tile") is -1 && isNumber(data.adjustedXPosition) &&
  isNumber(data.adjustedYPosition) && isNumber(data.floorPlanWidth) &&
  isNumber(data.floorPlanHeight)
)