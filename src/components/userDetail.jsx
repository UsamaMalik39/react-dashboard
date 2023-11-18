import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

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
      <div className='flex justify-between items-center'>
            <h2 className='text-[30px] font-semibold mb-2'>User Details</h2>
            <div className='flex gap-2 items-center'>
            <Link to={"/create"} className='p-2 bg-green-400 text-green-900 rounded-md'>Create</Link>
            <Link to={"/users"} className='p-2 bg-slate-200 text-slate-900 rounded-md'>View Users</Link>
            </div>
      </div>
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
