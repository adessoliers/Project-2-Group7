#Dependencies
import os
from flask import Flask, jsonify, render_template, redirect, request
import pandas as pd
import psycopg2
import psycopg2.extras

#Database
hostname = 'localhost'
username = 'postgres'
password = 'password'
database = 'energy_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

#Saving references to views
greenhouse_data = pd.read_sql_query('select state, year, greenhouse_emission from state_greenhouse_emissions order by state, year', con=connection)


#FlaskSetup
app = Flask(__name__)

#FLASK ROUTES

@app.route("/")
def home():
    return render_template ("index.html")

@app.route("/static/data/greenhouse_data")
def greenhouse():
    return greenhouse_data.to_json(orient='split',index=False)






if __name__ == '__main__':
    app.run()