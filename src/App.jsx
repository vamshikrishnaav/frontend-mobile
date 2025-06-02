import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Order from "./pages/Order";
import RegistrationPage from "./pages/Registration.jsx";
import LoginPage from "./pages/LoginPage.jsx"; // ✅ Import LoginPage
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useEffect } from "react";

export default function App() {
  const [cart, setCart] = useState({});
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {}, []);

  const updateCart = (id, delta) => {
    setCart((prev) => {
      const updated = { ...prev };
      updated[id] = (updated[id] || 0) + delta;
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={<RegistrationPage setUserDetails={setUserDetails} />}
        />
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* ✅ Login route added */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage cart={cart} updateCart={updateCart} />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order
                cart={cart}
                updateCart={updateCart}
                userDetails={userDetails}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
