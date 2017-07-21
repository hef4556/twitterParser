from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/myPost", methods=['GET', 'POST'])
def mypst():
    arrayablesafe = request.form.getlist('ckboxes')
    return render_template('myPost.html', valor=arrayablesafe[0])

@app.route("/datos", methods=['GET', 'POST'])
def datos():
    return render_template('datos.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='80')
