
import React, { useState, useEffect } from "react"
import "./App.css";
import { supabase } from "./supabase";

function App() {
  const [page, setPage] = useState("login");
  const [tasks, setTasks] = useState([]);
const [taskTitle, setTaskTitle] = useState("");
const [taskDate, setTaskDate] = useState("");
const [suggestion, setSuggestion] = useState("");
const [editingId, setEditingId] = useState(null);
const [editingText, setEditingText] = useState("");

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
  const fetchTasks = async () => {

  const { data, error } = await supabase
    .from("tasks")
    .select("*");

  if (error) {
    console.log(error);
  } else {
    setTasks(data);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

const generateSuggestion = (text) => {

  const value = text.toLowerCase();

  if (value.includes("study")) {
    setSuggestion("Study for 2 hours");
  }

  else if (value.includes("gym")) {
    setSuggestion("Workout for 1 hour");
  }

  else if (value.includes("project")) {
    setSuggestion("Complete project module");
  }

  else if (value.includes("assignment")) {
    setSuggestion("Finish assignment before deadline");
  }

  else if (value.includes("practice")) {
    setSuggestion("Practice for 1 hour daily");
  }

  else if (value.includes("work")) {
    setSuggestion("Complete work before evening");
  }

  else if (value.includes("coding")) {
    setSuggestion("Practice coding for 2 hours");
  }

  else if (value.includes("exam")) {
    setSuggestion("Revise important topics");
  }

  else {
    setSuggestion("Stay productive today");
  }
};

 const addTask = async () => {

  const { error } = await supabase
    .from("tasks")
    .insert([
      {
        taskName: taskTitle,
        status: "Pending",
        date: taskDate
      }
    ]);

  if (error) {

    console.log(error);

    alert("Error adding task");

  } else {

    alert("Task added successfully");

    fetchTasks();
  }

  setTaskTitle("");
  setTaskDate("");
};

const updateTask = async (id) => {
  const { error } = await supabase
    .from("tasks")
    .update({ taskName: editingText })
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("Update failed");
  } else {
    fetchTasks();
    setEditingId(null);
  }
};

const deleteTask = async (id) => {

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("Error deleting task");
  } else {
    alert("Task deleted successfully");
    fetchTasks();
  }
};
const completeTask = async (id) => {
  const { error } = await supabase
    .from("tasks")
    .update({ status: "Completed" })
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("Error updating task");
  } else {
    fetchTasks();
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

 <input
  type="text"
  placeholder="Task Title"
  value={taskTitle}
  onChange={(e) => {
    setTaskTitle(e.target.value);
    generateSuggestion(e.target.value);
  }}
/>
{suggestion && (
  <p style={{ color: "green", marginTop: "10px" }}>
    AI Suggestion: {suggestion}
  </p>
)}
  <textarea placeholder="Task Description"></textarea>

  <input
    type="date"
    value={taskDate}
    onChange={(e) => setTaskDate(e.target.value)}
  />

  <select>
    <option>Low Priority</option>
    <option>Medium Priority</option>
    <option>High Priority</option>
  </select>

  <button onClick={addTask}>Add Task</button>
</div>

<div className="task-list">
  <h2>My Tasks</h2>

  {tasks.map((task, index) => (
    <div key={index} className="task-item">
      {editingId === task.id ? (
  <>
    <input
      value={editingText}
      onChange={(e) => setEditingText(e.target.value)}
    />

    <button onClick={() => updateTask(task.id)}>
      Save
    </button>
  </>
) : (
  <>
    <h3>{task.taskName}</h3>

    <button
      onClick={() => {
        setEditingId(task.id);
        setEditingText(task.taskName);
      }}
    >
      Edit
    </button>
  </>
)}
      <p>Status: {task.status}</p>
      <p>Date: {task.date}</p>

      <button onClick={() => deleteTask(task.id)}>
      Delete
    </button>

<button onClick={() => completeTask(task.id)}>
  Complete
</button>
    </div>
  ))}
</div>
          </main>
        </div>
      )}
    </>
  );
}
export default App;