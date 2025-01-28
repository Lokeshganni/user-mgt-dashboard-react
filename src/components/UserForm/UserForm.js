import { useState } from "react";

import "./UserForm.css";

const AddUserForm = ({ initialValues, onSubmit }) => {

  if (!initialValues){
     initialValues={
      name:'',
      username:'',
      email:'',
      phone:''
     }
  }
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
        placeholder="eg: Leanne Graham"
        id="fullName"
        type="text"
        value={formValues.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="userName">Username</label>
      <input
        name="username"
        placeholder="eg: Bret"
        id="userName"
        type="text"
        value={formValues.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        name="email"
        placeholder="eg: Sincere@april.biz"
        id="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        name="phone"
        placeholder="eg: 17707368031"
        id="phone"
        type="text"
        value={formValues.phone}
        onChange={handleChange}
        required
      />

      <button className="form-submit-btn btn-effect" type="submit">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;

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
