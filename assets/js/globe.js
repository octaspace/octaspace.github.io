$(function(){
  'use strict';
/**
* @summmary
* Animated canvas particles.
* @desc
* It designs animated particles on a canvas that exists inside a node or nodes.
* 
* We let the user to form the positioning of the canvas with the rest of the nodes.
* @var {Object} window.nd2Lz5SVZbwKogdNM8wts6F2
*/
window.nd2Lz5SVZbwKogdNM8wts6F2 = window.nd2Lz5SVZbwKogdNM8wts6F2 || {};
/*
* =================
* PRIVATE VARIABLES
* =================
*/
/*
* Some default values.
*/
var defaults = {
  population : 100,
  maxDist : 200,
  colour  : "249,249,249",
  every   : 100,
  canvas : null,
  mousePos: null,
  points : []
};

/*
* =================
* PRIVATE FUNCTIONS
* =================
*/
function init (node, defs) {
  var $collection;
  
  // 1. local '$collection'
  if(node)
     $collection = $('.nd2Lz5SVZbwKogdNM8wts6F2').filter(node);
  else
     $collection = $('.nd2Lz5SVZbwKogdNM8wts6F2');
  $collection = $collection.filter(function(){
     return $(this).find('canvas').length;
  });
  
  if($collection.length == 0)
     return false;
  
  $collection.each(function(){
     var $n = $(this),
         nodeDefs;
     
     // 2. apply new 'defaults'
     nodeDefs = {};
     $.extend(true, nodeDefs, defaults, $n.data('defaults'), defs);
     nodeDefs.canvas = $n.find('canvas').get(0);
     $n.data('defaults', nodeDefs);
     
     // 3. add events
     $n.on('click', 'canvas', function(evt){
        nodeDefs.mousePos = getMousePos(evt);
     });
     resizeCanvas(null, nodeDefs);
     generatePoints(nodeDefs);
     pointFun(nodeDefs);
     setInterval(function(){pointFun(nodeDefs);}, nodeDefs.every);
     
     $(window).on('resize', nodeDefs, resizeCanvas);
  });
}
  
//Particle constructor
function point (nodeDefs) {
  this.x = (Math.random()*(canvas.width+defaults.maxDist))-(defaults.maxDist/2);
  this.y = (Math.random()*(canvas.height+defaults.maxDist))-(defaults.maxDist/2);
  this.vx = (Math.random()*1)-.5;
  this.vy = (Math.random()*1)-.5;
  this.dia = Math.random()*3+1;
  nodeDefs.points.push(this);
}
//Point generator
function generatePoints (nodeDefs) {
  var temp;
  for (var i = 0; i < nodeDefs.population; i++) {
     temp = new point(nodeDefs);
  };
}
//Point drawer
function draw (obj, nodeDefs) {
  var ctx = ctx = nodeDefs.canvas.getContext("2d");
  
  ctx.beginPath();
  ctx.fillStyle = "rgb("+nodeDefs.colour+")";
  if(obj.dia){
     ctx.arc(obj.x, obj.y, obj.dia, 0,2*Math.PI);
  }else{
     ctx.arc(obj.x, obj.y, 2, 0, 2*Math.PI);
  }
  ctx.closePath();
  ctx.fill();
  //ctx.stroke();
}
//Updates point position values
function update (obj, nodeDefs) {
  obj.x += obj.vx;
  obj.y += obj.vy;
  if (obj.x > nodeDefs.canvas.width + (nodeDefs.maxDist/2)) {
     obj.x = -(nodeDefs.maxDist/2);
  }
  else if (obj.xpos < -(nodeDefs.maxDist/2)) {
     obj.x = nodeDefs.canvas.width + (nodeDefs.maxDist/2);
  }
  if (obj.y > nodeDefs.canvas.height+(nodeDefs.maxDist/2)) {
     obj.y = -(nodeDefs.maxDist/2);
  }
  else if (obj.y < -(nodeDefs.maxDist/2)) {
     obj.y = nodeDefs.canvas.height + (nodeDefs.maxDist/2);
  }
}
// draws points
function pointFun (nodeDefs) {
  var ctx = ctx = nodeDefs.canvas.getContext("2d");
  
  ctx.clearRect(0, 0, nodeDefs.canvas.width, nodeDefs.canvas.height);
  if (nodeDefs.mousePos) {
     collision(nodeDefs.mousePos, nodeDefs, nodeDefs.maxDist*2);
     draw(nodeDefs.mousePos, nodeDefs);
  }
  for (var i = 0; i < nodeDefs.points.length; i++) {
     collision(nodeDefs.points[i], nodeDefs, nodeDefs.maxDist);
     draw(nodeDefs.points[i], nodeDefs);
     update(nodeDefs.points[i], nodeDefs);
  };
}
// draw lines
function collision (obj, nodeDefs, dist) {
  var ctx = ctx = nodeDefs.canvas.getContext("2d"),
      temp;
  
  for (var i = 0; i < nodeDefs.points.length; i++) {
     //Don't interact with self
     if (obj !== nodeDefs.points[i]) {
        temp = Math.sqrt(Math.pow((obj.x - nodeDefs.points[i].x), 2) + Math.pow((obj.y - nodeDefs.points[i].y), 2));
        if (temp < dist) {
           ctx.beginPath();
           ctx.moveTo(obj.x, obj.y);
           ctx.strokeStyle = "rgba("+nodeDefs.colour+"," + .8*Math.pow((dist-temp)/dist, 5)+")";
           ctx.moveTo(obj.x, obj.y);
           ctx.lineTo(nodeDefs.points[i].x, nodeDefs.points[i].y);
           ctx.closePath();
           ctx.stroke();
        };
     }
  };
}

/*
* Events.
*/
function resizeCanvas(evt, nodeDefs) {
  var defs;
  
  if(evt)
     defs = evt.data;
  else
     defs = nodeDefs;
  
  if(defs){
     defs.canvas.width = $(defs.canvas).parent().innerWidth();
     defs.canvas.height = $(defs.canvas).parent().innerHeight();
     pointFun(defs);
  }
}
function getMousePos(evt) {
  var rect = evt.target.getBoundingClientRect();
  return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top
  };
}

/*
* ================
* PUBLIC FUNCTIONS
* ================
*/
/**
* @summary
* Sets private variable `defaults`.
* @desc
* Variable `defaults` is an object with keys:
* ```
* {
*    // number of points
*    population : 100,
* 
*    // maximum distance of conection lines
*    maxDist : 200,
* 
*    // color of lines and points
*    colour  : "249,249,249",
* 
*    // time frequency in ms for redraw
*    every   : 100
* }
* ```
* @function window.nd2Lz5SVZbwKogdNM8wts6F2.setDefaults
* @param {object} defs User values for defaults
* @return {Object} This object
*/
nd2Lz5SVZbwKogdNM8wts6F2.setDefaults = function(defs){
  $.extend(true, defaults, defs);
  
  return nd2Lz5SVZbwKogdNM8wts6F2;
};

/**
* @summary
* (Re-)Initializes the canvas particles.
* @desc
* Initialization pays attention to memmory effects on subsequent calls.
* @function window.nd2Lz5SVZbwKogdNM8wts6F2.init
* @param {object} node A collection of nodes that contain canvases
* @param {Object} defs Object that controls the behavior of the canvas particles
* @return {Object} This object
*/
nd2Lz5SVZbwKogdNM8wts6F2.init = init;

nd2Lz5SVZbwKogdNM8wts6F2.init('.nd2Lz5SVZbwKogdNM8wts6F2');
});
