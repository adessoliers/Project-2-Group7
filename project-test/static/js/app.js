url = "http://127.0.0.1:5000/aqi-percentage"

d3.json(url).then(function(data) {
    console.log(data);
  });
var select = d3.select("#selDataset")
d3.json(url).then(function(data) {
    var states = data.map(state => state.state)
    states = [...new Set(states)]
    console.log(states)
    states.forEach(state => {
        select.append("option").text(state).property("value", state)
        // console.log(state)
    })
optionChanged(states[0])
});
    function optionChanged(userInput) {
        d3.json(url).then(function(data){
            var demoData = data
            var demoFilter = demoData.filter(data => data.state == userInput)
            console.log(demoFilter)
            // Create xaxis that displays years
            var year =  demoFilter.map(year => year.year)
            // year = [...new Set(year)]
            xAxis = year
            // Create y axis that displays energy source
            var aqi_good_days = demoFilter.map(aqi_good_days => aqi_good_days.percentage_good_days)
            // aqi_good_days = [...new Set(aqi_good_days)]
            yAxis = aqi_good_days
            
            var trace1 = {
                x: year,
                y: aqi_good_days,
                type: "bar",
                name: '% Good Days',
            };
            
            var aqi_bad_days = demoFilter.map(aqi_bad_days => aqi_bad_days.percentage_bad_days)
            // aqi_bad_days = [...new Set(aqi_bad_days)]
            yAxis = aqi_bad_days
            
            var trace2 = {
                x: year,
                y: aqi_bad_days,
                type: "bar",
                name: '% Bad Days',
            };
            
            var data = [trace1, trace2];
            
            var layout_bar = {
                barmode: 'stack',
                title: {text: "Percentage Good AQI Days vs Bad AQI Days"},
                xaxis: {title: "Year"},
                yaxis: {title: "% Days"}
            };
            
            Plotly.newPlot("air-bar", data, layout_bar);
        });
    };



