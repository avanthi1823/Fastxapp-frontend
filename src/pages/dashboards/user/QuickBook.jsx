import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBuses } from "../../../services/busService";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay, FaApple, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function QuickBook() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSearch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const buses = await searchBuses(origin, destination, date);
      navigate("/results", { state: { buses, search: { origin, destination, date } } });
    } catch (e) {
      setError("No buses found. Try a different route/date.");
    } finally {
      setLoading(false);
    }
  }

  const popular = [
    { from: "Mumbai", to: "Pune", img: "/mumbai-pune.jpg" },
    { from: "Delhi", to: "Jaipur", img: "/delhi-jaipur.jpg" },
    { from: "Bengaluru", to: "Chennai", img: "/bangalore-chennai.jpg" },
  ];

  const testimonials = [
    { name: "Amit Sharma", text: "Booked a bus from Mumbai to Pune, very easy and fast!", avatar: "/avatars/amit.jpg" },
    { name: "Neha Singh", text: "Loved the discounts and smooth booking process.", avatar: "/avatars/neha.jpg" },
    { name: "Ravi Kumar", text: "Great service and 24/7 support. Highly recommend!", avatar: "/avatars/ravi.jpg" },
  ];

  const offers = [
    { code: "SAVE10", text: "Get 10% off on your next booking" },
    { code: "FIRST50", text: "₹50 off for first-time users" },
    { code: "WEEKEND20", text: "20% off on weekend trips" },
  ];

  return (
    <div>
      {/* 🌆 Hero Banner */}
      <div
        className="position-relative text-center text-white"
        style={{
          backgroundImage: "url('/busq.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "330px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.55)" }}
        ></div>
        <div className="position-relative">
          <h1 className="fw-bold display-5">Book Your Journey </h1>
          <p className="lead">Search, compare and travel with ease</p>
        </div>
      </div>

      {/* 🔎 Enhanced Floating Search Card */}
      <div
        className="position-relative"
        style={{
          maxWidth: "1100px",
          width: "95%",
          margin: "-70px auto 40px",
          zIndex: 2,
        }}
      >
        <form
          onSubmit={onSearch}
          className="row g-3 p-4 shadow-lg bg-white rounded-4"
          style={{
            backdropFilter: "blur(12px)",
            transition: "transform 0.3s ease",
          }}
        >
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="col-md-4">
            <label className="form-label fw-semibold">From</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-geo-alt-fill text-danger"></i>
              </span>
              <input
                className="form-control"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter origin city"
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">To</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-geo-fill text-success"></i>
              </span>
              <input
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination city"
                required
              />
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Date</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-calendar-event text-primary"></i>
              </span>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-1 d-grid">
            <button
              className="btn btn-danger fw-bold"
              disabled={loading}
              style={{ borderRadius: "12px" }}
            >
              {loading ? "…" : "Go"}
            </button>
          </div>
        </form>
      </div>

      {/* ✨ Popular Routes */}
      <div className="container mt-5">
        <h4 className="fw-bold mb-4 text-center">Popular Routes</h4>
        <div className="row g-4">
          {popular.map((p, i) => (
            <div key={i} className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative"
                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                onClick={() => { setOrigin(p.from); setDestination(p.to); }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img
                  src={p.img}
                  alt={`${p.from}-${p.to}`}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold text-danger">{p.from} → {p.to}</h6>
                  <button className="btn btn-outline-danger btn-sm mt-2">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    {/* 💰 Offers & Coupons */}
<div className="container-sm my-5">
  <h2 className="text-center fw-bold mb-4">Exclusive Offers & Coupons</h2>

  <div
    style={{
      display: "flex",
      justifyContent: "center", // centers all items horizontally
      gap: "50px", // smaller gap for better spacing
      flexWrap: "wrap", // allows wrapping on smaller screens
      // vertically aligns all items in the center
    }}
  >
    {[
      { code: "DIWALI25", discount: "25% off", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSYYKouT0sdv0wPVxp_V7YI01zJi-VngQonA&s" },
      { code: "POOJA50", discount: "50% off", img: "https://www.shutterstock.com/image-vector/durga-puja-festival-offer-banner-260nw-714336466.jpg" },
      { code: "SAVE50", discount: "50% off", img: "https://img.freepik.com/premium-vector/discount-coupon-voucher-3d-style-sale_649512-2003.jpg" },
    ].map((o, i) => (
      <div key={i} style={{ textAlign: "center", minWidth: "150px" }}>
        <img
          src={o.img}
          alt={o.code}
          style={{ width: "200px", height: "170px", objectFit: "cover", borderRadius: "8px" }}
        />
        <div>{o.code}</div>
        <div style={{ color: "#6c757d" }}>{o.discount}</div>
      </div>
    ))}
  </div>
</div>





    

{/* 🗣 Testimonials / Feedback */}
<div className="container my-5">
  <h2 className="text-center fw-bold mb-4">What Our Customers Say</h2>
  <div className="row g-4">
    {[
      { name: "Ravi", text: "Smooth booking experience and excellent service!", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
      { name: "Anita", text: "Affordable fares and timely buses. Highly recommend!", img: "https://cdn-icons-png.flaticon.com/512/6833/6833591.png" },
      { name: "Siddharth", text: "Customer support was super helpful when I needed changes.", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    ].map((t, i) => (
      <div key={i} className="col-md-4">
        <div className="p-4 shadow-sm rounded-4 bg-white h-100 text-center">
          <img
            src={t.img}
            alt={t.name}
            className="rounded-circle mb-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <h5 className="fw-bold">{t.name}</h5>
          <p className="text-muted">{t.text}</p>
        </div>
      </div>
    ))}
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
