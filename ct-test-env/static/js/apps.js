var coal_gen = coals.map(amount => amount.total_generation)
var hydro = hydroelectric.map(amount => amount.total_generation)
var nat_gas = natural_gas.map(amount => amount.total_generation)
var nuc = nuclear.map(amount => amount.total_generation)
var bio = biomass.map(amount => amount.total_generation)
var pet = petroleum.map(amount => amount.total_generation)
var sol = solar.map(amount => amount.total_generation)
var wo = wood.map(amount => amount.total_generation)
var tot = total.map(amount => amount.total_generation)

var coals = []
var hydroelectric = []
var natural_gas = []
var nuclear = []
var biomass = []
var petroleum = []
var solar = []
var wood = []
var total = []