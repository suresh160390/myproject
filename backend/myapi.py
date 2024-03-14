from flask import Flask
from flask_cors import CORS
from api import init_db_connection

app = Flask(__name__)
CORS(app) 

init_db_connection(app)