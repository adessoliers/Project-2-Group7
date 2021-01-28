url = "http://127.0.0.1:5000/generation"
aqi = "http://127.0.0.1:5000/aqi-percentage"


d3.json(url).then(function(data) {
    // console.log(data);
  });

var select = d3.select("#selDataset")
d3.json(url).then(function(data) {
    
    var states = data.map(state => state.state)

    states = [...new Set(states)]
    // console.log(states)


    states.forEach(state => {
        select.append("option").text(state).property("value", state)
        // console.log(state)
    })
optionChanged(states[0])
});


    function optionChanged(userInput) {

        d3.json(aqi).then(function(data){
            var aqidemoData = data
            var aqidemoFilter = aqidemoData.filter(data => data.state == userInput)
            
            // Create xaxis that displays years
            var aqiyear =  aqidemoFilter.map(year => year.year)
            
            // Create y axis that displays energy source
            var aqi_good_days = aqidemoFilter.map(aqi_good_days => aqi_good_days.percentage_good_days)
            
            var traceaqi1 = {
                x: aqiyear,
                y: aqi_good_days,
                type: "bar",
                name: '% Good Days',
            };
            
            var aqi_bad_days = aqidemoFilter.map(aqi_bad_days => aqi_bad_days.percentage_bad_days)
            
            yAxis = aqi_bad_days
            
            var traceaqi2 = {
                x: aqiyear,
                y: aqi_bad_days,
                type: "bar",
                name: '% Bad Days',
            };
            
            var data = [traceaqi1, traceaqi2];
            
            var layout_bar = {
                barmode: 'stack',
                title: {text: "Percentage Good AQI Days vs Bad AQI Days"},
                xaxis: {title: "Year"},
                yaxis: {title: "% Days"}
            };
            
            Plotly.newPlot("air-bar", data, layout_bar);
        });
        d3.json(url).then(function(data){

            var demoData = data
            var demoFilter = demoData.filter(data => data.state == userInput)
            // Create xaxis that displays years
            var year =  demoFilter.map(year => year.year)

            // Create y axis that displays energy source
            var source = demoFilter.map(source => source.energy_source)
            source = [...new Set(source)]

            // Create 2nd yaxis that displays generation amount
            var generation = demoFilter.map(amount => amount.total_generation)

            
            
            // Create empty lists to hold each energy source as an array of objects
            var coals = []
            var hydroelectric = []
            var natural_gas = []
            var nuclear = []
            var biomass = []
            var petroleum = []
            var solar = []
            var wood = []
            var total = []
            
            
            // Loop through the demoFilter array and push select sources to specified lists
            // This will be to use the array of objects as trace layers to be plotted on the same graph
            for (i = 0; i < demoFilter.length; i++) {
                if(demoFilter[i].energy_source == 'Coal'){
                    coals.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Hydroelectric Conventional'){
                    hydroelectric.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Natural Gas'){
                    natural_gas.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Nuclear'){
                    nuclear.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Other Biomass'){
                    biomass.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Petroleum'){
                    petroleum.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Solar Thermal and Photovoltaic'){
                    solar.push(demoFilter[i]);
                }
                else if(demoFilter[i].energy_source == 'Wood and Wood Derived Fuels'){
                    wood.push(demoFilter[i]);
                }
                else {
                    total.push(demoFilter[i]);
                }
            };

            // Retrieve keys and values to place in Emissions div
            var gross = Math.max(...demoFilter);

            var emi = d3.select("#emissions")
            emi.html("")
            Object.entries(total).filter(([key,value]) => {
                emi.append("p").text(`${key}: ${value}`)
            })

            console.log(gross);

            // Using .map() map the obj generation amount and save as variable to be called in trace
            var coal_gen = coals.map(amount => amount.total_generation)
            var hydro = hydroelectric.map(amount => amount.total_generation)
            var nat_gas = natural_gas.map(amount => amount.total_generation)
            var nuc = nuclear.map(amount => amount.total_generation)
            var bio = biomass.map(amount => amount.total_generation)
            var pet = petroleum.map(amount => amount.total_generation)
            var sol = solar.map(amount => amount.total_generation)
            var wo = wood.map(amount => amount.total_generation)
            var tot = total.map(amount => amount.total_generation)
            
            // Now to create the traces to layer the chart
            var trace1 = {
                x: year,
                y: coal_gen,
                mode: 'markers',
                name: 'Coal',
                marker: {
                    color: 'rgb(150,206,180)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace2 = {
                x: year,
                y: hydro,
                mode:'markers',
                name: 'Hydroelectric Conventional',
                marker: {
                    color: 'rgb(255,238,173)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace3 = {
                x: year,
                y: nat_gas,
                mode:'markers',
                name: 'Natural Gas',
                marker: {
                    color: 'rgb(255,204,92)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace4 = {
                x: year,
                y: nuc,
                mode:'markers',
                name: 'Nuclear',
                marker: {
                    color: 'rgb(164, 194, 244)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace5 = {
                x: year,
                y: bio,
                mode:'markers',
                name: 'Biomass',
                marker: {
                    color: 'rgb(254,218,117)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace6 = {
                x: year,
                y: pet,
                mode:'markers',
                name: 'Petroleum',
                marker: {
                    color: 'rgb(250,126,30)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace7 = {
                x: year,
                y: sol,
                mode:'markers',
                name: 'Solar',
                marker: {
                    color: 'rgb(214,41,118)',
                    size: 10
                },
                type: 'scatter'
            };

            var trace8 = {
                x: year,
                y: wo,
                mode:'markers',
                name: 'Wood & Wood Derived Fuels',
                marker: {
                    color: 'rgb	(150,47,191)',
                    size: 10
                },
                type: 'scatter'
            };

            var layout_bubble = {
                title: {text: "<b>State Energy Source by Year</b>"},
                xaxis: {title: "year"},
                yaxis: {title: "Generation (megawatthours)"}
            };
            var bubble_data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
            Plotly.newPlot("bubble-chart", bubble_data, layout_bubble);
        });
        



    };
