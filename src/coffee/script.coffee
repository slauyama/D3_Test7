### bounds - object that contains info on the size and scale of the grid ###
bounds =
  ### initialize the values to extremes to find actual value  ###
  ### not sure i need this anymore if I am getting values from data ###
  ### will relook at this later ###
  boundingBox:
    minX: Number.MAX_VALUE
    maxX: Number.MIN_VALUE
    minY: Number.MAX_VALUE
    maxY: Number.MIN_VALUE

  ### find the max width and height of a rack to extend the grid and views ###
  maxWidth: 0
  maxHeight: 0

  ### Recalculate the bounds based on the data ###
  ### Was used if i want to change plans. Need to relook at the scale. ###
  setBounds: ->
    ### Will find the min and max values for x and y position ###
    @boundingBox.minX = Math.roundTo(d3.min(data, (data) ->
      data.adjustedXPosition), 2)
    @boundingBox.maxX = Math.roundTo(d3.max(data, (data) ->
      data.adjustedXPosition), 2)
    @boundingBox.minY = Math.roundTo(d3.min(data, (data) ->
      data.adjustedYPosition), 2)
    @boundingBox.maxY = Math.roundTo(d3.max(data, (data) ->
      data.adjustedYPosition), 2)
    
    ### Will find the max width and height ###
    @maxWidth = Math.roundTo(d3.max(data, (data) ->
      data.floorPlanWidth), 2)
    @maxHeight = Math.roundTo(d3.max(data, (data) ->
      data.floorPlanHeight), 2)
    return

  ### Returns the front distance needed for view ###
  getFrontDistance: ->
    @boundingBox.minY - @maxHeight - (@boundingBox.maxY - @boundingBox.minX)

  ### Returns the back distance needed for view ###
  getBackDistance: ->
    @getFrontDistance() * -1

  ### Returns the front distance needed for view ###
  getSideDistance: ->
    @boundingBox.maxX + @maxWidth + (@boundingBox.maxY - @boundingBox.minY)

  ### Returns the back distance needed for view ###
  getTopDistance: ->
    @boundingBox.maxX - @boundingBox.minY + @boundingBox.maxY - @boundingBox.minY

bounds.setBounds()

x3d = d3.select("#x3dElement").attr("height", "400px").attr("width", "700px")

