import {useState} from 'react'

import Modal from './Modal/Modal.js'
import AddUserForm from './UserForm/UserForm.js';

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import "../styles/App.css";

const UserList = ({ users, onDelete, onEdit }) => {
  const [isEditUserModalOpen, setEditUserModalOpen]=useState(false)

  const handleEditUser =async (id) => {
    setEditUserModalOpen(true)
    updateUser(id).then(data=>{
      setUsers([...users,data])
      setFilteredUsers([...filteredUsers,data])
    })
    setEditUserModalOpen(false); // Close modal after adding user
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            // Utility function to remove prefixes like "Mrs.", "Mr.", etc.
            const nameWithoutTitle = (name) => {
              const titles = ["Mr.", "Mrs.", "Dr.", "Ms."];
              const nameParts = name.split(" ");
              // Filter out titles from the name
              return nameParts.filter((part) => !titles.includes(part));
            };
            // Call the utility function and destructure into firstName and lastName
            const [firstName, ...rest] = nameWithoutTitle(user.name);
            const lastName = rest.join(" ");

            const normalizePhone = (phone) => {
              return phone
                .replace(/x.*$/, "") // Remove extensions
                .replace(/[^0-9]/g, ""); // Remove non-numeric characters
            };

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{normalizePhone(user.phone)}</td>
                <td className="actions-icons-container">
                  <button className="btn" onClick={() => onEdit(user.id)}>
                    <FaEdit className="edit-icon icon" />
                  </button>
                  <Modal
            isOpen={isEditUserModalOpen}
            onClose={() => setEditUserModalOpen(false)}
          >
            <AddUserForm onSubmit={handleEditUser} />
          </Modal>
                  <button className="btn" onClick={() => onDelete(user.id)}>
                    <MdDelete className="delete-icon icon" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
