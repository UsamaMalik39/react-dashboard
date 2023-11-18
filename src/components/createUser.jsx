import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const createUser = async (userData) => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

const CreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const [userData, setUserData] = useState({
    name: ''
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(userData);
  };

  return (
    <div className='m-10'>
        <h1>Create User</h1>
      <form className='gap-4 m-10 w-[400px] bg-gray-50 rounded-lg p-5  w-content flex flex-col' onSubmit={handleSubmit}>
        <label className='flex gap-5 items-center'>
          Name:
          <input type="text" className='border-gray-800 p-2 border rounded-sm'  name="name" value={userData.name} onChange={handleInputChange} />
        </label>
        <label className='flex gap-5 items-center'>
          Gender:
          <input type="text" className='border-gray-800 p-2 border rounded-sm' name="gender" value={userData.gender} onChange={handleInputChange} />
        </label>
        <button className='p-2 bg-green-400 text-green-900 rounded-lg' type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Creating...' : 'Create User'}
        </button>
        <button className='p-2 bg-red-500 text-red-900 rounded-lg' type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Cancelling..' : 'Cancel'}
        </button>
      </form>
    </div>
    );
};

export default CreateUser;