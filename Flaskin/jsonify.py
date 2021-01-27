#Dependencies
import os
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
greenhouse_data = pd.read_sql_query('select state,year,greenhouse_emission from state_greenhouse_emissions order by state, year', con=connection)

#Create data as json file
greenhouse_data.to_json('static/data/greenhouse_data.json',orient='split',index=False)