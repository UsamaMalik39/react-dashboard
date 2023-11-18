import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const fetchUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await response.json();
  return data;
};

const UserDetails = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useQuery(['user', id], () => fetchUser(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-10'>
      <h2 className='font-bold bg-gradient-to-l text-[30px] from-orange-500 to-red-500 bg-clip-text'>User Details</h2>
      <ul className='grid grid-cols-2 gap-4 m-10 bg-gray-50 rounded-lg p-5'>
        <div>
          <h3>Name</h3>
        </div>
        <div>
          <h3>Gender</h3>
        </div>
        <li key={user._id} className='contents'>
          <p>{user.name}</p>
          <p>{user.gender}</p>
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
