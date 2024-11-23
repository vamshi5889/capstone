import React from 'react';

function Home() {
  return (
    <div className="home-page max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Capstone Portfolio</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Browse, upload, and discover capstone projects from students and faculty.
      </p>
      <p className="text-lg text-gray-600 mb-6 text-center">
        <strong>Student Portfolio Projects:</strong> UMBC graduate Program students work 1-on-1 with their instructors 
        to design and create a capstone project at the end of their programs.
      </p>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Through this project, students are able to implement and showcase the software skills they learned during their training. 
        Once completed, capstone projects serve as portfolio pieces that students can feel proud to call their own and utilize at 
        job interviews to demonstrate their real-world knowledge and abilities.
      </p>
      <nav>
        <ul className="flex justify-center space-x-6">
          <li>
            <a
              href="/view-projects"
              className="text-blue-600 font-medium hover:text-blue-700 transition"
            >
              View All Projects
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
