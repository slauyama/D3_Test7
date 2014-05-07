RackInfoConstructor = (componentID, name, rackUnitHeight, rackWidth, rackDepth, rackOrientation, xPosition, yPosition, numberingOrigin, overlappingAllowed, coolingMax, weightMax, powerMax, largestUnitLocation, largestUnitSize, usedUnitsCurrent, usedUnitsPlanned, weightCurrent, weightPlanned, heatDissipationCurrent, heatDissipationPlanned, powerCurrent, powerPlanned, powerActual, powerActualDerivation, floorPlanWidth, floorPlanHeight) ->
                     # ComponentID  Name  RackUnitHeight  RackWidth  RackDepth  RackOrientation   XPosition  yPosition  NumberingOrigin  OverlappingAllowed  CoolingMax  WeightMax  PowerMax  LargestUnitLocation  LargestUnitSize  UsedUnitsCurrent  UsedUnitsPlanned  WeightCurrent  WeightPlanned  HeatDissipationCurrent  HeatDissipationPlanned  PowerCurrent  PowerPlanned  PowerActual  PowerActualDerivation  FloorPlanWidth  FloorPlanHeight
   obj = {}
   obj.componentID = componentID
   obj.name = name
   obj.rackUnitHeight = rackUnitHeight * 44.5 / 1000
   obj.width = rackWidth
   obj.depth = rackDepth
   obj.rackOrientation = rackOrientation
   obj.xPosition = (xPosition - floorPlanWidth / 2) / 1000
   obj.yPosition = (yPosition - floorPlanHeight / 2) / 1000
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
   obj.temperatureCurrent = heatDissipationCurrent
   obj.temperaturePlanned = heatDissipationPlanned
   obj.powerCurrent = powerCurrent
   obj.powerPlanned = powerPlanned
   obj.powerActual = powerActual
   obj.powerActualDerivation = powerActualDerivation
   obj.floorPlanWidth = floorPlanWidth / 1000
   obj.floorPlanHeight = floorPlanHeight / 1000
   obj 

data = []

#JSON
d3.json("../data.json", (d)->
   console.log (d)
)

data = data.filter((d) -> 
   d.name.indexOf("Tile") is -1 && isNumber(d.xPosition) && isNumber(d.yPosition) && 
   isNumber(d.floorPlanWidth) && isNumber(d.floorPlanHeight)
)