import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      alert("Login Success!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/product");
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleSignup = () => {
    if (!newUsername || !newPassword) {
      alert("Please enter username and password!");
      return;
    }

    const users = getUsers();
    const exists = users.find((u) => u.username === newUsername);

    if (exists) {
      alert("Username already exists!");
      return;
    }

    users.push({ username: newUsername, password: newPassword });
    saveUsers(users);
    alert("Signup success!");
    setShowSignup(false);
    setNewUsername("");
    setNewPassword("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      {!showSignup ? (
        <>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
            Login
          </button>
          <button
            className="btn btn-secondary w-100"
            onClick={() => setShowSignup(true)}
          >
            New User? Signup
          </button>
        </>
      ) : (
        <>
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-success w-100 mb-2" onClick={handleSignup}>
            Signup
          </button>
          <button
            className="btn btn-secondary w-100"
            onClick={() => setShowSignup(false)}
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  );
}
