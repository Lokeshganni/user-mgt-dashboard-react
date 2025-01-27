import { useState } from "react";

import "./UserForm.css";

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, username,phone };
    onAddUser(newUser);
    setName("");
    setEmail("");
    setUsername("");
    setPhone('')
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name</label>
      <input
        placeholder="eg: Leanne Graham"
        id="fullName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="userName">Username</label>
      <input
        placeholder="eg: Bret"
        id="userName"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        placeholder="eg: Sincere@april.biz"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        placeholder="eg: 17707368031"
        id="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button className="form-submit-btn btn-effect" type="submit">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;

// import React, { useState } from 'react';

// import '../styles/App.css'

// const UserForm = ({ initialValues, onSubmit }) => {
//   const [formValues, setFormValues] = useState(initialValues);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formValues);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="firstName"
//         placeholder="First Name"
//         value={formValues.firstName}
//         onChange={handleChange}
//       />
//       <input
//         name="lastName"
//         placeholder="Last Name"
//         value={formValues.lastName}
//         onChange={handleChange}
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         value={formValues.email}
//         onChange={handleChange}
//       />
//       <input
//         name="department"
//         placeholder="Department"
//         value={formValues.department}
//         onChange={handleChange}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default UserForm;
