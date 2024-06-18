import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddJobMutation, useAddJobUserMutation } from '../services/api';

const AddJob = () => {
  const navigate = useNavigate();
  const [addJob, { isLoading: isAddingJob }] = useAddJobMutation();
  const [addJobUser, { isLoading: isAddingJobUser }] = useAddJobUserMutation();
  const [jobData, setJobData] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: 0,
    salaryTo: 0,
    type: '',
    city: '',
    homeOffice: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addJob(jobData);
      console.log('Job creation response:', response);
      const job = response.data; // Adjust based on actual response structure
      if (!job || !job.id) {
        throw new Error('Invalid job response');
      }
      const userId = localStorage.getItem('userId'); // Assuming the userId is stored in localStorage after login
      await addJobUser({ userId, jobId: job.id });
      navigate('/');
    } catch (error) {
      if (error.data && error.data.message) {
        console.error('Failed to add job:', error.data.message);
      } else {
        console.error('Failed to add job:', error);
      }
    }
  };

  return (
    <div>
      <nav
        className="navbar bg-white mb-5"
        style={{ height: "100px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ fontSize: "24px" }}>
            Álláshirdetés hozzáadása
          </span>
        </div>
      </nav>
      <div className="d-flex justify-content-center  vh-100">
        <div className="col-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Cég neve:
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Pozíció neve:
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={jobData.position}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Leírás:
              </label>
              <textarea
                id="description"
                name="description"
                value={jobData.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salaryFrom" className="form-label">
                Fizetési sáv (tól):
              </label>
              <input
                type="number"
                id="salaryFrom"
                name="salaryFrom"
                value={jobData.salaryFrom}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salaryTo" className="form-label">
                Fizetési sáv (ig):
              </label>
              <input
                type="number"
                id="salaryTo"
                name="salaryTo"
                value={jobData.salaryTo}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Foglalkoztatás formája:
              </label>
              <select
                id="type"
                name="type"
                value={jobData.type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Válasszon...</option>
                <option value="full-time">Teljes állás</option>
                <option value="part-time">Részmunkaidős</option>
                <option value="contract">Szerződéses</option>
                <option value="internship">Gyakornoki</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Település:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={jobData.city}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="homeOffice"
                name="homeOffice"
                checked={jobData.homeOffice}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="homeOffice" className="form-check-label">
                Home office lehetőség
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isAddingJob || isAddingJobUser}
            >
              {(isAddingJob || isAddingJobUser) ? "Hozzáadás..." : "Álláshirdetés hozzáadása"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
