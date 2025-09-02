import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import adminService from '../../../services/adminService';


export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await adminService.deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div>
      <h4 className="mb-3">Manage Users</h4>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
         <tbody>
  {users.map((u) => (
   <tr key={u.userId}>
              <td><span className="fw-bold">#{u.userId}</span></td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(u.userId)}
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  ))}
</tbody>

        </Table>
      )}
    </div>
  );
}
