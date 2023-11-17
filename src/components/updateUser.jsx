import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const getUser = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  const data = await response.json();
  return data;
};

const updateUser = async (userId, userData) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
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
      navigate(`/users`);
    },
  });

  const [userData, setUserData] = useState({
    name: '',
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

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
