from flask import Blueprint, request, jsonify
from models import db, User, Project, Media, Department
import os

api = Blueprint('api', __name__,url_prefix='/api')

def handle_preflight():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight successful'})
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response, 200

# Upload Project
@api.route('/upload_project', methods=['POST', 'OPTIONS'])
def upload_project():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight successful'}), 200

    try:
        data = request.form
        created_by_user = User.query.get(data['created_by'])  # Fetch the selected user

        # Create a new project entry
        new_project = Project(
            title=data['title'],
            abstract=data['abstract'],
            team_members=data['team_members'],
            created_by_user=created_by_user  # Set the selected user
        )
        db.session.add(new_project)
        db.session.commit()

        if 'file' in request.files:
            file = request.files['file']
            upload_folder = 'static/uploads'

            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)

            file_path = os.path.join(upload_folder, file.filename)
            file.save(file_path)

            media = Media(
                project_id=new_project.id,
                file_name=file.filename,
                file_type=file.content_type,
                file_path=file_path
            )
            db.session.add(media)
            db.session.commit()

        return jsonify({'message': 'Project uploaded successfully!'}), 200
    except Exception as e:
        print(f"Error during project upload: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch all projects
@api.route('/projects', methods=['GET'])
def get_projects():
    try:
        projects = Project.query.all()
        projects_list = [
            {
                'id': project.id,
                'title': project.title,
                'department': project.created_by_user.department.name 
            }
            for project in projects
        ]
        return jsonify(projects_list), 200
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch project details by ID
@api.route('/project/<int:project_id>', methods=['GET'])
def get_project_details(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        
        seen_media = set()

        project_details = {
            'id': project.id,
            'title': project.title,
            'abstract': project.abstract,
            'team_members': project.team_members.split(', '), 
            'department': project.created_by_user.department.name,
            'created_by': {
                'name': project.created_by_user.name,
                'email': project.created_by_user.email
            },
            'media_files': [
                {
                    'file_name': media.file_name,
                    'file_path': media.file_path
                }
                for media in project.media_files
                if media.file_path not in seen_media and not seen_media.add(media.file_path) 
            ]
        }

        return jsonify(project_details), 200
    except Exception as e:
        print(f"Error fetching project details: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch user details by ID
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = User.query.get_or_404(user_id)
        
        user_profile = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role,
            'department': user.department.name if user.department else None, 
            'projects': [
                {'id': project.id, 'title': project.title}
                for project in user.projects_created
            ]
        }

        return jsonify(user_profile), 200
    except Exception as e:
        print(f"Error fetching user: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch all departments for dropdown selection
@api.route('/departments', methods=['GET'])
def get_departments():
    try:
        departments = Department.query.all()
        departments_list = [{'id': dept.id, 'name': dept.name} for dept in departments]
        return jsonify(departments_list), 200
    except Exception as e:
        print(f"Error fetching departments: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Create a new user
@api.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        department_id = data.get('department_id')

        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email is already registered.'}), 400

        department = Department.query.get(department_id)
        if not department:
            return jsonify({'message': 'Invalid department selected.'}), 400

        new_user = User(
            name=name,
            email=email,
            role=role,
            department_id=department_id
        )
        new_user.set_password(password)  
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch all users
@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_list = [
            {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role,
                'department': user.department.name if user.department else None 
            }
            for user in users
        ]
        return jsonify(users_list), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Test route
@api.route('/test-user', methods=['GET'])
def test_user():
    user = User.query.get(1) 
    if user:
        return jsonify({'id': user.id, 'name': user.name})
    return jsonify({'message': 'User not found'}), 404

# search project
@api.route('/search-project', methods=['POST'])
def search_project():
    try:
        data = request.get_json()
        term = data.get('term')
        results = Project.query.filter(Project.ts_vector.match(term)).all()
        projects_list = [
                {
                    'id': project.id,
                    'title': project.title,
                    'abstract': project.abstract, 
                    'department': project.created_by_user.department.name,
                }
                for project in results
            ]
        return jsonify(projects_list), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'message': 'Internal server error'}), 500

