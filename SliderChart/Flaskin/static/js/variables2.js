var stateUrl = 'static/data/greenhouse_data.json';
// var genUrl = 'static/data/state_energy_gen_data.json';

// var stateUrl = $.getJSON("static/data/greenhouse_data.json")
// console.log(stateUrl)

let year = 2019;




//EVENT LISTENER!
d3.select('#slider_year').on('click',changeYear);

//Creating function for 'changeYear'
function changeYear() {
    let year = d3.select('#selected').property('value')
    buildMap(stateUrl,year)
};


// $.getJSON("../static/data/greenhouse_data.json", function(json) {
//     console.log(json);
// });



