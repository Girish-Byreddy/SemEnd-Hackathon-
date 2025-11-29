import React, { useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

  // ---------- STUDENT ACHIEVEMENT DATA ----------
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      studentName: "Girish",
      activity: "Intercollege Coding Hackathon",
      category: "Award",
      level: "National",
      date: "2025-11-10",
      description: "Won 2nd place in national-level hackathon.",
    },
    {
      id: 2,
      studentName: "Karthik",
      activity: "Sports Meet - 100m Running",
      category: "Participation",
      level: "College",
      date: "2025-09-12",
      description: "Participated in 100m sprint representing college.",
    },
    {
      id: 3,
      studentName: "Manoj",
      activity: "Technical Quiz Competition",
      category: "Award",
      level: "Intercollege",
      date: "2025-08-20",
      description: "Won 1st prize in intercollege technical quiz.",
    },
    {
      id: 4,
      studentName: "Rahul",
      activity: "Cultural Fest - Singing Competition",
      category: "Recognition",
      level: "College",
      date: "2025-07-18",
      description: "Recognized as one of the top performers in singing.",
    },
    {
      id: 5,
      studentName: "Sai Kumar",
      activity: "Robotics Workshop",
      category: "Participation",
      level: "College",
      date: "2025-06-15",
      description: "Participated in hands-on robotics workshop.",
    },
    {
      id: 6,
      studentName: "Vijay",
      activity: "State Level Cricket Tournament",
      category: "Award",
      level: "State",
      date: "2025-05-10",
      description: "Represented college and won Runner-Up trophy.",
    }
  ]);

  // ---------- AUTH HANDLERS ----------
  const handleLogin = (data) => {
    setRole(data.role);
    setCurrentUserName(data.name);
    setPage("dashboard");
  };

  const handleSignup = () => {
    alert("Signup successful! Please login now.");
    setPage("login");
  };

  const handleLogout = () => {
    setRole("");
    setCurrentUserName("");
    setPage("login");
  };

  // ---------- ADMIN ACTIONS ----------
  const handleAddAchievement = (newAchievement) => {
    setAchievements((prev) => [
      ...prev,
      { ...newAchievement, id: Date.now() },
    ]);
  };

  const handleUpdateAchievement = (updatedAchievement) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === updatedAchievement.id ? updatedAchievement : a))
    );
  };

  const handleDeleteAchievement = (id) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  const showAuth = page === "login" || page === "signup";

  return (
    <div className="app-root">
      <div className="background-layer" />

      {/* ------------------ LOGIN / SIGNUP ------------------ */}
      {showAuth ? (
        <div className="auth-container">

          <div className="brand-side">
            <h1 className="brand-title">Extracurricular Achievement Portal</h1>
            <p className="brand-text">
              Track awards, recognitions and participation beyond academics.
            </p>
            <ul className="brand-list">
              <li>Admins manage student achievements</li>
              <li>Students view their own achievements</li>
              <li>Built complete using React</li>
            </ul>
          </div>

          <div className="form-side">
            {page === "login" ? (
              <LoginPage
                onLogin={handleLogin}
                goToSignup={() => setPage("signup")}
              />
            ) : (
              <SignupPage
                onSignup={handleSignup}
                goToLogin={() => setPage("login")}
              />
            )}
          </div>
        </div>
      ) : (
        /* ------------------ DASHBOARD ------------------ */
        <div className="dashboard-root">
          <Header />
          <TopBar
            role={role}
            currentUserName={currentUserName}
            onLogout={handleLogout}
          />

          {role === "admin" ? (
            <AdminDashboard
              achievements={achievements}
              onAdd={handleAddAchievement}
              onUpdate={handleUpdateAchievement}
              onDelete={handleDeleteAchievement}
            />
          ) : (
            <StudentDashboard
              achievements={achievements}
              currentUserName={currentUserName}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

/* ------------------ HEADER ------------------ */
function Header() {
  return (
    <header className="dash-header">
      <h2>Student Achievement Tracker</h2>
      <p>Manage and showcase accomplishments beyond academics.</p>
    </header>
  );
}

/* ------------------ TOP BAR ------------------ */
function TopBar({ role, currentUserName, onLogout }) {
  return (
    <div className="topbar">
      <span>
        Logged in as <strong>{currentUserName}</strong> ({role})
      </span>
      <button className="btn small outline" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

/* ------------------ ADMIN DASHBOARD ------------------ */
function AdminDashboard({ achievements, onAdd, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");

  const filtered = achievements.filter((a) =>
    a.studentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h3 className="section-title">Admin Panel</h3>

      <div className="grid-2">
        <AchievementForm onAdd={onAdd} />
        <AdminSummary achievements={achievements} />
      </div>

      <div className="card">
        <div className="table-header">
          <h4>All Achievements</h4>
          <input
            type="text"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <AchievementTable
          achievements={filtered}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

/* ------------------ STUDENT DASHBOARD ------------------ */
function StudentDashboard({ achievements, currentUserName }) {
  const mine = achievements.filter(
    (a) => a.studentName.toLowerCase() === currentUserName.toLowerCase()
  );

  return (
    <div className="dashboard">
      <h3 className="section-title">My Dashboard</h3>
      <StudentSummary achievements={mine} />

      <div className="card">
        <h4>My Achievements</h4>
        {mine.length === 0 ? (
          <p>No achievements yet. Please contact admin.</p>
        ) : (
          <AchievementList achievements={mine} />
        )}
      </div>
    </div>
  );
}

/* ------------------ ADD ACHIEVEMENT FORM ------------------ */
function AchievementForm({ onAdd }) {
  const [formData, setFormData] = useState({
    studentName: "",
    activity: "",
    category: "Participation",
    level: "College",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName || !formData.activity || !formData.date) {
      alert("Please fill required fields");
      return;
    }

    onAdd(formData);

    setFormData({
      studentName: "",
      activity: "",
      category: "Participation",
      level: "College",
      date: "",
      description: "",
    });
  };

  return (
    <div className="card">
      <h4>Add Achievement</h4>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Student Name</label>
          <input
            name="studentName"
            placeholder="Enter student name"
            value={formData.studentName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Activity / Event</label>
          <input
            name="activity"
            placeholder="Enter activity name"
            value={formData.activity}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Participation</option>
              <option>Award</option>
              <option>Recognition</option>
            </select>
          </div>

          <div className="form-group">
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option>College</option>
              <option>Intercollege</option>
              <option>State</option>
              <option>National</option>
              <option>International</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Write a short note"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="btn primary full">Save</button>
      </form>
    </div>
  );
}

/* ------------------ SUMMARY CARDS ------------------ */
function AdminSummary({ achievements }) {
  const total = achievements.length;
  const awards = achievements.filter((a) => a.category === "Award").length;
  const recognition = achievements.filter(
    (a) => a.category === "Recognition"
  ).length;
  const participation = achievements.filter(
    (a) => a.category === "Participation"
  ).length;

  return (
    <div className="card">
      <h4>Summary</h4>

      <div className="summary-grid">
        <SummaryCard label="Total" value={total} />
        <SummaryCard label="Awards" value={awards} />
        <SummaryCard label="Recognition" value={recognition} />
        <SummaryCard label="Participation" value={participation} />
      </div>
    </div>
  );
}

function StudentSummary({ achievements }) {
  const total = achievements.length;
  const awards = achievements.filter((a) => a.category === "Award").length;
  const recognition = achievements.filter(
    (a) => a.category === "Recognition"
  ).length;
  const participation = achievements.filter(
    (a) => a.category === "Participation"
  ).length;

  return (
    <div className="card">
      <h4>My Summary</h4>

      <div className="summary-grid">
        <SummaryCard label="Total" value={total} />
        <SummaryCard label="Awards" value={awards} />
        <SummaryCard label="Recognition" value={recognition} />
        <SummaryCard label="Participation" value={participation} />
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <div className="summary-value">{value}</div>
      <div className="summary-label">{label}</div>
    </div>
  );
}

/* ------------------ TABLE ------------------ */
function AchievementTable({ achievements, onUpdate, onDelete }) {
  const handleEdit = (achievement) => {
    const activity = prompt("New Activity", achievement.activity);
    if (activity === null) return;

    const description = prompt(
      "New Description",
      achievement.description || ""
    );
    if (description === null) return;

    onUpdate({ ...achievement, activity, description });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Activity</th>
          <th>Category</th>
          <th>Level</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {achievements.map((a) => (
          <tr key={a.id}>
            <td>{a.studentName}</td>
            <td>{a.activity}</td>
            <td>{a.category}</td>
            <td>{a.level}</td>
            <td>{a.date}</td>
            <td>{a.description}</td>
            <td>
              <button className="btn small" onClick={() => handleEdit(a)}>
                Edit
              </button>
              <button
                className="btn small danger"
                onClick={() => onDelete(a.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ------------------ STUDENT LIST ------------------ */
function AchievementList({ achievements }) {
  return (
    <ul className="achievement-list">
      {achievements.map((a) => (
        <li key={a.id} className="achievement-item">
          <h5>{a.activity}</h5>
          <p>
            <strong>{a.category}</strong> | {a.level} | {a.date}
          </p>
          {a.description && <p>{a.description}</p>}
        </li>
      ))}
    </ul>
  );
}
