import { useState } from "react";

import "./UserForm.css";

const AddUserForm = ({ initialValues, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name</label>
      <input
        name="name"
        placeholder="e.g., Leanne Graham"
        id="fullName"
        type="text"
        value={formValues.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="userName">Username</label>
      <input
        name="username"
        placeholder="e.g., Bret"
        id="userName"
        type="text"
        value={formValues.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        name="email"
        placeholder="e.g., Sincere@april.biz"
        id="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        name="phone"
        placeholder="e.g., 17707368031"
        id="phone"
        type="text"
        value={formValues.phone}
        onChange={handleChange}
        required
      />

      <button className="form-submit-btn btn-effect" type="submit">
        {initialValues.id ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default AddUserForm;
