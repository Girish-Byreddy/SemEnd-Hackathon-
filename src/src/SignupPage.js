import React, { useState } from "react";

function SignupPage({ onSignup, goToLogin }) {
  const [role, setRole] = useState("student"); // admin / student
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    onSignup({ role, name, email, password });
  };

  return (
    <div className="card auth-card">
      <h2>Sign Up</h2>
      <p className="subtitle">
        Create an account to manage or view extracurricular achievements.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Register as</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>College Email</label>
          <input
            type="email"
            placeholder="example@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Create Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button type="submit" className="btn primary full">
          Create Account
        </button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <button type="button" className="link-btn" onClick={goToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default SignupPage;
