from flask import Flask,jsonify,request
from flask_cors import CORS
import pyodbc
from email.message import EmailMessage
import ssl
import smtplib
import os

app = Flask(__name__)
CORS(app)

# sys.argv = ['gunicorn', '--bind', '0.0.0.0:8000', '--workers', '4', '--worker-class', 'sync', 'app:app']
# __file__ get current path

current_script_directory = os.path.dirname(os.path.abspath(__file__))
db_filename = 'Login_DB.accdb'
db_path = os.path.join(current_script_directory, db_filename)
# print(db_path)

# db_path = r'D:\My Login Project\Login_DB.accdb'

conn_str = (r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};' rf'DBQ={db_path};')

@app.route('/login', methods=['POST'])
def login():
    # Login.js File Username & password
    data = request.json    
    username = data.get('username')
    password = data.get('password')
 
    try:
        with pyodbc.connect(conn_str) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Signup WHERE UserName=? AND Password=?', (username, password))
            result = cursor.fetchone()        

            if result is not None:
                return jsonify({'success': True})
            else:
                return jsonify({'success': False})
            
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'success': False})

@app.route('/sigin', methods=['POST'])
def sigin():
    # Sigin.js File Username & password & email
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    try:
        with pyodbc.connect(conn_str) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Signup WHERE Username=? OR Email=?', (username, email))
            result = cursor.fetchone()

            if result:
                return jsonify({'success': False})
            else:                
                cursor.execute('INSERT INTO Signup (UserName, Password, Email) VALUES (?, ?, ?)', (username, password, email))
                conn.commit()
                return jsonify({'success': True})            
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'success': False})
    
    finally:
        # Close cursor and connection in the finally block to ensure they are closed regardless of exceptions
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/forgot', methods=['POST'])
def mail():
    # Sigin.js File Username & password & email
    data = request.json
    email = data.get('email')
    
    try:
        with pyodbc.connect(conn_str) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Signup WHERE Email=?', (email,))
            result = cursor.fetchone()

            if result:
                mail_password=result.Password       
                email_sender='suresha003@gmail.com'  #'suresha16031990@gmail.com'
                email_password='cjru cepx vvsz fxfg'   # create App password on your gmail Account, Security, 2-Step Verification, App password click & Create
                email_receiver=email.lstrip().rstrip()
                # print(type(email_receiver))

                subject = 'Password Recovery'
                body = f'Your password is: {mail_password}'

                em=EmailMessage()              
                em['From'] = email_sender
                em['To'] = email_receiver
                em['Subject'] = subject
                
                em.set_content(body)
                contex=ssl.create_default_context()

                with smtplib.SMTP_SSL("smtp.gmail.com",465,context=contex) as smtp:
                    smtp.login(email_sender,email_password)
                    smtp.sendmail(email_sender,email_receiver,em.as_string())
      
                return jsonify({'success': True})
            else:                               
                return jsonify({'success': False})            
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'success': False})
    
    finally:
        # Close cursor and connection in the finally block to ensure they are closed regardless of exceptions
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/data', methods=['POST'])
def data():
    # Sigin.js File Username & password & email  
    try:
        with pyodbc.connect(conn_str) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Signup')
            result = cursor.fetchall()            
            result = [dict(zip([column[0] for column in cursor.description], row)) for row in result]                       
            if result:
                return jsonify(result)
            else:                                
                return jsonify([])                        
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'Error': str(e)})
    
    finally:
        # Close cursor and connection in the finally block to ensure they are closed regardless of exceptions
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)