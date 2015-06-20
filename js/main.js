(function () {

	"use strict";

	// the driver
	var head_diameter = 50;

	// logo relationships
	var shoulder_width_ratio = 0.25;

	// logo definitions
	var base_width = 0.8 * head_diameter,
		logo_height_step = base_width,
		first_height = 2.5 * base_width,
		neck_length = head_diameter * 0.06,
		triangle_height = head_diameter * 0.44,
		human_spacing = 0.25 * base_width;

	// logo calculations
	var total_height = first_height + (logo_height_step * 3) + triangle_height + neck_length + head_diameter,
		human_width = ( ( shoulder_width_ratio * base_width * 2) + base_width ),
		total_width = ( human_width * 4 ) + ( human_spacing * 3 );

	var container = d3.select(".svg-container"),
		margin = { "top": 20, "right": 20, "bottom": 20, "left": 20 },
		container_width = total_width + margin.left + margin.right,
		container_height = total_height + margin.top + margin.bottom;

	var width = container_width - margin.left - margin.right,
		height = container_height - margin.top - margin.bottom;

	var svg = container.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var humans = svg.selectAll(".human")
		.data([0, 1, 2, 3])
		.enter()
		.append("g")
		.attr("class", "human")
		.attr("transform", function (d) { return "translate(" + ( (human_width + human_spacing) * d ) + "," + ( 0 ) + ")"; })

	humans.append("polygon")
		.attr("points", function (d, i) {

			var item_height = first_height + (logo_height_step * d);

			var points =  ( shoulder_width_ratio * base_width ) + "," + ( total_height ) + " "; // bottom left
			points += ( shoulder_width_ratio * base_width + base_width ) + "," + ( total_height ) + " "; // bottom right
			points += ( (shoulder_width_ratio * base_width * 2) + base_width ) + "," + ( total_height - item_height ) + " "; // top right
			points +=  (( shoulder_width_ratio * base_width ) + (base_width/2)) + "," + ( total_height - item_height - triangle_height ) + " "; // top of the triangle
			points += "0," + ( total_height - item_height ); // top left

			return points;
		});

	humans.append("circle")
		.attr("cx", (base_width/2) + (base_width * shoulder_width_ratio))
		.attr("cy", function (d) { return total_height - first_height - triangle_height - neck_length - (head_diameter/2) - (logo_height_step * d); })
		.attr("r", head_diameter/2);

})();