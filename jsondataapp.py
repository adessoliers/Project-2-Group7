import os
from flask import Flask, jsonify, render_template, redirect, request
import psycopg2
import pandas as pd

# Database Setup
hostname = 'localhost'
username = 'postgres'
password = 'password'
database = 'emissions_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

# Saving references to view
aqi_percent = pd.read_sql_query('select * from "new_annual_aqi_percentage"', con=connection)
annual_generation = pd.read.read_sql_query('select * from "new_annual_generation"', con=connection)
emission_data = pd.read.read_sql_query('select * from "new_emission_data"', con=connection)

# Create data json files
aqi_percent.to_json('static/data/aqi_percent.json')
annual_generation.to_json('static/data/new_annual_generation.json')
emission_data.to_json('static/data/new_emission_data.json')