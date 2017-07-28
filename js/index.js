//data used for 10x10 grid of points
dataset = [
  [10, 10],
  [20, 10],
  [30, 10],
  [40, 10],
  [50, 10],
  [60, 10],
  [70, 10],
  [80, 10],
  [90, 10],
  [100, 10],
  [10, 20],
  [20, 20],
  [30, 20],
  [40, 20],
  [50, 20],
  [60, 20],
  [70, 20],
  [80, 20],
  [90, 20],
  [100, 20],
  [10, 30],
  [20, 30],
  [30, 30],
  [40, 30],
  [50, 30],
  [60, 30],
  [70, 30],
  [80, 30],
  [90, 30],
  [100, 30],
  [10, 40],
  [20, 40],
  [30, 40],
  [40, 40],
  [50, 40],
  [60, 40],
  [70, 40],
  [80, 40],
  [90, 40],
  [100, 40],
  [10, 50],
  [20, 50],
  [30, 50],
  [40, 50],
  [50, 50],
  [60, 50],
  [70, 50],
  [80, 50],
  [90, 50],
  [100, 50],
  [10, 60],
  [20, 60],
  [30, 60],
  [40, 60],
  [50, 60],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 60],
  [100, 60],
  [10, 70],
  [20, 70],
  [30, 70],
  [40, 70],
  [50, 70],
  [60, 70],
  [70, 70],
  [80, 70],
  [90, 70],
  [100, 70],
  [10, 80],
  [20, 80],
  [30, 80],
  [40, 80],
  [50, 80],
  [60, 80],
  [70, 80],
  [80, 80],
  [90, 80],
  [100, 80],
  [10, 90],
  [20, 90],
  [30, 90],
  [40, 90],
  [50, 90],
  [60, 90],
  [70, 90],
  [80, 90],
  [90, 90],
  [100, 90],
  [10, 100],
  [20, 100],
  [30, 100],
  [40, 100],
  [50, 100],
  [60, 100],
  [70, 100],
  [80, 100],
  [90, 100],
  [100, 100]
]

//initialize variables used on page
var w = 300;
var h = 300;
var padding = 10;
var redON = false;
var x_count = 0;
var rv = 0;
var myDesc = '';
var start_active = true;
var submit_active = false;
var xScale = d3.scaleLinear()
  .domain([0, 100]).range([padding, w - padding]);
var yScale = d3.scaleLinear()
  .domain([0, 100]).range([padding, h - padding]);

//create svg object
var svg = d3.select('#home')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

//create 10x10 grid of points from data
svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d) {
    return xScale(d[0]);
  })
  .attr('y', function(d) {
    return yScale(d[1]);
  })
  .attr('width', 10)
  .attr('height', 10);



/*
xCOLORx = color to change some nodes to
xSHAPEx = shape to change some nodes to
mode = if 'shape' then only change shape
       if 'color then only change color
       else change both
*/
var ColAndShape = function(xCOLORx,xSHAPEx, mode) {
    // if mode='color' then always use rectangles, if mode not color always use color black
    
    if (start_active == true) {
        //change button colors and activate other button
        start_active = false;
        submit_active = true;
        d3.select('#START').style('background-color', 'rgb(175,175,175)');
        d3.select('#STOP').style('background-color', 'rgb(234,77,49)');
        //clear user input
        document.getElementById('ANSWER').value = '';
        //clear answer message
        d3.select("#result").text('CORRECT')
          .style('opacity', 0)
        //shuffle points
        x_count = 0;
    
        if (mode=='color') {xSHAPEx = d3.symbolSquare} else if (mode=='shape') {xCOLORx = 'Black'};
        svg.selectAll('*').remove(); // removes all nodes
        svg.selectAll('*') // xSHAPEx
        .data(dataset)
        .enter()
        .append('path')
        .attr('transform',function(d){ return "translate("+xScale(d[0])+","+yScale(d[1])+")";})
        .each( function(d,i) {
            myObj = d3.select(this);
            rv = Math.random();
            if (rv < 0.1) {
                x_count++;
                myObj.attr('fill',xCOLORx)
                .attr('d', d3.symbol().type(function() {
                    return xSHAPEx;
                }).size(100));
            } else if (rv < 0.5 && mode != 'color') {
                myObj.attr('fill',xCOLORx)
                .attr('d', d3.symbol().type(function() {
                    return d3.symbolSquare;
                }).size(100));
            } else if (rv <0.9 && mode != 'shape') {
                myObj.attr('fill','black')
                .attr('d', d3.symbol().type(function() {
                    return xSHAPEx;
                }).size(100));
            } else {
                myObj.attr('fill','black')
                .attr('d', d3.symbol().type(function() {
                    return d3.symbolSquare;
                }).size(100));
            }
        });
        stopwatch.restart();
    };

};

