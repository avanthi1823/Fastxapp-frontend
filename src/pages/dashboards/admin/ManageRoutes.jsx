import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import adminService from '../../../services/adminService';

import AddRouteModal from "./modals/AddRouteModal";
import EditRouteModal from "./modals/EditRouteModal";

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [routeQuery, setRouteQuery] = useState("");
  const [sortKey, setSortKey] = useState("routeId"); 
  const [sortAsc, setSortAsc] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editRoute, setEditRoute] = useState(null);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const data = await adminService.getRoutes();
      setRoutes(data);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this route?")) return;
    try {
      await adminService.deleteRoute(id);
      fetchRoutes();
    } catch (err) {
      console.error("Failed to delete route:", err);
    }
  };

  const filteredSortedRoutes = useMemo(() => {
    const q = routeQuery.trim().toLowerCase();
    let data = routes.filter(r => {
      if (!q) return true;
      return (
        String(r.routeId).includes(q) ||
        r.origin.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q)
      );
    });

    data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "routeId") cmp = a.routeId - b.routeId;
      if (sortKey === "alpha") cmp = (a.origin + a.destination).localeCompare(b.origin + b.destination);
      return sortAsc ? cmp : -cmp;
    });

    return data;
  }, [routes, routeQuery, sortKey, sortAsc]);

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
        <h4>Manage Routes</h4>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="input-group" style={{ maxWidth: 250 }}>
            <span className="input-group-text bg-light"><FaSearch /></span>
            <input
              className="form-control"
              placeholder="Search by ID / Origin / Destination"
              value={routeQuery}
              onChange={(e) => setRouteQuery(e.target.value)}
            />
          </div>
          <div className="btn-group">
            <Button
              variant={sortKey === "routeId" ? "primary" : "outline-primary"}
              onClick={() => setSortKey("routeId")}
            >ID</Button>
            <Button
              variant={sortKey === "alpha" ? "primary" : "outline-primary"}
              onClick={() => setSortKey("alpha")}
            >A–Z</Button>
            <Button
              variant={sortAsc ? "primary" : "outline-primary"}
              onClick={() => setSortAsc(s => !s)}
            >
              {sortAsc ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
            </Button>
          </div>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            <FaPlus className="me-1" /> Add Route
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading routes...</p>
      ) : filteredSortedRoutes.length === 0 ? (
        <p>No routes found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSortedRoutes.map((r) => (
              <tr key={r.routeId}>
                <td>{r.routeId}</td>
                <td>{r.origin}</td>
                <td>{r.destination}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => setEditRoute(r)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(r.routeId)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

     {showAdd && (
  <AddRouteModal
    show={showAdd}
    onClose={() => setShowAdd(false)}
    onAdded={fetchRoutes}   // ✅ correct
  />
)}

<EditRouteModal
  show={!!editRoute}
  route={editRoute}
  onClose={() => setEditRoute(null)}
  onUpdated={fetchRoutes}
/>


    </div>
  );
}
