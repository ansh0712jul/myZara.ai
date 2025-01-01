import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from '@/config/axios';

const CreateProjectModal = ({ isOpen, onClose }) => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        console.log({ projectName, description });

        axios
            .post(`${import.meta.env.VITE_BASE_URL}/projects/create`, {
                projectName,
                description,
            })
            .then((res) => {
                console.log(res);
                onClose();
            })
            .catch((err) => console.log(err));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">Create Your Project</DialogTitle>
                    <DialogDescription className="text-lg text-gray-500 text-center">
                        Fill in the details below to create your project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-6 mt-4">
                    <div className="mt-4">
                        <label className="block text-lg text-gray-700">Project Name</label>
                        <input
                            className="mt-3 h-10 block w-full p-3 rounded-md"
                            type="text"
                            value={projectName}
                            placeholder="Enter your project name"
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-lg text-gray-700">Description</label>
                        <textarea
                            className="mt-3 p-3 block w-full rounded-md"
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
                            onClick={onClose}
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
    );
};

export default CreateProjectModal;
