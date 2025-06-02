import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../pages/LoginPage.css";

const API = import.meta.env.VITE_API;

export default function LoginPage() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!number || !password) {
      return alert("Please fill all fields");
    }
    // Simulate successful login
    alert("Login successful!");

    const { data } = await axios.post(
      ` ${API}/api/v1/user/sign-in`,
      {
        number,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(data);

    if (data.success) {
      navigate("/");
    } else {
      alert("number/password is wrong please try again");
    }
  };

  return (
    <div className="login-page">
      <h2>Login to PizzaOrder</h2>
      <form onSubmit={handleLogin}>
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      Dont have an account? <Link to="/register">sign up</Link>
    </div>
  );
}
