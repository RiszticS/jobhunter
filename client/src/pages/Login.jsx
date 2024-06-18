import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useAuthenticateUserMutation } from "../services/api";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [authenticateUser] = useAuthenticateUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authResponse = await authenticateUser({
        strategy: "local",
        email,
        password,
      }).unwrap();
      
      // Token tárolása
      localStorage.setItem('authToken', authResponse.accessToken);

      dispatch(
        login({
          id: authResponse.user.id,
          email: authResponse.user.email,
          fullname: authResponse.user.fullname,
          role: authResponse.user.role,
        })
      );
      navigate("/profile");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div>
      <nav className="navbar bg-white mb-5" style={{ height: "100px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ fontSize: "24px" }}>Bejelentkezés</span>
        </div>
      </nav>
      <div className="d-flex justify-content-center  vh-100">
        <div className="col-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Jelszó</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn btn-primary w-50 btn-md">
                <FaLock className="me-2" /> Bejelentkezés
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
