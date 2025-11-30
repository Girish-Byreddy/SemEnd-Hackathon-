import React, { useState, useEffect } from "react";

function LoginPage({ onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // simple CAPTCHA
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

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    if (parseInt(captchaInput, 10) !== captchaAnswer) {
      alert("CAPTCHA incorrect. Please try again.");
      generateCaptcha();
      return;
    }

    onLogin({ email, password });
  };

  return (
    <div className="card auth-card">
      <h2 className="card-title">Welcome back 👋</h2>
      <p className="card-subtitle">
        Login to manage or view extracurricular achievements.
      </p>

      <form onSubmit={handleSubmit} className="form">
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
