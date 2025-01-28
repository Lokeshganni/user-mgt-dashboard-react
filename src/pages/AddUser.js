import React from 'react';
import UserForm from '../components/UserForm/UserForm.js';
import { addUser } from '../services/userService';

const AddUser = () => {

  const handleSubmit = async (user) => {
    await addUser(user);
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
