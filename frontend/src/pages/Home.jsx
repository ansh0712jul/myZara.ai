import { userContext } from '@/contextApi/User.context';
import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from '@/config/axios';


const Home = () => {
    const { user } = useContext(userContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        console.log({projectName, description});

        axios.post(`${import.meta.env.VITE_BASE_URL}/projects/create`,{
            projectName,
            description
        })
        .then((res) => {
            console.log(res);
            setIsModalOpen(false);
        })
        .catch((err) => console.log(err));
    };

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <div className="projects max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {user?.userName || 'User'}!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your projects effortlessly. Start by creating a new project.
                    </p>
                </div>
                <div className="flex justify-center">
                    <button
                        className="project bg-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span className="text-lg font-medium text-gray-800">Create Project</span>
                        <i className="ri-add-line text-xl text-blue-500"></i>
                    </button>
                </div>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl text-center">Create Your Project</DialogTitle>
                        <DialogDescription className="text-lg text-gray-500 text-center">
                            Fill in the details below to create your project.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate} className="space-y-6 mt-4">
                        <div className='mt-4'>
                            <label className="block text-lg  text-gray-700">
                                Project Name
                            </label>
                            <input
                                className="mt-3 h-10 block w-full p-3 rounded-md"
                                type="text"
                                name="projectName"
                                value={projectName}
                                placeholder="Enter your project name"
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mt-4'>
                            <label className="block text-lg  text-gray-700 ">
                                Description
                            </label>
                            <textarea
                                className="mt-3 p-3 block w-full rounded-md "
                                name="description"
                                value={description}
                                placeholder="Enter your project description"
                                rows={4}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default Home;
