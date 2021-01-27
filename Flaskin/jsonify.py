#Dependencies
import psycopg2
import psycopg2.extras
import os
from flask import Flask, jsonify, render_template, redirect, request
import pandas as pd


#Database
hostname = 'localhost'
username = 'postgres'
password = 'password'
database = 'energy_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

#Saving references to views
greenhouse_data = pd.read_sql_query('select state, year, greenhouse_emission from state_greenhouse_emissions order by state, year', con=connection)
state_energy_gen_data = pd.read_sql_query('select state, year, energy_source, generation_mwh, generation_percent from state_energy_by_year', con=connection)

#Save JSON
greenhouse_data.to_json('static/data/greenhouse_data.json',orient='records')
state_energy_gen_data.to_json('static/data/state_energy_gen_data.json',orient='records')