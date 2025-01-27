import React from 'react';
import UserForm from '../components/UserForm';
import { addUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    await addUser(user);
    navigate('/');
  };

  return (
    <div>
      <h2>Add User</h2>
      <UserForm
        initialValues={{ firstName: '', lastName: '', email: '', department: '' }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddUser;
