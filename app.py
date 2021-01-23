import os
import pandas as pd
import psycopg2
import psycopg2.extras
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template, redirect, request

# Database Setup
hostname = 'localhost'
username = 'postgres'
password = 'password'
database = 'emissions_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

# Save references needed to the views
aqi_percent = pd.read_sql_query('select * from "new_annual_aqi_percentage"', con=connection)


# FLASK SETUP
app = Flask(__name__)


################
#FLASK ROUTES
################
@app.route("/")
def home():
    return render_template ('index.html')







if __name__ == '__main__':
    app.run(debug=True)



