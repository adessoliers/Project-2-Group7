url = "http://127.0.0.1:5000/aqi"

d3.json(url).then(function(data) {
    console.log(data);
  });

var states = d3.select("#selDataset")
d3.json(url).then(function(data) {
  
    var state = data
    state.forEach(thing => {
        states.append("option").text (thing[0]).property("value")
        console.log(state)
    })
optionChanged(state)
});