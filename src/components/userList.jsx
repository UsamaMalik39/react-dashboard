import React from 'react';
import { useQuery,useQueryClient  } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
      <div className='m-10 flex justify-between items-center'><h2 className='text-[30px] font-semibold mb-2'>User List</h2>
      <div className='flex justify-start items-center gap-5'>
        <Link to={"/create"} className='p-2 bg-slate-200 text-slate-900 rounded-md'>Create User</Link>
        <Link to={"/dashboard"} className='p-2 bg-blue-200 text-slate-900 rounded-md'>Dashboard</Link>
      </div>
      </div>
      <ul className='grid grid-cols-3 gap-4 m-10 bg-gray-50 rounded-lg p-5'>
        <div>
          <h3>Name</h3>
        </div>
        <div>
          <h3>Gender</h3>
        </div>
        <div>
          <h3>Actions</h3>
        </div>
        {users.map((user) => (
          <li key={user._id} className='contents'>
            <p>{user.name}</p>
            <p>{user.gender}</p>
            <div className='flex justify-start items-center gap-5'>
              <button className='p-2 bg-slate-200 text-slate-900 rounded-md' onClick={() => handleUserClick(user._id)}>View Details</button>
              <button className='p-2 bg-yellow-50 text-yellow-900' onClick={() => handleUpdateClick(user._id)}>Update</button>
              <button className='p-2 bg-red-50 text-red-700' onClick={() => handleDeleteClick(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
