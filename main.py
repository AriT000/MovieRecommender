from bottle import run, route
import os

@route("/")
def index():
    page = f'''
                <h1>Movie Recommender</h1>
            '''
    return page

run(host="127.0.0.1", port=8080)