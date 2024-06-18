import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation, useAuthenticateUserMutation, useAddExperienceMutation } from "../services/api";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [authenticateUser] = useAuthenticateUserMutation();
  const [addExperience] = useAddExperienceMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [experiences, setExperiences] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Regisztráció
      const user = await registerUser({
        email,
        password,
        role,
        fullname,
      }).unwrap();

      // Bejelentkezés
      const authResponse = await authenticateUser({
        strategy: "local",
        email,
        password,
      }).unwrap();

      // Token tárolása
      localStorage.setItem('authToken', authResponse.accessToken);

      // Tapasztalatok hozzáadása, ha a felhasználó munkavállaló
      if (role === "jobseeker" && experiences) {
        const experienceArray = experiences.split("\n").map((exp) => {
          const [company, title, interval] = exp.split(";");
          return { company, title, interval };
        });

        for (const exp of experienceArray) {
          try {
            await addExperience(exp).unwrap();
          } catch (err) {
            console.error("Failed to add experience:", err);
          }
        }
      }

      // Átirányítás a profil oldalra
      navigate("/login");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div>
      <nav className="navbar bg-white mb-5" style={{ height: "100px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ fontSize: "24px" }}>Regisztráció</span>
        </div>
      </nav>
      <div className="d-flex justify-content-center  vh-100">
        <div className="col-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Jelszó
              </label>
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
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Teljes név
              </label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Profil típus
              </label>
              <select
                className="form-select"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="jobseeker">Munkavállaló</option>
                <option value="company">Munkáltató</option>
              </select>
            </div>
            {role === "jobseeker" && (
              <div className="mb-3">
                <label htmlFor="experiences" className="form-label">
                  Tapasztalatok (soronként)
                </label>
                <textarea
                  className="form-control"
                  id="experiences"
                  rows="3"
                  value={experiences}
                  onChange={(e) => setExperiences(e.target.value)}
                  placeholder="Cég;Pozíció;Időtartam (pl. 2021-2022)"
                />
              </div>
            )}
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn btn-primary w-50  btn-md">
                Regisztráció
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
