import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm/UserForm.js';
import { getUser, updateUser } from '../services/userService';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    getUser(id).then(setInitialValues);
  }, [id]);

  const handleSubmit = async (user) => {
    await updateUser(id, user);
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <UserForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditUser;
