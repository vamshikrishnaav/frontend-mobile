import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../pages/Registration.css"; // You can rename this to Registration.css if needed
const API = import.meta.env.VITE_API;

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !number || !address || !password) {
      return alert("Please fill all fields");
    }

    // You can store password securely on server/backend; not advisable in frontend state
    const user = await axios.post(
      `${API}/api/v1/user/sign-up`,
      {
        name,
        number,
        password,
        address,
      },
      {
        withCredentials: true,
      }
    );

    console.log(user);

    // ✅ Navigate to Login Page after registration
    navigate("/login");
  };

  return (
    <div className="login-page">
      <h2>Register to PizzaOrder</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
      Have an Account? <Link to="/login">Sign In</Link>
    </div>
  );
}