x3dWrapper =
  ### Target the main x3d element ###
  
  initialize: ->
    ### Create some views ###
    @createViewpoint("Top View", "0 0 0",
      "0 0 #{bounds.getTopDistance()}", "0.0 0.0 0.0 0.0", '0.75')
    @createViewpoint("Front View", "0 0 0",
      "0 #{bounds.getFrontDistance()} 0", "1.0 0.0 0.0 1.570", '0.95')
    @createViewpoint("Left View", "0 0 0",
      "#{-1 * bounds.getSideDistance()} 0 0",
      "-0.50 0.50 0.5 #{2.093*2}", '0.75')
    @createViewpoint("Right View", "0 0 0",
      "#{bounds.getSideDistance()} 0 0.25",
      "0.50 0.50 0.50 2.093", '0.75')
    @createViewpoint("Back View", "0 0 0",
      "0 #{bounds.getBackDistance()} -.5", "0.0 0.75 0.65 3.14", '0.95')
    @createViewpoint("Perspective", "0 0 0",
      "#{bounds.getBackDistance() / 3} #{-bounds.getSideDistance()} #{bounds.getTopDistance() / 3}",
      "1.0 0.25 0.25 1.25", '0.95')
    ### Custom View Removed ###

    ### Create a Right and Left point Light ###
    @createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000',
      "#{bounds.getSideDistance()} 0 0", '200.0')
    @createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000',
      "#{-1 * bounds.getSideDistance()} 0 0", '200.0')

    return

  ### There is one scene element per x3d element ###
  scene: x3d.append("scene")

  ### Append the different viewpoints to the scene ###
  createViewpoint: (id, centerOfRotation, position, orientation, fieldOfView) ->
    @scene.append('viewpoint').attr("id", id)
    .attr( "centerOfRotation", centerOfRotation).attr( "position", position)
    .attr( "orientation", orientation ).attr( "fieldOfView", fieldOfView)
    return

  ### Append the different lights to the scene ###
  ### Color - input is a 0 to 1 value for r, g, and b ###
  createPointlight: (intensity, color, attenuation, location, radius) ->
    @scene.append("pointLight").attr('intensity', intensity)
    .attr('color', color).attr('attenuation', attenuation)
    .attr('location', location).attr('radius', radius)
    return

  ### Main display function ###
  display: ( data ) ->
    ### for every piece of data  ###
    transforms = @scene.selectAll('transform').data(data)

    ### Append a transform and a shape to each transform ###
    ### they have a unique id and a class of rack ###
    ### id and class are not needed yet. Plan to use them for hover over ###
    shapesEnter = transforms.enter().append('transform')
      .append('shape').data(data)
        .attr('id', (data)-> 'rack' + data.componentId)
        .attr('class', 'rack')

    ### give each transform some transitions to move the boxes ###
    transforms.transition().attr('translation', (data) ->
      data.adjustedXPosition + ' ' + data.adjustedYPosition + ' 0.0'
    )

    ### append a material to each shape with a material element within it ###
    shapesEnter.append('appearance').append('material')

    ### in the material set the color by calling the getRackColor function ###
    ### contains some transitions between colors ###
    @scene.selectAll('material').data(data).transition()
      .duration(1000).delay(500)
      .attr('diffuseColor', (data)-> getRackColor(data))

    ### append a box to each shape ###
    ### set the size of each box to the data of the rack ###
    shapesEnter.append('box').data(data)
      .attr('size', (data) -> data.floorPlanWidth + ' ' +
        (data.floorPlanHeight - 0.1) + ' ' + data.height)

    ### Not sure what this does here is more info
    https://github.com/mbostock/d3/wiki/Selections ###
    transforms.exit()

    ### update the leaders of each property ###
    getTopLists(data)

    return

  setupGrid: (bounds)->
    ### Attach a shape to the scene ###
    ### Give it a light grey color with transparency ###
    shape = @scene.append('Transform').append('shape').attr('id', 'grid')
    shape.append('appearance').append('material')
      .attr('id', 'gridMaterial').attr('diffuseColor', '0.8, 0.8, 0.8')
      .attr('transparency','0.65')
    ### coordinateConnections: string representing connection of coordinates
      all coordinates are connected until it reaches a -1
      1, 2, -1, 3, 4 will connect coordinate 1 and 2
      but will not connect coordinate 2 and 3
    ###
    coordinateConnections = ""
    ### coordinates is a string representing the coordinates (x, y, z) ###
    coordinates = ""
    ### connections signifies what set of line user is on ###
    connections = 0

    ### rounding to a .6 because that is the standard grid interval ###
    gridHeightStart = Math.roundTo(
      Math.ceil((bounds.boundingBox.minY - bounds.maxHeight) / 0.6 - 1) * 0.6, 2)
    gridHeightEnd = Math.roundTo(
      Math.ceil((bounds.boundingBox.maxY + bounds.maxHeight) / 0.6 + 1) * 0.6, 2)
    gridWidthStart = Math.roundTo(
      Math.ceil((bounds.boundingBox.minX - bounds.maxWidth) / 0.6 - 1) * 0.6, 2)
    gridWidthEnd = Math.roundTo(
      Math.ceil((bounds.boundingBox.maxX + bounds.maxWidth) / 0.6 + 1) * 0.6, 2)
    ### Verticle lines on the Grid ###
    gridStart = gridWidthStart
    while gridStart <= gridWidthEnd
      coordinates += "#{gridStart} #{gridHeightStart} -1 "
      coordinates += "#{gridStart} #{gridHeightEnd} -1 "
      coordinateConnections += "#{connections} #{connections + 1} -1 "
      gridStart = Math.roundTo(gridStart + 0.6, 2)
      connections += 2

    ### Horizontal Lines on the Grid ###
    gridStart = gridHeightStart
    while gridStart <= gridHeightEnd
      coordinates += "#{gridWidthStart} #{gridStart} -1 "
      coordinates += "#{gridWidthEnd} #{gridStart} -1 "
      coordinateConnections += "#{connections} #{connections + 1} -1 "
      gridStart = Math.roundTo(gridStart + 0.6, 2)
      connections += 2

    ### set the final strings to the proper place ###
    set = shape.append('indexedLineSet')
      .attr('coordIndex', '#{coordinateConnections}')
    set.append('coordinate').attr('point', "#{coordinates}")


### finds max number of a specific property within the data ###
findMaxNumbers = (data, property, length) ->
  list = []

  iterator = 0
  limit = Number.MAX_VALUE

  findMax = (data, limit) ->
    d3.max(data, (data)->
      value = data[property]
      if isNumber(value) and value < limit
        return value
    )

  while (iterator < length)
    list[iterator] = findMax(data, limit)
    limit = list[iterator]
    iterator++

  list

### displays the top 3 leaders of one property ###
getTopThreeValues = (data, property, className, units) ->
  maxValueList = findMaxNumbers(data, property, 3)
  stringValues = []

  ### Dummy Function used to avoid making function in loop ###
  ### Filters all data that match the same property ###
  filterData = (datum[property] is maxValueList[counter] for datum in data)
  
  counter = 0
  while counter < maxValueList.length
    ### filter out all data with a particular value ###
    dataSubset = filterData
    console.log dataSubset
    ### change value to a string and add the units###
    stringValues[counter] = maxValueList[counter] + units +
      " rack" + (if dataSubset.length > 1 then "s:" else ":")
    
    ### add the names of the rack to the string ###
    stringValues[counter] += " " + datum.name for datum in dataSubset
    ### add the number of rack to the string ###
    stringValues[counter] += " (#{dataSubset.length} total)"
    counter++

  counter = 0
  ### write the string into the innerHTML ###
  while counter < maxValueList.length
    target = className + (counter + 1)
    document.getElementsByClassName(target)[0].innerHTML = stringValues[counter]
    counter++
    
  return

