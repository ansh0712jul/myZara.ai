import { userContext } from '@/contextApi/User.context';
import React, { useContext, useState, useEffect } from 'react';
import CreateProjectModal from '../dialog/CreateProjectModal';
import axios from '@/config/axios';
import CardComponent from '@/shared/CardComponent';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const { user } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/projects/get-project`)
      .then(res => {
        setProjects(res.data.message);
      })
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="projects max-w-5xl mx-auto mt-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {user?.userName || 'User'}!
          </h1>
          <p className="text-gray-700 mt-2 text-lg">
            Manage your projects effortlessly. Start by creating a new project.
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <button
            className="bg-blue-600 text-white border border-blue-600 rounded-lg py-3 px-8 shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-lg font-medium">Create Project</span>
            <i className="ri-add-large-fill mt-1"></i>
          </button>
        </div>
      </div>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {
          projects.map((project) => (
            <CardComponent key={project._id} project={project} />
          ))
        }
      </div>
    </main>
  );
};

export default Home;
