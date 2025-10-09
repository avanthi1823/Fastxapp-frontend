import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBuses as fetchBuses } from "../services/busService";

import { FaFacebook, FaTwitter, FaBus,FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGooglePlay, FaApple } from "react-icons/fa";
import { image } from "framer-motion/client";

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
      const data = await fetchBuses(origin, destination, date);
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
    <div>
      {/* Hero Section */}
      <div
        className="d-flex align-items-center"
        style={{
          minHeight: "90vh",
          backgroundColor: "#c93333ff",
          background: "linear-gradient(to right, rgba(255, 175, 191, 0.85), rgba(255, 221, 221, 0.6)),url('data:image/jpeg;base64,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')",
     backgroundSize: "cover",      // fills container
    backgroundRepeat: "no-repeat", // prevent tiling
    backgroundPosition: "center",  // keep image centered
  
         
          color: "white",
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bold display-4 mb-3">Book Your Journey with Ease</h1>
          <p className="lead mb-5 text-dark">
            Fast, Secure & Trusted by Millions of Travelers
          </p>

          {/* Search Card */}
          <div
            className="card p-4 shadow-lg border-0 mx-auto animate__animated animate__fadeInUp"
            style={{
              borderRadius: "20px",
              maxWidth: "1000px",
              background: "rgba(255,255,255,0.97)",
              color: "black",
            }}
          >
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-3">
              {/* From */}
              <div className="col-md-3">
                <label className="form-label fw-semibold">From</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaMapMarkerAlt className="text-danger" />
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
                  <span className="input-group-text bg-white">
                    <FaBus className="text-danger" />
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
                  <input
                    type="date"
                    className="form-control me-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`btn me-2 ${
                      date === today ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => setDate(today)}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      date === tomorrow ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => setDate(tomorrow)}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                disabled={loading}
                onClick={searchBuses}
                className="btn btn-danger w-50 py-3 fs-5 fw-semibold"
                style={{ borderRadius: "15px" }}
              >
                {loading ? "Searching..." : "Search Buses"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Popular Routes</h2>
        <div className="row">
          {[
            { route: "Mumbai → Pune", image: "/mumbai-pune.jpg" },
            { route: "Jaipur → Delhi", image: "/delhi-jaipur.jpg" },
            { route: "Chennai → Bangalore", image: "/bangalore-chennai.jpg" },
          ].map((item, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100 rounded-4 hover-shadow">
                <img
                  src={item.image}
                  className="card-img-top rounded-top-4"
                  alt={item.route}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{item.route}</h5>
                  <button
                    className="btn btn-outline-danger px-4 mt-2"
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem("user"));
                      if (!user) {
                        alert("Please login to book your ticket.");
                        navigate("/login");
                      } else {
                        navigate("/results", {
                          state: {
                            search: {
                              origin: item.route.split(" → ")[0],
                              destination: item.route.split(" → ")[1],
                              date: "",
                            },
                            buses: [],
                          },
                        });
                      }
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>
        <div className="row text-center">
          {[
            {
              img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              title: "Safe & Secure",
              text: "Verified operators, secure payments, and safe journeys guaranteed.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              title: "Affordable Fares",
              text: "Get the best ticket prices with exclusive discounts and offers.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
              title: "24/7 Support",
              text: "Our dedicated support team is here for you anytime, anywhere.",
            },
          ].map((item, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded-4 bg-white h-100 hover-shadow">
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "80px", marginBottom: "15px" }}
                />
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">
            FAQs related to Bus Ticket Booking
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8">
              {[
                {
                  q: "Can I track the location of my booked bus online?",
                  a: "Yes. After booking, you can track your bus in real-time using the live GPS feature available in your bookings section.",
                },
                {
                  q: "What are the advantages of purchasing a bus ticket here?",
                  a: "We provide fast booking, secure payments, exclusive discounts, and dedicated 24/7 customer support.",
                },
                {
                  q: "Do I need to create an account to book my bus ticket?",
                  a: "You can book tickets as a guest, but creating an account helps manage your bookings, get rewards, and checkout faster.",
                },
                {
                  q: "How can I get discounts on bus bookings?",
                  a: "Use promo codes, seasonal offers, and special partner discounts. Check our Offers page regularly.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-3 mb-3 bg-white shadow-sm rounded-3 hover-shadow"
                >
                  <h6 className="fw-bold text-danger mb-2">{faq.q}</h6>
                  <p className="text-muted mb-0">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    {/* Footer */}
<footer className="bg-dark text-light pt-5 pb-3 mt-5">
  <div className="container">
    <div className="row text-center text-md-start">
      {/* Brand Info */}
      <div className="col-md-3 mb-4">FastXpress
        <h4 className="fw-bold text-warning"></h4>
        <p className="text-muted">
          India’s most trusted bus booking platform with 50M+ happy travelers. 
          Easy, secure, and reliable ticket booking experience.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-light btn-sm mb-2">
            <FaGooglePlay className="me-2" /> Google Play
          </button>
          <button className="btn btn-outline-light btn-sm mb-2">
            <FaApple className="me-2" /> App Store
          </button>
        </div>
      </div>

      {/* Company */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold mb-3">Company</h6>
        <ul className="list-unstyled text-muted">
          <li><a href="/about" className="text-decoration-none text-light">About Us</a></li>
          <li><a href="/careers" className="text-decoration-none text-light">Careers</a></li>
          <li><a href="/blog" className="text-decoration-none text-light">Blog</a></li>
          <li><a href="/press" className="text-decoration-none text-light">Press</a></li>
        </ul>
      </div>

      {/* Explore */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold mb-3">Explore</h6>
        <ul className="list-unstyled text-muted">
          <li><a href="/routes" className="text-decoration-none text-light">Popular Routes</a></li>
          <li><a href="/offers" className="text-decoration-none text-light">Offers</a></li>
          <li><a href="/operators" className="text-decoration-none text-light">Bus Operators</a></li>
          <li><a href="/app" className="text-decoration-none text-light">Mobile App</a></li>
        </ul>
      </div>

      {/* Support */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold mb-3">Support</h6>
        <ul className="list-unstyled text-muted">
          <li><a href="/faq" className="text-decoration-none text-light">FAQs</a></li>
          <li><a href="/support" className="text-decoration-none text-light">Customer Care</a></li>
          <li><a href="/cancellation" className="text-decoration-none text-light">Cancellation</a></li>
          <li><a href="/refund" className="text-decoration-none text-light">Refund Policy</a></li>
        </ul>
      </div>

      {/* Legal */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold mb-3">Legal</h6>
        <ul className="list-unstyled text-muted">
          <li><a href="/terms" className="text-decoration-none text-light">Terms & Conditions</a></li>
          <li><a href="/privacy" className="text-decoration-none text-light">Privacy Policy</a></li>
          <li><a href="/security" className="text-decoration-none text-light">Security</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-md-3 mb-4">
        <h6 className="fw-bold mb-3">Contact Us</h6>
        <p className="mb-1"><FaPhoneAlt className="me-2 " /> +91 98765 43210</p>
        <p className="mb-1"><FaEnvelope className="me-2 " /> support@fastxpress.com</p>
        <p><FaMapMarkerAlt className="me-2 " /> Bangalore, India</p>
        <div className="mt-2">
          <a href="#" className="text-light me-3"><FaFacebook size={18} /></a>
          <a href="#" className="text-light me-3"><FaTwitter size={18} /></a>
          <a href="#" className="text-light me-3"><FaInstagram size={18} /></a>
          <a href="#" className="text-light"><FaLinkedin size={18} /></a>
        </div>
      </div>
    </div>

   <hr style={{ borderColor: "#444" }} />
<div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
  <p style={{ color: "white" }} className="mb-2 mb-md-0">
    © {new Date().getFullYear()} FastXpress Pvt. Ltd. All Rights Reserved.
  </p>
  <p style={{ color: "white" }} className="small">
    Made with ❤️ for travelers across India
  </p>
</div>

  </div>
</footer>
 </div>
  );
}