from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('datos.html')

@app.route("/myPost", methods=['GET', 'POST'])
def myPost():
    arrayablesafe = request.form.getlist('ckboxes')
    valor=''
    y=0
    for x in range(len(arrayablesafe)):
        y=y+1
        valor=valor + str(y) + ' ' + arrayablesafe[x] + ', '
    return render_template('myPost.html', valor=valor)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='80')
