import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './components/userList';
import Dashboard from './components/dashboard';
import CreateUser from './components/createUser';
import UpdateUser from './components/updateUser';
import UserDetails from './components/userDetail';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" exact element={<UserList/>} />
          <Route path="/users" element={<UserList/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create" element={<CreateUser/>} />
          <Route path="/updateUser/:id" element={<UpdateUser/>} />
          <Route path="/userDetails/:id" element={<UserDetails/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
