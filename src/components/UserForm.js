import React, { useState } from 'react';

import '../styles/App.css'

const UserForm = ({ initialValues, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        value={formValues.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formValues.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        value={formValues.department}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;

