from flask import Flask, jsonify, render_template, redirect, request
import pandas as pd
import psycopg2
import psycopg2.extras

# database setup
hostname = 'localhost'
username = 'postgres'
password = 'password'
database = 'emissions_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

# Save references needed to view
annual_aqi = pd.read_sql_query('select * from new_annual_aqi_percentage',con=connection)
annual_generation = pd.read_sql_query('select * from new_annual_generation',con=connection)

# Flask Setup
app = Flask(__name__)

# Flask Route
@app.route("/")
def home():
    """Main page"""
    return render_template ("index.html")

@app.route("/data/annual_aqi")
def annualaqi():
    return annual_aqi.to_json()

@app.route("/data/annual_generation")
def generation():
    return annual_generation.to_json()









if __name__ == "__main__":
    app.run(debug=True)