//controls what happens when start button is clicked
d3.select('#START').on('click', function() {
    var myDD = document.getElementById("colorDD");
    var colorX = myDD.options[myDD.selectedIndex].value;
    var myDD2 = document.getElementById("shapeDD");
    var shapeX = eval(myDD2.options[myDD2.selectedIndex].value);
  if (document.getElementById('rbColor').checked) {
    ColAndShape(colorX, shapeX, 'color');
  } else if (document.getElementById('rbShape').checked) {
    ColAndShape(colorX, shapeX, 'shape');
  } else {
    ColAndShape(colorX, shapeX, 'both');
  }
  document.getElementById('ANSWER').focus();
  document.getElementById('ANSWER').select();
})

//controls what happens when submit button is clicked
d3.select('#STOP').on('click', function() {
  if (submit_active == true) {
    if (x_count == d3.select('#ANSWER').node().value) {
      stopwatch.stop();
      //update active buttons and colors
      submit_active = false;
      start_active = true;
      d3.select('#START').style('background-color', 'rgb(68,199,103)');
      d3.select('#STOP').style('background-color', 'rgb(175,175,175)');
      //display "correct" message to user
      d3.select("#result").text('CORRECT')
        .style('opacity', 1)
      d3.select('#STOP').attr('fill', 'black')
    } else {
      //briefly show "wrong" message to user
      d3.select("#result").text('WRONG')
        .style('opacity', 1)
        .transition()
        .duration(1000)
        .style("opacity", 0)
      //put cursor in textbox
      document.getElementById('ANSWER').focus();
      document.getElementById('ANSWER').select();
    }
  }
});

//update instructions based on radio button selection
function myFunction() {
  myText = "Count the "
  var myDD = document.getElementById("colorDD");
  var colorX = myDD.options[myDD.selectedIndex].text;
  var myDD2 = document.getElementById("shapeDD");
  var shapeX = myDD2.options[myDD2.selectedIndex].text;
  var letterE = "";
  if (shapeX == "Cross") {letterE = "e"};
  if (document.getElementById('rbColor').checked) {
    myText += colorX + " Squares";
    document.getElementById("shapeDD").style.visibility = "hidden";
    document.getElementById("colorDD").style.visibility = "visible";

  } else if (document.getElementById('rbShape').checked) {
    myText += "Black " + shapeX + letterE + "s";
    document.getElementById("shapeDD").style.visibility = "visible";
    document.getElementById("colorDD").style.visibility = "hidden";
  } else {
    myText += colorX + " " + shapeX + letterE + "s";
    document.getElementById("shapeDD").style.visibility = "visible";
    document.getElementById("colorDD").style.visibility = "visible";
  }
    document.getElementById("instructions").innerHTML = myText;
}

//class for controlling timer
class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.laps = [];
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = [0, 0];
  }

  start() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  stop() {
    this.running = false;
    this.time = null;
  }

  restart() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.reset();
  }

  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[1] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[1] >= 100) {
      this.times[0] += 1;
      this.times[1] -= 100;
    }
  }

  print() {
    this.display.innerText = this.format(this.times) + ' sec';
  }

  //add leading zero to beginning of time value
  format(times) {
    return `\
${pad0(times[0], 2)}.\
${pad0(Math.floor(times[1]), 2)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
    result = '0' + result;
  return result;
}

let stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'));