### bounds - object that contains info on the size and scale of the grid ###
bounds =
  boundingBox:
    minX: HIGH_NUM, maxX: -HIGH_NUM, minY: HIGH_NUM, maxY: -HIGH_NUM

  ### find the max width and height of a rack to extend the grid and views ###
  maxWidth: -HIGH_NUM
  maxHeight: -HIGH_NUM

  resetBounds: ->
    @boundingBox.minX = @boundingBox.minY = HIGH_NUM
    @boundingBox.maxX = @boundingBox.maxY = -HIGH_NUM

    @maxWidth = @maxHeight = -HIGH_NUM
    return

  ### recalculate the bounds based on the data ###
  ### was used if i want to change plans. Need to relook at the scale. ###
  calculateBounds: ->
    @resetBounds()
    @boundingBox.minX = Math.roundTo(d3.min(data, (d) -> d.xPosition), 2)
    @boundingBox.maxX = Math.roundTo(d3.max(data, (d) -> d.xPosition), 2)
    @boundingBox.minY = Math.roundTo(d3.min(data, (d) -> d.yPosition), 2)
    @boundingBox.maxY = Math.roundTo(d3.max(data, (d) -> d.yPosition), 2)
    @maxWidth = Math.roundTo(d3.max(data, (d) -> d.floorPlanWidth), 2)
    @maxHeight = Math.roundTo(d3.max(data, (d) -> d.floorPlanHeight), 2)
    return

bounds.calculateBounds()

### These variables are used to declare starting positions of the views ###
bb = bounds.boundingBox
frontDistance = bb.minY - bounds.maxHeight - (bb.maxX - bb.minX)
backDistance = -frontDistance
sideDistance = bb.maxX + bounds.maxWidth + (bb.maxY - bb.minY)
topDistance = (bb.maxX - bb.minY) + (bb.maxY - bb.minY)

### Target the main x3d element ###
x3d = d3.select("#x3dElement").attr( "height", "400px" )
  .attr( "width", "700px" )

### Add in a couple buttons to the element ###
### Buttons do not work ###
zoomIn = x3d.append('button').attr('id',"zoom-in")
document.getElementById('zoom-in').innerHTML = "Zoom In"
zoomIn = x3d.append('button').attr('id',"zoom-out")
document.getElementById('zoom-out').innerHTML = "Zoom Out"

### There is one scene element per x3d element ###
scene = x3d.append("scene")

### Append the different viewpoints ###
### All viewpoints have a centerOfRotation, position, orientation, ###
### and fieldOfView ###
scene.append("viewpoint").attr("id", "Top View")
  .attr( "centerOfRotation", "0 0 0").attr( "position", "0 0 #{topDistance}")
  .attr( "orientation", "0.0 0.0 0.0 0.0" ).attr( "fieldOfView", '0.75')
scene.append("viewpoint").attr("id", "Front View")
  .attr( "centerOfRotation", "0 0 0").attr( "position","0 #{frontDistance} 0" )
  .attr( "orientation", "1.0 0.0 0.0 1.570").attr( "fieldOfView", '0.95')
scene.append("viewpoint").attr("id", "Left View")
  .attr("centerOfRotation","0 0 0").attr( "position","#{-sideDistance} 0 0.25")
  .attr("orientation", "-0.50 0.50 0.50 #{2.093*2}").attr("fieldOfView",'0.95')
scene.append("viewpoint").attr("id", "Right View")
  .attr("centerOfRotation", "0 0 0").attr( "position", "#{sideDistance} 0 0.25")
  .attr("orientation", "0.50 0.50 0.50 2.093").attr( "fieldOfView", '0.95')
scene.append("viewpoint").attr("id", "Back View")
  .attr("centerOfRotation", "0 0 0").attr( "position", "0 #{backDistance} -.5")
  .attr("orientation", "0.0 0.75 0.65 3.14").attr( "fieldOfView", '0.95')
