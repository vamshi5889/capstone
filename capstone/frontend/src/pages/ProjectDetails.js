import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/project/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }

        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6">{project.title}</h2>
      <p><strong>Abstract:</strong> {project.abstract}</p>
      <p><strong>Team Members:</strong> {project.team_members.join(', ')}</p>
      <p><strong>Department:</strong> {project.department}</p>
      <p><strong>Created By:</strong> {project.created_by.name}</p>
      <h3 className="text-xl font-semibold mt-6">Media Files</h3>
      <ul>
        {project.media_files.map(file => (
          <li key={file.file_name}>
            <a href={`http://127.0.0.1:5000/${file.file_path}`} download>{file.file_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetails;
