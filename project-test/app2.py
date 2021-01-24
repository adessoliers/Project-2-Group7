from flask import Flask, render_template, request
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import psycopg2
import sys
import numpy as np


#----------------------------------------------------------------------------
# Database Setup
#----------------------------------------------------------------------------
engine = create_engine("postgresql://postgres:postgres@localhost:5432/emissions_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
aqi_good_bad = Base.classes.new_annual_aqi_percentage
states = Base.classes.state_geocoord
annual_generation = Base.classes.updated_annual_generation
annual_emissions = Base.classes.updated_emission_data

# Create our session (link) from Python to the DB
session = Session(engine)

# Flask set up 
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/aqi-percentage')
def aqi_percentage():
    aqi_percentage = session.query(aqi_good_bad.state, aqi_good_bad.year, aqi_good_bad.percentage_good_days, aqi_good_bad.percentage_bad_days)  
    aqi_list = []
    for aqi in aqi_percentage:
        aqi_dict = {}
        aqi_dict ["state"] = aqi[0]
        aqi_dict ["year"] = aqi[1]
        aqi_dict ["percentage_good_days"] = aqi[2]
        aqi_dict ["percentage_bad_days"] = aqi[3]
        aqi_list.append(aqi_dict)
    return jsonify(aqi_list)

@app.route('/state_geocoord')
def state_geocoord():
    state_geocoord = session.query(states.state, states.latitude, states.longitude).all()
    states_list = []
    for state in state_geocoord:
        state_dict = {}
        state_dict ["state"] = state[0]
        state_dict ["latitude"] = state[1]
        state_dict ["longitude"] = state[2]
        states_list.append(state_dict)
    return jsonify(states_list)

@app.route('/generation')
def generation():
    generation = session.query(annual_generation.state, annual_generation.year, annual_generation.energy_source, annual_generation.total_generation).all()
    generation_list = []
    for gen in generation:
        generation_dict = {}
        generation_dict ["state"] = gen[0]
        generation_dict ["year"] = gen[1]
        generation_dict ["energy_source"] = gen[2]
        generation_dict ["total_generation"] = gen[3]
        generation_list.append(generation_dict)
    return jsonify(generation_list)

@app.route('/emissions')
def emissions():
    emissions = session.query(annual_emissions.state, annual_emissions.year, annual_emissions.pollution_code, annual_emissions.total_emission).all()  
    emissions_list = []
    for emission in emissions:
        emission_dict = {}
        emission_dict ["state"] = emission[0]
        emission_dict ["year"] = emission[1]
        emission_dict ["pollution_code"] = emission[2]
        emission_dict ["total_emission"] = emission[3]
        emissions_list.append(emission_dict)
    return jsonify(emissions_list)

if __name__ == '__main__':
    app.run(debug=True)
