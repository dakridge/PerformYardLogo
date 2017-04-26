(function () {

	"use strict";

	// colors
	var color 			= "#053448";
	var canvas_width 	= 600;
	var logo_size 		= 500;

	var circle_radius 	= [ 40, 20, 10 ];
	var circle_counts 	= [ 19, 20, 15 ];
	var ring_radius 	= [ logo_size, logo_size * .7, logo_size * .5 ];

	var container 			= d3.select(".svg-container"),
		margin 				= { "top": 20, "right": 20, "bottom": 20, "left": 20 },
		container_width 	= canvas_width + margin.left + margin.right,
		container_height 	= canvas_width + margin.top + margin.bottom;

	var width = container_width - margin.left - margin.right,
		height = container_height - margin.top - margin.bottom;

	var svg = container.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var rings = svg.selectAll(".ring")
		.data([0, 1, 2])
		.enter()
		.append("g")
		.attr("class", "ring")
		.attr("transform", function (d) { return "translate(" + ( ( canvas_width - logo_size ) / 2 ) + "," + ( ( canvas_width - logo_size ) / 2 ) + ")"; });

	var circles = rings.selectAll(".circle")
		.data(function( d, i ){ return distributeCoords( circle_counts[d], circle_radius[d], logo_size/2, logo_size/2, ring_radius[d]/2 ); })
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("cx", function ( d, i ) { return d[0]; })
		.attr("cy", function ( d, i ) { return d[1]; })
		.attr("r", function( d, i ){ return d[2]; });

})();

function distributeCoords ( points, size, cx, cy, r ) {

	var coords = [];

	for ( var i = 0; i < points; i++ ) {

		var theta = (( Math.PI * 2 ) / points );
		var angle = ( theta * i );

		coords.push([ cx + r * Math.cos( angle ), cy + r * Math.sin( angle ), size ]);

	}

	return coords;

}