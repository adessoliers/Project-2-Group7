$(document).ready(function() {

    var $year_selected = $('#selected');

    var $year_slider = $('#slider_year').slider(
        {
        orienatation: 'horizontal',
        range: 'min',
        min: 2011,
        max: 2019,
        slide: function( event, ui ) {
            $year_selected.val(ui.value)
        }
    })
})
$year_selected.val($year_slider.slider("value"));