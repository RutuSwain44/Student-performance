import React, { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  // Signup data
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login data
  const [loginEmail, setLoginEmail] = useState("rituswainrutu@gmail.com");
  const [loginPassword, setLoginPassword] = useState("1234");

  const handleSignup = () => {
    if (signupPassword !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", signupEmail);
    localStorage.setItem("password", signupPassword);

    alert("Signup successful");
    setPage("login");
  };

  const handleLogin = () => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (loginEmail === savedEmail && loginPassword === savedPassword) {
      alert("Login successful");
      setPage("dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      {page === "login" && (
        <div className="auth-page">
          <div className="card">
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            <p>
              Don't have an account?{" "}
              <span onClick={() => setPage("signup")}>Signup</span>
            </p>
          </div>
        </div>
      )}

      {page === "signup" && (
        <div className="auth-page">
          <div className="card">
            <h2>Signup</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={handleSignup}>Signup</button>

            <p>
              Already have an account?{" "}
              <span onClick={() => setPage("login")}>Login</span>
            </p>
          </div>
        </div>
      )}

      {page === "dashboard" && (
        <div className="dashboard">
          <aside className="sidebar">
            <h2>Task Manager</h2>
            <p>Dashboard</p>
            <p>My Tasks</p>
            <p>Completed</p>
            <p onClick={() => setPage("login")}>Logout</p>
          </aside>

          <main className="main">
            <h1>Welcome, {localStorage.getItem("name")}</h1>

            <div className="stats">
              <div className="box">
                <h3>Total Tasks</h3>
                <p>12</p>
              </div>
              <div className="box">
                <h3>Pending</h3>
                <p>7</p>
              </div>
              <div className="box">
                <h3>Completed</h3>
                <p>5</p>
              </div>
            </div>

            <div className="task-form">
              <h2>Add New Task</h2>
              <input type="text" placeholder="Task Title" />
              <textarea placeholder="Task Description"></textarea>
              <input type="date" />
              <select>
                <option>Low Priority</option>
                <option>Medium Priority</option>
                <option>High Priority</option>
              </select>
              <button>Add Task</button>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;