scene.append("viewpoint").attr("id","Perspective")
  .attr("centerOfRotation","0 0 0")
  .attr("position", "#{backDistance / 3} #{-sideDistance} #{topDistance / 3}" )
  .attr("orientation", "1.0 0.25 0.25 1.25").attr( "fieldOfView", '0.95')
### Custom View Removed
scene.append("viewpoint").attr("id", "Custom View")
  .attr( "centerOfRotation", "0 0 0")
  .attr( "position", "#{-backDistance / 3} #{-sideDis} #{topDistance / 3}"  )
  .attr( "orientation", "1.0 -0.2 -0.1 1.25" ).attr( "fieldOfView", '0.75')###

### Right point Light ###
scene.append("pointLight").attr("on", "true").attr('intensity','.50')
  .attr('color', '1.0 1.0 1.0').attr('attenuation', '1.0000 0.0000 0.0000')
  .attr('location',"#{sideDistance} 0 0").attr('radius','200.0')

### Left point Light ###
scene.append("pointLight").attr("on", "true").attr('intensity','.50')
  .attr('color', '1.0 1.0 1.0').attr('attenuation', '1.0000 0.0000 0.0000')
  .attr('location',"#{-sideDistance} 0 0").attr('radius','200.0')

### Dummy function that is supposed to act as a tool tip ###
rackDataFunc = (data) ->
  # document.getElementById('ComponentID-Data').innerHTML = data.componentID
  # document.getElementById('Name-Data').innerHTML = data.name
  # document.getElementById('Power-Data').innerHTML =
  #   data.powerCurrent+"/"+data.powerPlanned+"/"+data.powerMax
  # document.getElementById('Temperature-Data').innerHTML =
    # data.temperatureCurrent+"/"+data.temperaturePlanned+"/"+data.coolingMax
  # document.getElementById('Weight-Data').innerHTML =
    # data.weightCurrent+"/"+data.weightPlanned+"/"+data.weightMax
  # document.getElementById('UsedUnits-Data').innerHTML =
    # data.usedUnitsCurrent+"/"+data.usedUnitsPlanned
  # document.getElementById('UnitLocation-Data').innerHTML =
    # data.largestUnitLocation
  # document.getElementById('UnitSize-Data').innerHTML = data.largestUnitSize
  # document.getElementById('PowerAD-Data').innerHTML =
    # data.powerActualDerivation
  return

### finds max number of a specific property within the data ###
findMaxNumber = (data, property, limit = HIGH_NUM) ->
  d3.max(data, (d) ->
    if typeof d[property] is "number" and d[property] < limit
      return d[property]
  )

### displays the top 3 leaders of one property ###
topThreeLeader = (data, property, className, units) ->
  max = []
  max[0] = findMaxNumber(data, property.toString())
  max[1] = findMaxNumber(data, property.toString(), max[0])
  max[2] = findMaxNumber(data, property.toString(), max[1])

  counter = 0
  while counter < 3
    ### filter out all data with a particular value ###
    dataSubset = data.filter((d)-> d[property.toString()] is max[counter])
    ### change value to a string and add the units###
    max[counter] = max[counter].toString() + units.toString() +
      " rack" + (if dataSubset.length > 1 then "s:" else ":")
    ### add the names of the rack to the string ###
    dataSubset.forEach((d) -> max[counter] += " " + d.name)
    ### add the number of rack to the string ###
    max[counter] += " (#{dataSubset.length} total)"
    counter++

  counter = 1
  ### write the string into the innerHTML ###
  while counter < 4
    document.getElementsByClassName(className.toString()+counter.toString() )[0].innerHTML = max[counter - 1]
    counter++
    
  return

### find the top three leaders of all these properties ###
topDataRacks = (data) ->
  topThreeLeader(data, "powerCurrent", "power", " watts")
  topThreeLeader(data, "temperatureCurrent", "temperature", "BTUs")
  topThreeLeader(data, "weightCurrent", "weight", "lb")
  topThreeLeader(data, "usedUnitsCurrent", "used-units", " used units")
  topThreeLeader(data, "largestUnitLocation", "largest-unit-location", " units")
  topThreeLeader(data, "largestUnitSize", "largest-unit-size", " unit size")
  return

