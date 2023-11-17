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
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
    </div>
  );
};

export default UserDetails;
