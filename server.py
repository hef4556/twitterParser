from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/datos", methods=['GET', 'POST'])
def datos():
    return render_template('datos.html')
    numero = request.form['ck1']
    return json.dumps({'si'})

if __name__ == '__main__':
    app.run()
