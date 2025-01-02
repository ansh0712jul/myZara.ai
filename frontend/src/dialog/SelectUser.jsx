import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    CardHeader,
    CardFooter,
    CardTitle
} from '@/components/ui/card';

const SelectUser = ({ onClose }) => {
  const [selectedUser, setSelectedUser] = useState([]);

  const toggleUser = (index) => {
    if (selectedUser.includes(index)) {
      setSelectedUser(selectedUser.filter((item) => item !== index));
    } else {
      setSelectedUser([...selectedUser, index]);
    }
  };

  console.log(selectedUser);

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
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="user h-12 mx-auto rounded w-full p-2 px-4 bg-white hover:bg-gray-300 flex items-center gap-5"
          >
            <div className="h-8 w-8 bg-gray-700 rounded-full text-white p-1 flex items-center justify-center">
              <i className="ri-user-follow-fill text-xl"></i>
            </div>
            <h3 className="text-sm">anshagrawal181@gmail.com</h3>
            <button onClick={() => toggleUser(index)}>
              {selectedUser.includes(index) ? (
                <i class="ri-indeterminate-circle-line text-xl"></i>
              ) : (
                <i class="ri-add-circle-fill text-xl"></i>
              )}
            </button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <button className="flex items-center justify-center p-2 px-4 bg-blue-600 text-white rounded">
          Add Collaborators
        </button>
      </CardFooter>
    </Card>
  );
};

export default SelectUser;
