// // Time
// var dataTime = d3.range(0, 10).map(function(d) {
//     return new Date(2010 + d, 10, 3);
//   });
  
//   var sliderTime = d3
//     .sliderBottom()
//     .min(d3.min(dataTime))
//     .max(d3.max(dataTime))
//     .step(1000 * 60 * 60 * 24 * 365)
//     .width(300)
//     .tickFormat(d3.timeFormat('%Y'))
//     .tickValues(dataTime)
//     .default(new Date(2019, 10, 3))
//     .on('onchange', val => {
//       d3.select('#value-time').text(d3.timeFormat('%Y')(val));
//   });
  
//   var gTime = d3
//     .select('#slider-time')
//     .append('svg')
//     .attr('width', 500)
//     .attr('height', 100)
//     .append('g')
//     .attr('transform', 'translate(30,30)');
  
//   gTime.call(sliderTime);
  
//   d3.select('#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));


// w3.schools APPROACH
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}