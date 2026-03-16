import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Product/Navbar";
import { AuthProvider } from "./Product/AuthContext";

import Login from "./Login";
import RDUser from "./Product/RDUser";
import RDPassbook from "./Product/RDPassbook";
import ReportPage from "./Product/ReportPage";
import FinanceHome from "./Product/Home";

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false,
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar show only after login */}
        {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route
            path="/homepage"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <FinanceHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/RDUser"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RDUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/RDPassbook"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RDPassbook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Reports"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ReportPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
