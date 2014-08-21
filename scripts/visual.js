//reorder code using this forum post
// http://stackoverflow.com/questions/11102795/d3-node-labeling
function roundToOneDecimal(number) {
	return d3.round(number, 2)
}
var addComma = d3.format("0,000");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    //.html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + '<span>' +'$'+ d.value + '</span>' + ' raised' + '<br>' + d.category })
    //.html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + 'mentions: ' + '<span>' + d.mentions + '</span>' + '<br>' + 'sentiment: ' + '<span>' + d.sentiment + '</span>' + '<br>' + 'passion: ' + '<span>' + d.passion + '</span>' + '<br>' + 'popularity: ' + '<span>' + d.shared + '</span>';})
    //.html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + 'affinity: ' + '<span>' + roundToOneDecimal(d.affinity) + '</span>' + '<br>' + 'topic audience: ' + '<span>' + d.topicAudience + '</span>' + '<br>' + 'general audience: ' + '<span>' + addComma(d.generalAudience) + '</span>'})// + '<br>' + 'popularity: ' + '<span>' + d.shared + '</span>';})
	.html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + 'affinity: ' + '<span>' + roundToOneDecimal(d.affinity) + '</span>' + '<br>' + 'volume: ' + '<span>' + d.mentions + '</span>'})// + '<br>' + 'general audience: ' + '<span>' + addComma(d.generalAudience) + '</span>'})// + '<br>' + 'popularity: ' + '<span>' + d.shared + '</span>';})
    .offset([-12, 0]);

var buttonBenchmarkAffinity = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    //.attr("class", "btn btn-primary")
    .attr("id", "button_showShows")
    .attr("type","button")
    .attr("value", "Affinity");

var buttonSentiment = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    //.attr("class", "btn btn-primary")
    .attr("id", "button_showSentiment")
    .attr("type","button")
    .attr("value", "Sentiment");

var buttonPassion = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    //.attr("class", "btn btn-primary")
    .attr("id", "button_showPassion")
    .attr("type","button")
    .attr("value", "Passion");

var buttonShowScatter = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    //.attr("class", "btn btn-primary")
    .attr("id", "button_showScatter")
    .attr("type","button")
    .attr("value", "Passion & Sentiment plot");

var buttonShowAll = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    //.attr("class", "btn btn-primary")
    .attr("id", "button_showAll")
    .attr("type","button")
    .attr("value", "All shows");

var buttonShowSentiment = d3.select("#buttons")
	.append("input")
	.attr("class", "btn btn-default")
	.attr("id", "button_showsentiment")
    .attr("type","button")
    .attr("value", "sentiment color");

var buttonShowPassion = d3.select("#buttons")
	.append("input")
	.attr("class", "btn btn-default")
	.attr("id", "button_showpassion")
    .attr("type","button")
    .attr("value", "passion color");

var buttonShowNocolor = d3.select("#buttons")
	.append("input")
	.attr("class", "btn btn-default")
	.attr("id", "button_reset")
    .attr("type","button")
    .attr("value", "reset color");
/*
var strokeColor = d3.scale.ordinal()
	.domain(["mostLoved", "mostAnticipated", "mostWatched", "notAirtime"]) 
	.range(['#8b0000','#de8637','#c4e8ba', '#004499']);
*/

var margin = {top: 30, right: 100, bottom: 30, left: 300},
	width = 1200 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var nodeCenter = {x: width/2, y: height/2};

var svg = d3.select('#visual').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
  .append('g')
	.attr('transform', 'translate(' + margin.left/2 + ',' + margin.top + ')');

svg.call(tip);

var nodes = [],
	damper = 0.1;

