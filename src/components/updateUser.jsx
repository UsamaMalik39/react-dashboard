import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../apiConfig';

const getUser = async (userId) => {
  const apiUrl = getApiUrl()

  const response = await fetch(`${apiUrl}/users/${userId}`);
  const data = await response.json();
  return data;
};

const updateUser = async (userId, userData) => {
  const apiUrl = getApiUrl()
  const response = await fetch(`${apiUrl}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation((userData) => updateUser(id, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      goBack();
    },
  });

  const [userData, setUserData] = useState({
    name: '',
    gender:'',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await getUser(id);
      setUserData(user);
    };

    fetchUserDetails();
  }, [id]);

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

  const goBack = () => {
    navigate(`/users`);
  };

  return (
    <div className='m-10'>
      <h2 className='text-[30px] font-semibold mb-2'>Update User</h2>
      <form className='gap-4 m-10 w-[400px] bg-gray-50 rounded-lg p-5  w-content flex flex-col' onSubmit={handleSubmit}>
        <label className='flex gap-5 items-center'>
          Name:
          <input type="text" className='border-gray-800 p-2 border rounded-sm'  name="name" value={userData.name} onChange={handleInputChange} />
        </label>
        <label className='flex gap-5 items-center'>
          Gender:
          <input type="text" className='border-gray-800 p-2 border rounded-sm' name="gender" value={userData.gender} onChange={handleInputChange} />
        </label>
        <button className='p-2 bg-yellow-400 text-yellow-900 rounded-lg' type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Updating...' : 'Update User'}
        </button>
        <button  onClick={() => goBack()}   className='p-2 bg-red-500 text-red-900 rounded-lg' type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Cancelling..' : 'Cancel'}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
