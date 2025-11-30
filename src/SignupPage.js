import React, { useState, useEffect } from "react";

function SignupPage({ onSignup, goToLogin }) {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // CAPTCHA
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptchaQuestion(`${a} + ${b} = ?`);
    setCaptchaAnswer(a + b);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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

    if (parseInt(captchaInput, 10) !== captchaAnswer) {
      alert("CAPTCHA incorrect. Please try again.");
      generateCaptcha();
      return;
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = role.toLowerCase(); // "admin" or "student"

    onSignup({
      name: cleanName,
      email: cleanEmail,
      password,
      role: cleanRole,
    });
  };

  return (
    <div className="card auth-card">
      <h2 className="card-title">Create account ✨</h2>
      <p className="card-subtitle">
        Join the portal to track and showcase extracurricular achievements.
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

        {/* CAPTCHA */}
        <div className="form-group">
          <label>
            CAPTCHA: <strong>{captchaQuestion}</strong>
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="number"
              placeholder="Answer"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            <button
              type="button"
              className="btn small outline"
              onClick={generateCaptcha}
            >
              Refresh
            </button>
          </div>
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