### Remove all classes of a certain type ###
clearAllSelected = (str)->
  allSelected = document.getElementsByClassName(str)
  ### For every item in the list remove it from the class list ###
  while (allSelected.length)
    allSelected[0].className = allSelected[0].className.replace(str,'')
  return

### Main display function ###
display = ( data ) ->
  ### for every piece of data  ###
  transforms = scene.selectAll('transform').data(data)

  ### Append a transform and a shape to each transform ###
  ### they have a unique id and a class of rack ###
  ### id and class are not needed for css but was planning on using them for hover over###
  shapesEnter = transforms.enter().append('transform')
    .append('shape').data(data).attr('id', (d)-> 'rack'+d.componentID).attr('class', 'rack')

  ### give each transform some transitions to move the boxes ###
  transforms.transition().attr('translation', (d, i) ->
    console.log d.xPosition, d.yPosition
    d.xPosition + ' ' + d.yPosition + ' 0.0'
  )

  ### append a material to each shape with a material element within it ###
  shapesEnter.append('appearance').append('material')

  ### within the material set the color by calling the setRackColor function ###
  ### contains some transitions between colors ###
  scene.selectAll('material').data(data).transition().duration(1000).delay(500)
    .attr('diffuseColor', (d)-> setRackColor(d))

  ### append a box to each shape and set the size of each box to the data of the rack ###
  shapesEnter.append('box').data(data)
    .attr('size', (d) -> d.floorPlanWidth + ' ' + (d.floorPlanHeight - 0.1) + ' ' + d.rackUnitHeight)

  ### Not sure what this does here is more info https://github.com/mbostock/d3/wiki/Selections ###
  transforms.exit()

  ### update the leaders of each property ###
  topDataRacks(data)

  return

setInterval (-> display data), 10000

setRackColor = (data) ->
  ### look at what color is selected ###
  switch document.getElementsByClassName('selected-color')[0].value
    when "Power"
      value = data.powerCurrent / data.powerMax
      value = if isNumber(value) then value else "steelblue"
    when "Weight"
      value = data.weightCurrent / data.weightMax
      value = if isNumber(value) then value else "steelblue"
    when "Temperature"
      value = data.temperatureCurrent / data.coolingMax
      value = if isNumber(value) then value else "steelblue"
    else
      value = "steelblue"

  ### if there is missing data assign color blue ###
  if value is "steelblue"
    return "steelblue"

  ### change color based on max value and current value ###
  ### color will be on a scale of green to red ###
  if value < 0.5
    r = Math.floor(value * 255)
    g = 200
  else
    r = 255
    g = Math.floor((1 - value) * 255)

  "#" + ((if r < 16 then "0" else "")) + r.toString(16) + ((if g < 16 then "0" else "")) + g.toString(16) + "00"

### remove all .selected-view and asign it to a the called item ###
toggleCamera = ->
  clearAllSelected('selected-view')
  @className += " selected-view"
  ### call the new view ###
  document.getElementById(@value).setAttribute('set_bind','true')
  return

### remove all .selected-color and asign it to a the called item ###
toggleColor = ->
  clearAllSelected('selected-color')
  @className += " selected-color"
  ### redisplay the color to show changed color ###
  display(data)
  return

