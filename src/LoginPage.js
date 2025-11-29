import React, { useState } from "react";

function LoginPage({ onLogin, goToSignup }) {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill name, email and password");
      return;
    }

    onLogin({ role, name: name.trim(), email, password });
  };

  return (
    <div className="card auth-card">
      <h2 className="card-title">Welcome back 👋</h2>
      <p className="card-subtitle">
        Login to manage or view extracurricular achievements.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Login as</label>
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn primary full">
          Login
        </button>
      </form>

      <p className="switch-text">
        Don&apos;t have an account?{" "}
        <button type="button" className="link-btn" onClick={goToSignup}>
          Sign up
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
