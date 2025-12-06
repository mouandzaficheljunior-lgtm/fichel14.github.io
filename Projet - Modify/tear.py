from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL

app = Flask(__name__, static_folder='static')

# Configuration MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'ton_mot_de_passe'
app.config['MYSQL_DB'] = 'etablissement_db'

mysql = MySQL(app)

# Page d’accueil
@app.route('/')
def index():
    return render_template('index.html')

# Page d’inscription
@app.route('/inscription', methods=['GET', 'POST'])
def inscription():
    if request.method == 'POST':
        nom = request.form['nom']
        prenom = request.form['prenom']
        email = request.form['email']
        date_naissance = request.form['date_naissance']
        mot_de_passe = request.form['mot_de_passe']

        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO etudiants (nom, prenom, email, date_naissance, mot_de_passe)
            VALUES (%s, %s, %s, %s, %s)
        """, (nom, prenom, email, date_naissance, mot_de_passe))
        mysql.connection.commit()
        cur.close()

        return redirect('/tableau_de_bord')
    return render_template('inscription.html')

# Tableau de bord
@app.route('/tableau_de_bord')
def tableau_de_bord():
    # Supposons que l'étudiant est connecté
    cur = mysql.connection.cursor()
    cur.execute("SELECT nom, photo_profil FROM etudiants WHERE id = %s", [session['etudiant_id']])
    etudiant = cur.fetchone()
    cur.close()
    return render_template('tableau_de_bord.html', nom=etudiant[0], photo=etudiant[1])

if __name__ == '__main__':
    app.run(debug=True)