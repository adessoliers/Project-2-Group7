var stateUrl = "/data/greenhouse_data";
let year = 2019;




//EVENT LISTENER!
d3.select('#slider_year').on('click',changeYear);

//Creating function for 'changeYear'
function changeYear() {
    let year = d3.select('#selected').property('value')
    buildMap(stateUrl,year)
};