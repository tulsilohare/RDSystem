import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:8080/login", {
          username,
          password,
        });
        alert(res.data);
      } else {
        await axios.post("http://localhost:8080/register", {
          username,
          password,
        });
        alert("Register Success");
      }
    } catch (err) {
      alert("Backend Error");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f8",
    },
    card: {
      width: "380px",
      padding: "25px",
      borderRadius: "15px",
      background: "#e5e7eb",
      border: "2px solid #2563eb",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    inputBox: {
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "2px solid #60a5fa",
      fontSize: "15px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
    },
    switchBtn: {
      marginTop: "15px",
      width: "100%",
      padding: "10px",
      background: "#10b981",
      border: "none",
      color: "white",
      borderRadius: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputBox}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button style={styles.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button style={styles.switchBtn} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Go Register" : "Go Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
