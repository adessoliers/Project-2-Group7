import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
from sqlalchemy import and_
from sqlalchemy import or_
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import func

# Create engine
engine = create_engine("postgresql://postgres:password@localhost/emissions_db")

# Reflect database into model
Base = automap_base()

# Reflect tables
Base.prepare(engine, reflect=True)

Aqi = Base.classes.new_annual_aqi_percentage
Geocoords = Base.classes.state_geocoord

# Create session
session = Session(engine)

# Create App
app = Flask(__name__)

# Home page
@app.route("/")
def home():
    return render_template ("index.html")

@app.route("/api/v1.0/geocoords")
def test():
    query = session.query(Geocoords.state).all()
    states = list(np.ravel(query))
    return jsonify(states)




if __name__ == "__main__":
    app.run(debug=True)