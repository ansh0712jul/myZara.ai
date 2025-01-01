import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CardComponent = ({ project, onClick }) => {
  return (
    <div className="transition-transform transform hover:scale-105" onClick={onClick}>
      <Card className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {project.projectName}
            </h3>
            {
              project.usersInvolved.length > 1 ? (
                <i className="ri-group-fill text-3xl text-blue-600"></i>
              ) : <i className="ri-user-fill text-3xl text-blue-600"></i>
            }
          </div>
          <div className="flex items-start space-x-3">
            <i className="ri-article-fill text-5xl text-blue-500"></i>
            <p className="text-gray-600 text-lg">
              {project.description.length > 0 ? project.description : "No description available"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
