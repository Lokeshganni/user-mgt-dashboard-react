import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import "../styles/App.css";

const UserList = ({ users, onDelete, onEdit }) => {
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
            const nameWithoutTitle = (name) => {
              const titles = ["Mr.", "Mrs.", "Dr.", "Ms."];
              const nameParts = name.split(" ");
              return nameParts.filter((part) => !titles.includes(part));
            };
            const [firstName, ...rest] = nameWithoutTitle(user.name);
            const lastName = rest.join(" ");

            const normalizePhone = (phone) =>
              phone.replace(/x.*$/, "").replace(/[^0-9]/g, "");

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{normalizePhone(user.phone)}</td>
                <td className="actions-icons-container">
                  <button className="btn" onClick={() => onEdit(user)}>
                    <FaEdit className="edit-icon icon" />
                  </button>
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


