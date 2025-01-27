import { useEffect, useState } from "react";

import UserList from "../components/UserList";
import { getUsers, deleteUser } from "../services/userService";

import { CiSearch } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import "../styles/App.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data); // Initialize filteredUsers to match users
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter users based on first or last name
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) || 
        user.username.toLowerCase().includes(value) 
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-container">
        <div className="dashboard-headers-container">
          <h2 className="user-list-heading">User List</h2>
          <div className="search-user-container search-user-lg-container">
            <input value={searchTerm} onChange={handleSearch} type="search" placeholder="search user by first or last name" />
            <CiSearch className="search-icon" />
          </div>
          <div className="add-user-btn-container">
            <FiUserPlus className="add-user-icon"/>
            <button className="add-user-btn">Add User</button>
          </div>
        </div>
        <div className="search-user-container search-user-sm-container">
            <input value={searchTerm} onChange={handleSearch} type="search" placeholder="search user by first or last name" />
            <CiSearch className="search-icon" />
          </div>
        <UserList users={filteredUsers} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
