import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetJobsQuery } from "../services/api";

const Home = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const jobs = data ? data.data : [];
  const [filters, setFilters] = useState({
    salaryFrom: "",
    salaryTo: "",
    type: "",
    city: "",
    homeOffice: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.salaryFrom || job.salaryFrom >= filters.salaryFrom) &&
      (!filters.salaryTo || job.salaryTo <= filters.salaryTo) &&
      (!filters.type || job.type === filters.type) &&
      (!filters.city ||
        job.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.homeOffice || job.homeOffice === filters.homeOffice) &&
      (job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <div>
      <nav
        className="navbar bg-white mb-5"
        style={{ height: "100px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ fontSize: "24px" }}>
            Álláshirdetések
          </span>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-3 row">
          <div className="col-md-2">
            <label className="form-label">
              Fizetési sáv (tól):
              <input
                type="number"
                name="salaryFrom"
                value={filters.salaryFrom}
                onChange={handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-md-2">
            <label className="form-label">
              Fizetési sáv (ig):
              <input
                type="number"
                name="salaryTo"
                value={filters.salaryTo}
                onChange={handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-md-2">
            <label className="form-label">
              Foglalkoztatás típusa:
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Mind</option>
                <option value="full-time">Teljes állás</option>
                <option value="part-time">Részmunkaidős</option>
                <option value="contract">Szerződéses</option>
                <option value="internship">Gyakornoki</option>
              </select>
            </label>
          </div>
          <div className="col-md-2">
            <label className="form-label">
              Település:
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-md-2">
            <label className="form-check-label">
              Home office lehetőség:
              <input
                type="checkbox"
                name="homeOffice"
                checked={filters.homeOffice}
                onChange={handleChange}
                className="form-check-input"
              />
            </label>
          </div>
          <div className="col-md-2">
            <label className="form-label">
              Keresés:
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
              />
            </label>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {filteredJobs.map((job) => (
            <li className="list-group-item" key={job.id}>
              <Link to={`/job/${job.id}`}>
                <h2>{job.position}</h2>
              </Link>
              <p>Cég: {job.company}</p>
              <p>Település: {job.city}</p>
              <p>
                Fizetés: {job.salaryFrom} - {job.salaryTo}
              </p>
              <p>Típus: {job.type}</p>
              <p>Home office: {job.homeOffice ? "Igen" : "Nem"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
