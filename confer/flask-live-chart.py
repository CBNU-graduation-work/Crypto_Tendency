import json
from time import time
from flask import Flask, render_template, make_response
import psutil

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/live_resource')
def live_resource():
    cpu = psutil.cpu_percent()
    data = [time() * 1000, cpu]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    return response

if __name__ == '__main__':
    app.run(debug=True)