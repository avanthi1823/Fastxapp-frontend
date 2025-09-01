import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBuses } from "../services/busService";

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatDate = (d) => d.toISOString().split("T")[0];
  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  const searchBuses = async () => {
    setLoading(true);
    setError("");
    try {
    const data = await searchBuses(origin, destination, date);
      navigate("/results", {
        state: { buses: data, search: { origin, destination, date } },
      });
    } catch (e) {
      setError("Unable to fetch buses. Please check inputs or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "150vh",
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="d-flex align-items-center"
    >
      <div className="container">
        <h1 className="text-center text-black mb-4 fw-bold">
          Book Your Bus Tickets
        </h1>
{/* Banner Section */}



 


        {/* Search Card */}
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div
              className="card p-4 shadow-lg border-0"
              style={{
                borderRadius: "20px",
                background: "rgba(255,255,255,0.95)",
                maxWidth: "1200px",
                margin: "auto",
              }}
            >
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Input Row */}
              <div className="row g-3 align-items-end">
                {/* From */}
                <div className="col-md-3">
                  <label className="form-label fw-semibold">From</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-bus-front"></i>
                    </span>
                    <input
                      className="form-control"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="e.g., Mumbai"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="col-md-3">
                  <label className="form-label fw-semibold">To</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-bus-front-fill"></i>
                    </span>
                    <input
                      className="form-control"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g., Pune"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Date</label>
                  <div className="d-flex align-items-center">
                    <div className="input-group me-2" style={{ flex: "1" }}>
                      <span className="input-group-text bg-light">
                        <i className="bi bi-calendar-event"></i>
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className={`btn btn-sm me-2 ${
                        date === today ? "btn-danger" : "btn-outline-danger"
                      }`}
                      onClick={() => setDate(today)}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${
                        date === tomorrow ? "btn-danger" : "btn-outline-danger"
                      }`}
                      onClick={() => setDate(tomorrow)}
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Button (below inputs) */}
              <div className="mt-4 text-center">
                <button
                  disabled={loading}
                  onClick={searchBuses}
                  className="btn btn-danger w-50 py-3 fs-5 fw-semibold"
                  style={{ borderRadius: "15px" }}
                >
                  <i className="bi bi-search me-2"></i>
                  {loading ? "Searching..." : "Search Buses"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular routes section */}
        <div className="container mt-5">
          <h2 className="text-center text-white mb-4">Popular Routes</h2>
          <div className="row">
            {[
              { route: "Mumbai → Pune", image: "/mumbai-pune.jpg" },
              { route: "Delhi → Jaipur", image: "/delhi-jaipur.jpg" },
              { route: "Bangalore → Chennai", image: "/bangalore-chennai.jpg" },
            ].map((item, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.route}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.route}</h5>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        navigate("/results", {
                          state: {
                            search: {
                              origin: item.route.split(" → ")[0],
                              destination: item.route.split(" → ")[1],
                              date: "",
                            },
                            buses: [],
                          },
                        })
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      
  );
}
