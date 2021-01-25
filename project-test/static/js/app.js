
url = "http://127.0.0.1:5000/generation"

d3.json(url).then(function(data) {
    console.log(data);
  });

// var states = d3.select("#selDataset")
// d3.json(url).then(function(data) {
  
//     var state = data
//     state.forEach(thing => {
//         states.append("option").text (thing[0]).property("value")
//         console.log(state)
//     })
// optionChanged(state)
// });


// d3.select("#selDataset").selectAll("option")
//     .data(d3.map(url, function(d){return d;}).keys())
//     .enter()
//     .append("option")
//     .text(function(d){return d;})
//     .attr("value",function(d){return d;});

console.log(d3.set(url).values);