### find the top three leaders of all these properties ###
### some of the units are padding with a space ###
getTopLists = (data) ->
  getTopThreeValues(data, "powerCurrent", "power", " watts")
  getTopThreeValues(data, "heatCurrent", "heat", "BTUs")
  getTopThreeValues(data, "weightCurrent", "weight", "lb")
  getTopThreeValues(data, "usedUnitsCurrent", "used-units", " used units")
  getTopThreeValues(data, "largestUnitLocation", "largest-unit-location", "")
  getTopThreeValues(data, "largestUnitSize", "largest-unit-size", " unit size")
  return

getTopLists(data)

### Remove all classes of a certain type ###
clearAllSelected = (className)->
  allSelected = document.getElementsByClassName(className)
  ### For every item in the list remove it from the class list ###
  while (allSelected.length)
    allSelected[0].className = allSelected[0].className.replace(className,'')
  ### Will Use jQuery .removeClass(str) ###
  return

### this runs on a set interval just in case the data changes ###
setInterval (-> x3dWrapper.display data), 10000

getRackColor = (data) ->
  badDataFlag = false
  ### look at what color is selected ###
  switch document.getElementsByClassName('selected-color')[0].value
    when "Power"
      value = data.powerCurrent / data.powerMax
      badDataFlag = true if !isNumber(value)
    when "Weight"
      value = data.weightCurrent / data.weightMax
      badDataFlag = true if !isNumber(value)
    when "Temperature"
      value = data.heatCurrent / data.coolingMax
      badDataFlag = true if !isNumber(value)
    else
      badDataFlag = true

  ### change color based on max value and current value ###
  ### color will be on a scale of green to red ###
  if value < 0.5
    red = Math.floor(value * 255)
    green = 200
  else
    red = 255
    green = Math.floor((1 - value) * 255)

  ### Convert the red and green decimal values into a hex value ###
  ### no ternary in coffeescript ###
  redString = (if red < 16 then "0" else "") + red.toString(16)
  greenString = (if green < 16 then "0" else "") + green.toString(16)

  color = "#" + redString + greenString + "00"
  color = "steelblue" if badDataFlag
  color

### remove all .selected-view and asign it to a the called item ###
toggleCamera = ->
  clearAllSelected('selected-view')
  @className += " selected-view"
  ### To activate a viewpoint you set "set_bind" to true ###
  document.getElementById(@value).setAttribute('set_bind','true')
  return

### remove all .selected-color and asign it to a the called item ###
toggleColor = ->
  clearAllSelected('selected-color')
  @className += " selected-color"
  ### redisplay the color to show changed color ###
  x3dWrapper.display(data)
  return

### setup the grid ###
x3dWrapper.setupGrid(bounds)

### shuffle between different views ###
### there is a bug in the code ###
shuffleView = ->
  ### what view are you currently on in terms of number ###
  initialNumber = document.getElementsByClassName('selected-view')[0].className
    .replace('button','').replace('selected-view','')
    .replace('view','').replace(/\s/,'')

  ### Look for the next view based on the initial number position ###
  if parseInt(initialNumber) < document.getElementsByClassName('camera-option')[0].children.length - 1
    selectedNumber = parseInt(initialNumber) + 1
  else
    selectedNumber = 0

  newView = document.getElementsByClassName("#{'view'+selectedNumber}")[0]
  clearAllSelected('selected-view')
  ### give the new view the correct class name for the css ###
  newView.className += " selected-view"
  ### call the new view so it will change the view of the 3D model ###
  document.getElementById(newView.value).setAttribute('set_bind','true')
  
  x3dWrapper.display(data)
  return

window.onload = ->
  ### options setup. Initializes the button to proper function ###
  colorButton.onmouseover = toggleColor for colorButton in document.getElementsByClassName('color-option')[0].children
  cameraButton.onmouseover = toggleCamera for cameraButton in document.getElementsByClassName('camera-option')[0].children

  ### this will turn off movement controls ###
  ### document.getElementById('x3dElement').runtime.noNav() ###

  x3dWrapper.display(data)

  ### this will toggle the grid transpareaancy  ###
  document.getElementById('grid-toggle').onclick = ->
    if document.getElementById('gridMaterial').transparency is "1.0"
      document.getElementById('gridMaterial').transparency = ".65"
    else
      document.getElementById('gridMaterial').transparency = "1.0"
    return

  ### if shuffle is clicked it will call shuffleView every 10sec ###
  document.getElementById('view-shuffle').onclick = ->
    ### shuffleId is declared outside the scope of the if
        coffeescript automatically declares variables at the next level ###
    if document.getElementById('view-shuffle').checked is true
      shuffleId = setInterval (-> shuffleView()), 10000
    else
      window.clearInterval(shuffleId)
    return

  return