d3.json(DATA, function(originaldata) {
	
	console.log('DATA')
	var data = originaldata.splice(0,100)
	console.log(data)
	console.log(data.length)

	var radiusScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.radius; }), d3.max(data, function(d) {return d.radius; }) ])
		.range([15, 55]);

	/*
	var sentimentScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.sentiment; }), d3.max(data, function(d) {return d.sentiment; }) ])
		.range(["red", "green"]);
	*/

	var padding = 6, // separation between nodes
    	maxRadius = 40;

	data.forEach(function(d) {
		/*
		var affinity = (d.term_topic_audience/rawdata.topic_audience)/(d.term_general_audience/rawdata.general_audience)
		//console.log(d.term)
		//console.log(d.term_topic_audience)
		//console.log(rawdata.topic_audience)
		//console.log(d.term_general_audience)
		//console.log(rawdata.general_audience)
		var numerator = d.term_topic_audience/rawdata.topic_audience
		var denominator = d.term_general_audience/rawdata.general_audience
		//console.log(numerator)
		//console.log(denominator)

		//console.log('-----------')
		//console.log(affinity)
		*/
		var rad;
		if (d.radius) {
			rad = radiusScale(parseInt(d.radius))
		} else {
			rad = 2
		}
 		//else {rad = maxRadius}

 		function randSentiment() {
 			var min = -20;
 			var max = 75;
 			//return 20;
 			return Math.floor(Math.random() * (max - min + 1)) + min;
 		}

 		function randPassion() {
 			var min = 0;
 			var max = 60;
 			//return 20;
 			return Math.floor(Math.random() * (max - min + 1)) + min;
 		}

		node = {
			// parse date eventually
			//name: d.term,
			name: d.insight,
			//affinity: affinity,
			affinity: d.index,
			//topicAudience: d.term_topic_audience,
			//generalAudience: d.term_general_audience,
			//mentions: d.mentions,
			//sentiment: d.sentiment,
			mentions: d.volume,
			sentiment: randSentiment(),
			passion: randPassion(),
			//passion: d.passion,
			//shared: d.shared,
			shared: d.volume,
			//radius: radiusScale(parseInt(d.mentions, 10)),
			radius: radiusScale(d.radius),
			//radius: rad,
			//radius: function() {
				//if (d.mentions) {return radiusScale(parseInt(d.mentions, 10))}
				//else {return 20}
				//return 20
			//},
			x: Math.random() * 900,
			y: Math.random() * 800
		};
		//nodes.push(node);
		// ***don't add if the metric is huge
		//ar.removeIf( function(item, idx) { return item.str == "c"; })
		if (node.affinity < 1000) {
			nodes.push(node);
		};
	}); //end of data.forEach
	nodes.sort(function(a,b) {return b.value - a.value; });

	data = nodes;
	console.log(data)

	console.log('new new data')
	console.log(data)

    var xScaleAffinity = d3.scale.linear()
        //.domain([d3.min(data, function(d) { return d.affinity; }), d3.max(data, function(d) { return d.affinity; })])
        .domain([d3.min(data, function(d) { return d.affinity;}), d3.max(data, function(d) { return d.affinity; })])
	    .range([0, width]);
	

	var xAxisAffinity = d3.svg.axis()
    	.orient("bottom")
    	.scale(xScaleAffinity);

    var xAxisAffinityBenchmark = d3.svg.axis()
    	.orient("bottom")
    	.scale(xScaleAffinity)
    	.tickValues([0])
    	.tickFormat("")
    	.tickSize(-height, 0, 0)

   	// ------ x scales

    var xScaleSentiment = d3.scale.linear()
        .domain([d3.min(data, function(d) { return d.sentiment; }), d3.max(data, function(d) { return d.sentiment; })])
	    .range([ 0, width]);

	var xAxisSentiment = d3.svg.axis()
    	.orient("bottom")
    	.scale(xScaleSentiment);

	var xAxisSentimentBenchmark = d3.svg.axis()
    	.orient("bottom")
    	.scale(xScaleSentiment)
    	.tickValues([40])
    	.tickFormat("")
    	.tickSize(-height, 0, 0);

    var xScalePassion = d3.scale.linear()
        .domain([d3.min(data, function(d) { return d.passion; }), d3.max(data, function(d) { return d.passion; })])
	    .range([ 0, width]);

	var xAxisPassion = d3.svg.axis()
    	.orient("bottom")
    	.scale(xScalePassion);

	var xAxisPassionBenchmark = d3.svg.axis()
    	.orient("bottom")
    	.scale(xScalePassion)
    	.tickValues([40])
    	.tickFormat("")
    	.tickSize(-height, 0, 0);

   	// ------ y scales

    var yScalePassion = d3.scale.linear()
        //.domain([d3.min(data, function(d) { return d.passion; }), d3.max(data, function(d) { return d.passion; })])
        .domain([0, d3.max(data, function(d) { return d.passion; })])
	    .range([ height, 0]);

	var yAxisPassion = d3.svg.axis()
    	.orient("left")
    	.scale(yScalePassion);

    var yAxisPassionBenchmark = d3.svg.axis()
    	.orient("left")
    	.scale(yScalePassion)
    	.tickValues([30])
    	.tickFormat("")
    	.tickSize(-width, 0, 0);

    // ------- Color Scales

    var affinityColorScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.affinity; }), d3.max(data, function(d) {return d.affinity; }) ])
		//.range(["#f3f3f3", "#0074D9"]);
		.range(["#ccf1ff", "#0074D9", "#001F3F"]);

    var sentimentScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.sentiment; }), d3.max(data, function(d) {return d.sentiment; }) ])
		//.range(["red", "green"]);
		.range(["#FF4136", "#2ECC40"]);

	var passionColorScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.passion; }), d3.max(data, function(d) {return d.passion; }) ])
		.range(["#0074D9", "#FF4136"]);

    // --------

	var gnodes = svg.selectAll('.node')
		.data(nodes)
	//circles.enter()
		.enter()
		.append('g')
		.attr('class', 'node');
		
	var circles = gnodes.append('circle')
		.attr('class', 'mynodes')
		.attr('id', function(d,i) {return d.name + '_' + i})
		//.attr('r', d3.max(nodes, function(d) {return radiusScale(d.mentions)})
		.attr('r', function(d) {return d.radius})
		.attr('stroke-width', 2)
		/*
		.attr('fill', function(d) {
			if (d.show == "allShows") {return 'white'}
			else {return 'black'}
		})
		*/
		//.attr('fill', '#001F3F')
		.attr("fill", "#d9d9d9")
		//.attr('stroke', function(d) {return strokeColor(d.theme)})
		//.attr('stroke', function(d) {return '#0074D9'})
		.attr('stroke', function(d) {return 'white'})

	var text = gnodes.append('text')
		.attr('id', function(d,i) {return d.name + '_text_' + i})
		//.attr("x", 1)
	    //.attr("y", ".31em")
	    .style("text-anchor", "middle")
	    .attr('dominant-baseline', 'central')
	    //.attr('font-family', 'FontAwesome')
	    //.attr('fill', '#AAAAAA')
	    /*
	    .attr('fill', function(d) {
	    	if (d.show=="allShows") {return 'black'}
	    	//else {return 'white'}
	    	else {return 'steelblue'}
	    })
		*/
	    //.attr("class", "nodelabels")
	    .text(function(d) {
	    	//if (d.show=="allShows") {return d.show}
	    	//if (d.show=="allShows") {return 'All Shows'}
	    	//else {return ICON_UNICODE[d.theme] }
	    	//else {return d.show }
	    	return d.name
		}) 

	circles.on('mouseover', tip.show);
	circles.on('mouseout', tip.hide);
	//circles.selectAll('.mynodes').on('mouseover', tip.show);
	//circles.selectAll('.mynodes').on('mouseout', tip.hide);
	//gnodes.selectAll('.mynodes').on('mouseover', tip.show);
	//gnodes.selectAll('.mynodes').on('mouseout', tip.hide);

	function charge(d) {
		//return -Math.pow(d.radius*4, 2.0) / 60;
		//return -20;
		//return -40;
		//return d.radius * d.radius * -0.25;
		return d.radius * d.radius * -0.2;
	};

	// Resolve collisions between nodes.
	function collide(alpha) {
	  	var quadtree = d3.geom.quadtree(nodes);
	  		return function(d) {
	    		var r = d.radius + maxRadius + padding,
			        nx1 = d.x - r,
			        nx2 = d.x + r,
			        ny1 = d.y - r,
			        ny2 = d.y + r;
	    quadtree.visit(function(quad, x1, y1, x2, y2) {
	      	if (quad.point && (quad.point !== d)) {
	        	var x = d.x - quad.point.x,
		            y = d.y - quad.point.y,
		            l = Math.sqrt(x * x + y * y),
		            r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
		        if (l < r) {
		          	l = (l - r) / l * alpha;
		          	d.x -= x *= l;
		          	d.y -= y *= l;
		          	quad.point.x += x;
		          	quad.point.y += y;
		        }
	      	}
	      	return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	    });
			};
	}; //end of collision

	var force = d3.layout.force()
		.nodes(nodes)
		.size([width, height]);

	circles.call(force.drag);

	// Render nodes
	renderNodes(xScaleAffinity, 'affinity', true)

	/*
	force.gravity(0)
		.charge(0)
		.friction(0.95)
		//.on('tick', tick)
		.on('tick', function(e) {
			force.nodes().forEach(function(d) {
				var target = nodeCenter
					d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
					d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
			})
			circles
			//svg.selectAll('circle')
				//.each(gravity(.2*e.alpha))
				.each(collide(.5))
				//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
				.attr('cx', function(d) {return d.x; })
				.attr('cy', function(d) {return d.y; })

			text
			//svg.selectAll('circle')
				//.each(gravity(.2*e.alpha))
				.each(collide(.5))
				.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
				//.attr('cx', function(d) {return d.x; })
				//.attr('cy', function(d) {return d.y; })
		}); //end of .on('tick') etc etc
		
	force.start();
	*/

	//function renderNodes(scale, key, targetX, targetY) {
	function renderNodes(scale, keyz, boolean) {
		force.gravity(0)
			.charge(0)
			.friction(0.95)
			//.on('tick', tick)
			.on('tick', function(e) {
				force.nodes().forEach(function(d) {
					var target = {}
						//target.x = scale(key);
						//var mykey = keyz
						//console.log('$$$$$$$$$$$$')
						//console.log(mykey)
						if (boolean == true){
							target.x = width/2
						} else {
							target.x = scale(d[keyz])
						}
						//target.x = scale(d[keyz])
						//target.x = scale(d.affinity)

						//target.x = scale(d[keyz])
						//target.x = width/2

						// instead of boolean, check for parameters
						//keyz == undefined && scale == undefined ? 

						//target.x = scale(mykey)
						//console.log(setX)
						//target.x = setX
						target.y = height/2;

						d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
						d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
				})
				circles
				//svg.selectAll('circle')
					.each(collide(.5))
					//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					.attr('cx', function(d) {return d.x; })
					.attr('cy', function(d) {return d.y; })

				text
					.each(collide(.5))
					.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					//.attr('cx', function(d) {return d.x; })
					//.attr('cy', function(d) {return d.y; })
			}); //end of .on('tick') etc etc
			
		force.start();
	} // end of renderNodes

	//function to change fill based on value entered
	function nodeFillSentiment() {
		circles
			//.selectAll('circle')
			.transition().duration(500)
			.attr('fill', function(d) {
				return sentimentScale(d.sentiment);
				//if (d.show == "allShows") {return 'white'}
				//else {return sentimentScale(d.sentiment)}
			})
	};

	function nodeFillAffinity() {
		circles
			//.selectAll('circle')
			.transition().duration(500)
			.attr('fill', function(d) {
				return affinityColorScale(d.affinity);
				//if (d.show == "allShows") {return 'white'}
				//else {return sentimentScale(d.sentiment)}
			})
	};

	function nodeFillPassion() {
		circles
			//.selectAll('circle')
			.transition().duration(500)
			.attr('fill', function(d) {
				//return sentimentScale(d.sentiment);
				return passionColorScale(d.passion)
			})
	};

	function nodeResetColor() {
		circles
			//.selectAll('circle')
			.transition().duration(500)
			.attr('fill', function(d) {
				//return sentimentScale(d.sentiment);
				//if (d.show == "allShows") {return 'white'}
				//else {return 'black'}
				return "#d9d9d9"
			})
	}

	function addMainAxis(axisCalled, axisText) {
		svg.append("g")
    		.attr("class", "x axis")
    		.attr("transform", "translate(0," + height + ")")
    		.call(axisCalled)
    	.append("text")
	    	.attr("x", width)
	      	.attr("y", -16)
	      	.attr("dy", ".71em")
	      	.style("text-anchor", "end")
	      	.text(axisText);
	}

	function addBenchmarklineAxis(axisCalled) {
		svg.append("g")
    		.attr("class", "x axis")
    		.attr("transform", "translate(0," + height + ")")
    		.call(axisCalled);
	}

	function removeAxis() {
		svg.selectAll(".axis").remove();
	}

	// $$$$$$ BUTTONS
	buttonBenchmarkAffinity
		.on('click', function() {
			removeAxis();
			nodeFillAffinity();
			addMainAxis(xAxisAffinity, "Affinity");
			addBenchmarklineAxis(xAxisAffinityBenchmark);
	    	renderNodes(xScaleAffinity, 'affinity');
	});


	// ************
	buttonSentiment
		.on("click", function() {
			removeAxis();
			nodeFillSentiment();
			addMainAxis(xAxisSentiment, "Sentiment");
			addBenchmarklineAxis(xAxisSentimentBenchmark);
			renderNodes(xScaleSentiment, 'sentiment')
		});

	buttonPassion
		.on("click", function() {
			removeAxis();
			nodeFillPassion();
			addMainAxis(xAxisPassion, "Passion");
			addBenchmarklineAxis(xAxisPassionBenchmark);
			renderNodes(xScalePassion, 'passion');
		})

	buttonShowScatter
		.on("click", function() {
			removeAxis();
			nodeResetColor();
			// may be better to put this code in functions
			// actually. this could be great example to make it OOP
			// make object, and then add properties instead of parameters in functions

			// axis
			//add x axis
		    svg.append("g")
		    	.attr("class", "x axis")
		    	.attr("transform", "translate(0," + height + ")")
		    	.call(xAxisSentiment)
		    .append("text")
		    	.attr("x", width)
		      	.attr("y", -16)
		      	.attr("dy", ".71em")
		      	.style("text-anchor", "end")
		      	.text("Sentiment");
		    

		    //add y axis
		    svg.append("g")
		    	.attr("class", "y axis")
		    	//.attr("transform", "translate(120," + 0 + ")")
		    	.call(yAxisPassion)
		    .append("text")
		    	.attr("transform", "rotate(-90)")
		      	.attr("y", 6)
		      	.attr("dy", ".71em")
		      	.style("text-anchor", "end")
		      	.text("Passion");

		    // add benchmarks
		    // x axis
		    svg.append("g")
				.attr("id", "scatterBenchmark")	
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxisSentimentBenchmark)
		    // y axis
		    svg.append("g")
		    	.attr("id", "scatterBenchmark")	
		    	.attr("class", "y axis")
		    	//.attr("transform", "translate(120," + 0 + ")")
		    	.call(yAxisPassionBenchmark)

		    // re-arrange nodes
		    force.gravity(0)
			.charge(0)
			.friction(0.95)
			//.on('tick', tick)
			.on('tick', function(e) {
				force.nodes().forEach(function(d) {
					var target = {}
						target.x = xScaleSentiment(d.sentiment)
						target.y = yScalePassion(d.passion)

						d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
						d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
				})
				circles
				//svg.selectAll('circle')
					.each(collide(.5))
					//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					.attr('cx', function(d) {return d.x; })
					.attr('cy', function(d) {return d.y; })

				text
					.each(collide(.5))
					.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					//.attr('cx', function(d) {return d.x; })
					//.attr('cy', function(d) {return d.y; })
			}); //end of .on('tick') etc etc
			
			force.start();


		})

