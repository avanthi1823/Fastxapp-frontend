import React, { useState } from "react";
import "./Register.css";
import { registerAPICall } from '../../services/register.service';
import { registerModel } from '../../models/register.model';


function Register() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        roleId: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "roleId" ? Number(value) : value // convert roleId to number
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        registerAPICall(form)
            .then(res => {
                console.log("Registration success:", res.data);
                alert("Registered successfully!");
                // Optionally, reset form after successful registration
                setForm({
                    fullName: "",
                    email: "",
                    password: "",
                    gender: "",
                    phone: "",
                    roleId: 0
                });
            })
            .catch(err => {
                console.error("Registration failed:", err.response?.data || err.message);
                alert("Registration failed: " + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Gender</label>
                                <select
                                    className="form-control"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Role ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="roleId"
                                    value={form.roleId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-success w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
