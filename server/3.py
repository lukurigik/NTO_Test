import mysql
from mysql.connector import Error
from flask import Flask, render_template
import matplotlib.pyplot as plt
import matplotlib as mpl
import matplotlib.dates as mdates
import datetime as dt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'
values = []


def connect():
    global values
    try:
        conn = mysql.connector.connect(host='localhost',
                                       database='dump',
                                       user='root',
                                       password='qqqq')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM records")
        for data in cursor:
            values.append(data)

        if conn.is_connected():
            print('Connected to MySQL database')

    except Error as e:
        print(e)

    finally:
        conn.close()


connect()
ex = {}
for i in values:
    if str(i[2]) not in ex.keys():
        pass
        ex[str(i[2])] = 0
    else:
        ex[str(i[2])] += 1
print(ex)

if __name__ == '__main__':
    @app.route("/")
    def index():
        return render_template("index.html", item=ex.__str__().replace("'", '"'))

    @app.route("/museumgallery")
    def gallery():
        return render_template("museumgallery.html")

    app.run(port=8080, host='127.0.0.1')