/*
buttonSentiment
	.on('click', function() {
		
		removeAxis();

		svg.append("g")
			.attr("id", "scatterBenchmark")	
    		.attr("class", "x axis")
    		.attr("transform", "translate(0," + height + ")")
    		.call(xAxisSentiment)
    	.append("text")
	    	.attr("x", width)
	      	.attr("y", -16)
	      	.attr("dy", ".71em")
	      	.style("text-anchor", "end")
	      	.text("Sentiment");

	    svg.append("g")
			.attr("id", "scatterBenchmark")	
    		.attr("class", "x axis")
    		.attr("transform", "translate(0," + height + ")")
    		.call(xAxisSentimentBenchmark)

		force
			.on('tick', function(e) {
				force.nodes().forEach(function(d) {
					var target = {}
						target.x = xScaleSentiment(d.sentiment)
						target.y = height/2
						console.log(target)
						d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
						d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
				})
				circles
					//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					.each(collide(.5))
					.attr('cx', function(d) {return d.x; })
					.attr('cy', function(d) {return d.y; })

				text
					.each(collide(.5))
					.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			}); //end of .on('tick') etc etc
		force.start();

	});
*/


buttonShowAll
	.on('click', function() {
		removeAxis();
		nodeResetColor();
		console.log('move nodes back to center');
		renderNodes(xScaleAffinity, 'affinity', true);
	})

buttonShowSentiment
	.on('click', function() {
		nodeFillSentiment();
		//text.attr("fill", "yellow");
		//circles.transition().duration(500).attr("fill", "red");
	});

buttonShowPassion
	.on("click", function() {
		nodeFillPassion()
	})

buttonShowNocolor
	.on("click", function() {
		circles
			.transition().duration(500)
			.attr("fill", "#d9d9d9");
	});



}); //end of json function
