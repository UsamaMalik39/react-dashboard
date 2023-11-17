import React from 'react';
import { useQuery,useQueryClient  } from 'react-query';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: users, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const handleUserClick = (userId) => {
    navigate(`/userDetails/${userId}`);
  };
  const handleUpdateClick = (userId) => {
    navigate(`/updateUser/${userId}`);
  };
  const handleDeleteClick = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`,{method: 'DELETE'});
    if (response.ok) {
      console.log(`User with ID ${userId} deleted successfully.`);
      queryClient.invalidateQueries('users');
    } else {
      console.error(`Failed to delete user with ID ${userId}.`);
    }
  };


  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => handleUserClick(user._id)}>View Details</button>
            <button onClick={() => handleUpdateClick(user._id)}>Update</button>
            <button onClick={() => handleDeleteClick(user._id)}>Delete</button>  
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
