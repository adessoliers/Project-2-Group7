genUrl = "http://127.0.0.1:5000/generation" 

// d3.json(genUrl).then(function(data) {
//     console.log(data);
// });

function buildMap(genUrl, yearMap) {
    //Bring in data and filter by state
    d3.json(genUrl).then(function(states) {
        var year = yearMap;
        var tempfilteredyear = states.filter(states=>states.year==year);
        console.log(tempfilteredyear);
    })


    //Creating emission map plot
    // var mapData = [{
    //     type:'chloropleth',
    //     locationmode: 'USA-states',
    //     location:   ,
    //     z:   ,
    //     text:   ,
    //     autocolorscale: true
    // }];
    // var mapLayout = {
    //     title:
    //     plot_bgcolor:
    //     paper_bgcolor:
    //     geo: {
    //         bgcolor:'rgb(215,215,215)',
    //         scope:'usa',
    //         countrycolor:'rgb(255,255,255)',
    //         showland:true,
    //         landcolor:'rgb(255,255,255)',
    //         showlakes:true,
    //         lakecolor:'rgb(52,177,242)',
    //         subunitcolor:'rgb(255,255,255)',
    //         lonaxis:{},
    //         lataxis:{}}}};
    //     Plotly.newPlot('')

    //     }
    // }
}