gridSetup = (bounds)->
  ### Attach a shape to the scene ###
  ### Give it a light grey color with transparency ###
  shape = scene.append('Transform').append('shape').attr('id', 'grid')
  shape.append('appearance').append('material').attr('id', 'gridMaterial').attr('diffuseColor', '0.8, 0.8, 0.8').attr('transparency','0.65')
  ### coordinateConnections is a string representing connections between coordinates  ###
  ### all coordinates are connected until it reaches a -1 ###
  ### 1, 2, -1, 3, 4 will connect coordinate 1 and 2 but will not connect coordinate 2 and 3 ###
  coordinateConnections = ""
  ### coordinates is a string representing the coordinates (x, y, z) ###
  coordinates = ""
  ### connections signifies what set of line user is on ###
  connections = 0

  ### rounding to a .6 interval ###
  gridHeightStart = Math.roundTo(Math.ceil((bounds.boundingBox.minY - bounds.maxHeight) / 0.6 - 1) * 0.6, 2)
  gridHeightEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxY + bounds.maxHeight) / 0.6+ 1) * 0.6, 2)
  gridWidthStart = Math.roundTo(Math.ceil((bounds.boundingBox.minX - bounds.maxWidth) / 0.6 - 1) * 0.6, 2)
  gridWidthEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxX + bounds.maxWidth) / 0.6 + 1) * 0.6, 2)
  console.log gridHeightStart, gridHeightEnd, gridWidthStart, gridWidthEnd
  ### Verticle lines on the Grid ###
  gridStart = gridWidthStart
  while gridStart <= gridWidthEnd
    coordinates += "#{gridStart} #{gridHeightStart} -1 #{gridStart} #{gridHeightEnd} -1 "
    coordinateConnections += "#{connections} #{connections + 1} -1 "
    gridStart = Math.roundTo(gridStart + 0.6, 2)
    connections += 2

  ### Horizontal Lines on the Grid ###
  gridStart = gridHeightStart
  while gridStart <= gridHeightEnd
    coordinates += "#{gridWidthStart} #{gridStart} -1 #{gridWidthEnd} #{gridStart} -1 "
    coordinateConnections += "#{connections} #{connections + 1} -1 "
    gridStart = Math.roundTo(gridStart + 0.6, 2)
    connections += 2

  ### set the final strings to the proper place ###
  set = shape.append('indexedLineSet').attr('coordIndex', '#{coordinateConnections}')
  set.append('coordinate').attr('point', "#{coordinates}")

### setup the grid ###
gridSetup(bounds)

### shuffle between different views ###
### there is a bug in the code ###
shuffleView = ->
  ### what view are you currently on in terms of number ###
  initialNumber = document.getElementsByClassName('selected-view')[0].className
    .replace('button','').replace('selected-view','').replace('view','').replace(/\s/,'')

  ### Look for the next view based on the initial number position ###
  if parseInt(initialNumber) < document.getElementsByClassName('camera-option')[0].children.length - 1
    selectedNumber = parseInt(initialNumber) + 1
  else
    selectedNumber = 0

  newView = document.getElementsByClassName("#{'view'+selectedNumber.toString()}")[0]
  clearAllSelected('selected-view')
  ### give the new view the correct class name for the css ###
  newView.className += " selected-view"
  ### call the new view so it will change the view of the 3D model ###
  document.getElementById(newView.value).setAttribute('set_bind','true')
  
  display(data)
  return

window.onload = ->
  ### options setup. Initializes the button to proper function ###
  colorButton.onmouseover = toggleColor for colorButton in document.getElementsByClassName('color-option')[0].children
  cameraButton.onmouseover = toggleCamera for cameraButton in document.getElementsByClassName('camera-option')[0].children

  ### this will turn off movement controls ###
  ### document.getElementById('x3dElement').runtime.noNav() ###

  display(data)

  ### this will toggle the grid transpareaancy  ###
  document.getElementById('grid-toggle').onclick = ->
    if document.getElementById('gridMaterial').transparency is "1.0"
      document.getElementById('gridMaterial').transparency = ".65"
    else
      document.getElementById('gridMaterial').transparency = "1.0"
    return

  ### if shuffle is clicked it will call shuffleView every 10sec ###
  document.getElementById('view-shuffle').onclick = ->
    if document.getElementById('view-shuffle').checked is true
      shuffleID = setInterval (-> shuffleView()), 10000
    else
      window.clearInterval(shuffleID)
    return

  return