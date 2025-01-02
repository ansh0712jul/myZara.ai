import React, { useState } from "react";
import { 
    Card, 
    CardContent, 
    CardHeader,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import axios from "@/config/axios";

const SelectUser = ({ onClose, user, location }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleUser = (id) => {
    if (selectedUser.includes(id)) {
      setSelectedUser(selectedUser.filter((item) => item !== id));
    } else {
      setSelectedUser([...selectedUser, id]);
    }
  };

  console.log(selectedUser);

  const addCollaboratorToProject = () => {
    console.log(location.state);

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/projects/add-user`, {
        projectId: location.state.project._id,
        Users: [...selectedUser],
      })
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  // Filter users based on search query
  const filteredUsers = user.filter((item) =>
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-[520px] w-96 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h3 className="mt-1">Select User</h3>
          <button onClick={onClose}>
            <i className="ri-close-circle-fill text-2xl"></i>
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-auto w-full">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredUsers.map((item) => (
          <div
            key={item._id}
            className="user h-12 mx-auto rounded w-full p-2 px-4 bg-white hover:bg-gray-300 flex items-center  gap-5"
          >
            <div className="h-8 w-8 bg-gray-700 rounded-full text-white p-1 flex items-center justify-center">
              <i className="ri-user-follow-fill text-xl"></i>
            </div>
            <h3 className="text-sm max-w-40 items-start">{item.email}</h3>
            <button onClick={() => toggleUser(item._id)} className="flex-grow">
              {selectedUser.includes(item._id) ? (
                <i className="ri-indeterminate-circle-line text-xl"></i>
              ) : (
                <i className="ri-add-circle-fill text-xl"></i>
              )}
            </button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <button
          onClick={addCollaboratorToProject}
          className="flex items-center justify-center p-2 px-4 bg-blue-600 text-white rounded"
        >
          Add Collaborators
        </button>
      </CardFooter>
    </Card>
  );
};

export default SelectUser;
