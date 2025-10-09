import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import adminService from '../../../services/adminService';


export default function ManageOperators() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOperators = async () => {
    setLoading(true);
    try {
      const data = await adminService.getOperators();
      setOperators(data);
    } catch (err) {
      console.error("Failed to fetch operators:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this operator?")) return;
    try {
      await adminService.deleteOperator(id);
      fetchOperators();
    } catch (err) {
      console.error("Failed to delete operator:", err);
    }
  };

  return (
    <div>
      <h4 className="mb-3">Manage Operators</h4>

      {loading ? (
        <p>Loading operators...</p>
      ) : operators.length === 0 ? (
        <p>No operators found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((o) => (
            <tr key={o.userId}>
              <td><span className="fw-bold">#{o.userId}</span></td>
              <td>{o.fullName}</td>
              <td>{o.email}</td>
              <td>{o.phone}</td>
            
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(o.operatorId)}
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
