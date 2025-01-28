import { useEffect, useState } from "react";

import UserList from "../components/UserList";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../services/userService";
import Modal from "../components/Modal/Modal.js";
import AddUserForm from "../components/UserForm/UserForm.js";

import { CiSearch } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import "../styles/App.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
    setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    showNotification("User successfully deleted");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.username.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleAddOrEditUser = async (user) => {
    if (editUser) {
      // Editing an existing user
      const updatedUser = await updateUser(editUser.id, user);
      setUsers(users.map((u) => (u.id === editUser.id ? updatedUser : u)));
      setFilteredUsers(
        filteredUsers.map((u) => (u.id === editUser.id ? updatedUser : u))
      );
      showNotification("User details updated successfully");
    } else {
      // Adding a new user
      const newUser = await addUser(user);
      setUsers([...users, newUser]);
      setFilteredUsers([...filteredUsers, newUser]);
      showNotification("User successfully added");
    }

    // Reset state and close modal
    setEditUser(null);
    setAddUserModalOpen(false);
  };

  const handleEditClick = (user) => {
    setEditUser(user); // Set the user to be edited
    setAddUserModalOpen(true); // Open the modal
  };

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-container">
        <div className="dashboard-headers-container">
          <h2 className="user-list-heading">User List</h2>
          <div className="search-user-container search-user-lg-container">
            <input
              value={searchTerm}
              onChange={handleSearch}
              type="search"
              placeholder="Search user by first or last name"
            />
            <CiSearch className="search-icon" />
          </div>
          <div className="add-user-btn-container">
            <FiUserPlus className="add-user-icon" />
            <button
              onClick={() => {
                setEditUser(null); // Reset edit user when adding a new user
                setAddUserModalOpen(true);
              }}
              className="add-user-btn"
            >
              Add User
            </button>
          </div>
          <Modal
            isOpen={isAddUserModalOpen}
            onClose={() => setAddUserModalOpen(false)}
          >
            <AddUserForm
              initialValues={
                editUser || { name: "", username: "", email: "", phone: "" }
              }
              onSubmit={handleAddOrEditUser}
            />
          </Modal>
        </div>
        <div className="search-user-container search-user-sm-container">
          <input
            value={searchTerm}
            onChange={handleSearch}
            type="search"
            placeholder="Search user by first or last name"
          />
          <CiSearch className="search-icon" />
        </div>
        <UserList
          users={filteredUsers}
          onDelete={handleDelete}
          onEdit={handleEditClick}
        />
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default Dashboard;

