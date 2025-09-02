
import React, { useEffect, useMemo, useState } from "react";
import operatorService from "../../services/operatorService"; 
import adminService from "../../services/adminService"; 

import AddBusModal from "./AddBusModal";
import AssignAmenitiesModal from "./AssignAmenitiesModal";
import AddScheduleModal from "./AddScheduleModal";


import AddRouteModal from "./admin/modals/AddRouteModal";
import EditRouteModal from "./admin/modals/EditRouteModal";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line
} from "recharts";

import { Table, Button } from "react-bootstrap";
import { 
  FaBus, FaCalendarAlt, FaTicketAlt, FaCogs, FaTachometerAlt,
  FaPlus, FaEdit, FaTrash, FaSearch, FaSortAmountDownAlt, FaSortAmountUpAlt 
} from "react-icons/fa";

export default function OperatorDashboard() {
  
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("dashboard");

  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [assignBus, setAssignBus] = useState(null);

  const [routeQuery, setRouteQuery] = useState("");
  const [sortKey, setSortKey] = useState("routeId");
  const [sortAsc, setSortAsc] = useState(true);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [editRoute, setEditRoute] = useState(null);

  
  const loadAll = async () => {
    setLoading(true);
    try {
      const [busData, bookingData, amenitiesData, scheduleData, routeData] = await Promise.all([
        operatorService.getMyBuses(),
        operatorService.getBookings(),
        operatorService.getAmenities(),
        operatorService.getMySchedules(),
        adminService.getRoutes(), // admin routes
      ]);
      setBuses(busData || []);
      setBookings(bookingData || []);
      setAmenities(amenitiesData || []);
      setSchedules(scheduleData || []);
      setRoutes(routeData || []);
      console.log("Routes loaded:", routeData);
    } catch (e) {
      console.error("Failed to load data:", e);
      alert("Failed to load data from backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  
  const handleDeleteBus = async (busId) => {
    if (!window.confirm("Delete this bus?")) return;
    try {
      await operatorService.deleteBus(busId);
      setBuses(prev => prev.filter(b => b.busId !== busId));
      setSchedules(prev => prev.filter(s => s.busId !== busId));
      alert("✅ Bus deleted!");
    } catch (e) {
      console.error(e);
      alert("Failed to delete bus");
    }
  };

  
  const handleDeleteSchedule = async (scheduleId) => {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      await operatorService.deleteSchedule(scheduleId);
      setSchedules(prev => prev.filter(s => s.scheduleId !== scheduleId));
      alert("✅ Schedule deleted!");
    } catch (e) {
      console.error(e);
      alert("Failed to delete schedule");
    }
  };

  
  const handleDeleteRoute = async (id) => {
    if (!window.confirm("Delete this route?")) return;
    try {
      await adminService.deleteRoute(id);
      await loadAll();
      alert("✅ Route deleted!");
    } catch (e) {
      console.error(e);
      alert("Failed to delete route");
    }
  };

 
  const filteredSortedRoutes = useMemo(() => {
    const q = routeQuery.trim().toLowerCase();
    let data = routes.filter(r => {
      if (!q) return true;
      return (
        String(r.routeId).includes(q) ||
        (r.origin || r.Origin || "").toLowerCase().includes(q) ||
        (r.destination || r.Destination || "").toLowerCase().includes(q)
      );
    });

    data.sort((a, b) => {
      let cmp = 0;
      const originA = a.origin || a.Origin || "";
      const originB = b.origin || b.Origin || "";
      const destA = a.destination || a.Destination || "";
      const destB = b.destination || b.Destination || "";

      if (sortKey === "routeId") cmp = (a.routeId || a.RouteId) - (b.routeId || b.RouteId);
      if (sortKey === "alpha") cmp = (originA + destA).localeCompare(originB + destB);
      return sortAsc ? cmp : -cmp;
    });

    return data;
  }, [routes, routeQuery, sortKey, sortAsc]);

  // --- Charts ---
  const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"];
  const pieData = [
    { name: "Buses", value: buses.length },
    { name: "Schedules", value: schedules.length },
    { name: "Bookings", value: bookings.length },
    { name: "Amenities", value: amenities.length },
  ];
  const barData = schedules.map(s => ({
    bus: s.busName ?? s.busId,
    bookings: bookings.filter(b => b.busId === s.busId).length,
  }));
  const bookingTrend = bookings.reduce((acc, b) => {
    const day = b.departureTime?.slice(0, 10);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const bookingTrendData = Object.keys(bookingTrend).map(d => ({ date: d, bookings: bookingTrend[d] }));

  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary"></div>
      <p className="mt-3">Loading Operator Dashboard...</p>
    </div>
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100 shadow" style={{ width: 230 }}>
        <h4 className="text-center mb-4"><FaTachometerAlt className="me-2" />Operator</h4>
        <ul className="nav flex-column">
          {["dashboard", "buses", "schedules", "bookings", "routes"].map(pg => (
            <li key={pg} className="nav-item">
              <button
                className={`btn w-100 text-start mb-2 ${page === pg ? "btn-primary" : "btn-outline-light"}`}
                onClick={() => setPage(pg)}
              >
                {pg === "dashboard" && <FaTachometerAlt className="me-2" />}
                {pg === "buses" && <FaBus className="me-2" />}
                {pg === "schedules" && <FaCalendarAlt className="me-2" />}
                {pg === "bookings" && <FaTicketAlt className="me-2" />}
                {pg === "routes" && <FaPlus className="me-2" />}
                {pg.charAt(0).toUpperCase() + pg.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <h2 className="fw-bold mb-4 text-success">📊 Operator Dashboard</h2>
            <div className="row g-4 mb-4">
              {[
                { name: "Buses", value: buses.length, icon: <FaBus size={35} />, bg: "linear-gradient(135deg,#4e73df,#224abe)" },
                { name: "Schedules", value: schedules.length, icon: <FaCalendarAlt size={35} />, bg: "linear-gradient(135deg,#1cc88a,#0f5132)" },
                { name: "Bookings", value: bookings.length, icon: <FaTicketAlt size={35} />, bg: "linear-gradient(135deg,#f6c23e,#d39e00)" },
                { name: "Amenities", value: amenities.length, icon: <FaCogs size={35} />, bg: "linear-gradient(135deg,#36b9cc,#117a8b)" }
              ].map((item, i) => (
                <div className="col-md-3" key={i}>
                  <div className="card p-3 shadow border-0 text-white" style={{ background: item.bg }}>
                    {item.icon}
                    <h6 className="fw-bold">{item.name}</h6>
                    <h2>{item.value}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card p-3 shadow border-0 rounded-4">
                  <h6 className="text-center fw-bold mb-2">Data Distribution</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" outerRadius={100} label>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow border-0 rounded-4">
                  <h6 className="text-center fw-bold mb-2">Bookings per Bus</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bus" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bookings" fill="#4e73df" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow border-0 rounded-4">
                  <h6 className="text-center fw-bold mb-2">Bookings Over Time</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={bookingTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="bookings" stroke="#1cc88a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        {/* BUSES */}
        {page === "buses" && (
          <>
            <h2 className="fw-bold mb-4 text-primary">🚌 My Buses</h2>
            <Button className="mb-3" onClick={() => setShowAddBusModal(true)}>+ Add Bus</Button>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="table-dark"><tr><th>ID</th><th>Name</th><th>Number</th><th>Type</th><th>Seats</th><th>Actions</th></tr></thead>
                <tbody>
                  {buses.length ? buses.map(b => (
                    <tr key={b.busId}>
                      <td>{b.busId}</td>
                      <td>{b.busName}</td>
                      <td>{b.busNumber}</td>
                      <td>{b.busTypeId}</td>
                      <td>{b.numberOfSeats}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => setAssignBus(b)}>Assign Amenities</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteBus(b.busId)}>Delete</Button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={6} className="text-center">No buses found</td></tr>}
                </tbody>
              </Table>
            </div>
          </>
        )}

        {/* SCHEDULES */}
        {page === "schedules" && (
          <>
            <h2 className="fw-bold mb-4 text-primary">📅 My Schedules</h2>
            <Button className="mb-3" onClick={() => setShowAddScheduleModal(true)}>+ Add Schedule</Button>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="table-dark"><tr><th>ID</th><th>Bus</th><th>RouteId</th><th>Departure</th><th>Arrival</th><th>Fare</th><th>Actions</th></tr></thead>
                <tbody>
                  {schedules.length ? schedules.map(s => (
                    <tr key={s.scheduleId}>
                      <td>{s.scheduleId}</td>
                      <td>{s.busName ?? s.busId}</td>
                      <td>{s.routeId}</td>
                      <td>{new Date(s.departureTime).toLocaleString()}</td>
                      <td>{new Date(s.arrivalTime).toLocaleString()}</td>
                      <td>₹{s.fare}</td>
                      <td>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteSchedule(s.scheduleId)}>Delete</Button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={7} className="text-center">No schedules found</td></tr>}
                </tbody>
              </Table>
            </div>
          </>
        )}

        {/* BOOKINGS */}
        {page === "bookings" && (
          <>
            <h2 className="fw-bold mb-4 text-primary">🎟 My Bookings</h2>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="table-dark"><tr><th>ID</th><th>Passenger</th><th>Bus</th><th>Route</th><th>Date</th><th>Seats</th><th>Fare</th></tr></thead>
                <tbody>
                  {bookings.length ? bookings.map(b => (
                    <tr key={b.bookingId}>
                      <td>{b.bookingId}</td>
                      <td>{b.passengerName}</td>
                      <td>{b.busName}</td>
                      <td>{b.route?.replace("?", "→")}</td>
                      <td>{b.departureTime?.slice(0,10)}</td>
                      <td>{b.seatNumber}</td>
                      <td>₹{b.fare}</td>
                    </tr>
                  )) : <tr><td colSpan={7} className="text-center">No bookings found</td></tr>}
                </tbody>
              </Table>
            </div>
          </>
        )}

        {/* ROUTES */}
        {page === "routes" && (
          <>
            <h2 className="fw-bold mb-4 text-primary">🛣 Manage Routes</h2>
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <div className="input-group" style={{ maxWidth: 250 }}>
                <span className="input-group-text bg-light"><FaSearch /></span>
                <input className="form-control" placeholder="Search by ID / Origin / Destination" value={routeQuery} onChange={e => setRouteQuery(e.target.value)} />
              </div>
              <div className="btn-group">
                <Button variant={sortKey==="routeId"?"primary":"outline-primary"} onClick={()=>setSortKey("routeId")}>ID</Button>
                <Button variant={sortKey==="alpha"?"primary":"outline-primary"} onClick={()=>setSortKey("alpha")}>A–Z</Button>
                <Button variant={sortAsc?"primary":"outline-primary"} onClick={()=>setSortAsc(s=>!s)}>{sortAsc?<FaSortAmountDownAlt />:<FaSortAmountUpAlt />}</Button>
              </div>
              <Button variant="primary" onClick={()=>setShowAddRouteModal(true)}><FaPlus className="me-1" /> Add Route</Button>
            </div>

            {filteredSortedRoutes.length===0 ? <p>No routes found</p> : (
              <Table striped bordered hover responsive>
                <thead><tr><th>Route ID</th><th>Origin</th><th>Destination</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredSortedRoutes.map(r => (
                    <tr key={r.routeId || r.RouteId}>
                      <td>{r.routeId || r.RouteId}</td>
                      <td>{r.origin || r.Origin}</td>
                      <td>{r.destination || r.Destination}</td>
                      <td>
                        <Button size="sm" variant="warning" className="me-2" onClick={()=>setEditRoute(r)}><FaEdit /></Button>
                        <Button size="sm" variant="danger" onClick={()=>handleDeleteRoute(r.routeId || r.RouteId)}><FaTrash /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </div>

      {/* MODALS */}
      {showAddBusModal && <AddBusModal onClose={()=>setShowAddBusModal(false)} onSaved={loadAll} />}
      {showAddScheduleModal && <AddScheduleModal buses={buses} onClose={()=>setShowAddScheduleModal(false)} onSaved={loadAll} />}
      {assignBus && <AssignAmenitiesModal bus={assignBus} onClose={()=>setAssignBus(null)} onSaved={loadAll} />}
      {showAddRouteModal && (
  <AddRouteModal
    show={showAddRouteModal}
    onClose={() => setShowAddRouteModal(false)}
    onAdded={loadAll}       
  />
)}

{editRoute && (
  <EditRouteModal
    show={!!editRoute}
    route={editRoute}
    onClose={() => setEditRoute(null)}
    onUpdated={loadAll}     
  />
)}

    </div>
  );
}
