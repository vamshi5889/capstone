from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Department {self.name}>'

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))  
    department = db.relationship('Department', backref='users') 
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.name}, Department {self.department.name}>'


class TSVector(db.types.TypeDecorator):
    impl = db.dialects.postgresql.TSVECTOR

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    abstract = db.Column(db.Text, nullable=False)
    team_members = db.Column(db.Text) 
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    created_by_user = db.relationship('User', backref='projects_created', lazy=True)

    media_files = db.relationship('Media', backref='project', lazy=True)
    ts_vector = db.Column(
    TSVector,
    db.Computed(
        "to_tsvector('english', title || ' ' || abstract)",
        persisted=True
    )
)
    table_args = (db.Index('ix_projects___ts_vector__',
          ts_vector, postgresql_using='gin'),)
    def __repr__(self):
        return f'<Project {self.title}, Created by User {self.created_by_user.name}>'

class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    file_name = db.Column(db.String(255), nullable=False)
    file_type = db.Column(db.String(255))
    file_path = db.Column(db.String(255))
    uploaded_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Media {self.file_name} for Project {self.project_id}>'

