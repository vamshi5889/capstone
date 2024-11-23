from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User
from routes import api
from flask_login import LoginManager

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.config.from_object('config.Config')

db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# @app.before_first_request
# def create_default_user():
#     if not User.query.filter_by(email="admin@example.com").first():
#         user = User(name="Admin", email="admin@example.com", role="Admin")
#         user.set_password("password")
#         db.session.add(user)
#         db.session.commit()
#         print("Default admin user created: admin@example.com / password")

@app.before_request
def handle_preflight():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight successful'})
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response, 200

app.register_blueprint(api)

if __name__ == '__main__':
    app.run(debug=True)