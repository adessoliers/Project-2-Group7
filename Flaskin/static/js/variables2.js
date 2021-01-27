var stateUrl = 'static/data/state_energy_gen_data.json';
let year = 2019;
let statePlot='US';

buildMap(stateUrl,year);

//EVENT LISTENER!
d3.select('#slider_year').on('click',changeYear);

//Creating function for 'changeYear'
function changeYear() {
    let year = d3.select('#selected').property('value')
    buildMap(stateUrl,year)
};