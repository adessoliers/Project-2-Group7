from flask import Flask, render_template, request
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import psycopg2
import sys


#----------------------------------------------------------------------------
# Database Setup
#----------------------------------------------------------------------------

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/aqi')
def aqi_data():
    con = psycopg2.connect("host='localhost' dbname='emissions_db' user='postgres' password='postgres'")  
    cur = con.cursor()
    cur.execute("""select * from  new_annual_aqi""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)

@app.route('/aqi-percentage')
def aqi_percentage():
    con = psycopg2.connect("host='localhost' dbname='emissions_db' user='postgres' password='postgres'")  
    cur = con.cursor()
    cur.execute("""select state,year,percentage_good_days,percentage_bad_days from  new_annual_aqi_percentage""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)

@app.route('/generation')
def generation():
    con = psycopg2.connect("host='localhost' dbname='emissions_db' user='postgres' password='postgres'")  
    cur = con.cursor()
    cur.execute("""select * from  new_annual_generation""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)

@app.route('/emissions')
def emissions():
    con = psycopg2.connect("host='localhost' dbname='emissions_db' user='postgres' password='postgres'")  
    cur = con.cursor()
    cur.execute("""select * from  new_emission_data""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)


# @app.route("/api/v1.0/precipitation")
# def precipitation():
#     """Return the precipitation data for the last year"""
#     # Calculate the date 1 year ago from last date in database
#     prev_year = dt.date(2017, 8, 23) - dt.timedelta(days=365)
#     # Query for the date and precipitation for the last year
#     precipitation = session.query(Measurement.date, Measurement.prcp).\
#         filter(Measurement.date >= prev_year).all()
#     # Dict with date as the key and prcp as the value
#     precip = {date: prcp for date, prcp in precipitation}
#     return jsonify(precip)

@app.route("/api/v1.0/geocoords")
def test():
    query = session.query(Geocoords.state).all()
    states = list(np.ravel(query))
    return jsonify(states)

@app.route("/api/v1.0/geocoords")
def test():
    # Query lon and lat
    coordinates_list = session.query(Geocoords.state, Geocoords.longitude, Geocoords.latitude)

    # Convert results to a dict using state as key and lon/lat as values
    coord = []
    for state,longitude,latitude in coordinates_list:
        coord_dict = {}
        coord_dict[state] = state
        coord_dict[longitude] = longitude
        coord_dict[latitude] = latitude
        coord.append(coord_dict)

    # Return a json list of coordinates from the dataset
    coordinates_list = list(np.ravel(coordinates_list))
    return jsonify(coord)