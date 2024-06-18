import React from "react";
import { useParams } from "react-router-dom";
import { useGetJobQuery, useApplyForJobMutation } from "../services/api";

const JobDetail = () => {
  const { jobId } = useParams();
  const { data: job, isLoading } = useGetJobQuery(jobId);
  const [applyForJob] = useApplyForJobMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleApply = async () => {
    try {
      await applyForJob({ jobId });
      alert("Jelentkezés sikeres!");
    } catch (err) {
      console.error("Failed to apply: ", err);
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
            {job.company}
          </span>
        </div>
      </nav>
      <div className="d-flex justify-content-center">
        <div
          className="col-md-8 bg-white"
          style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0, 0.1)" }}
        >
          <h2 className="mt-4 p-4">Személyes adataim</h2>
          <button onClick={handleApply}>Jelentkezés</button>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Név:</td>
                  <td>{job.company}</td>
                </tr>
                <tr>
                  <td>Pozíció:</td>
                  <td>{job.position}</td>
                </tr>
                <tr>
                  <td>Leírás:</td>
                  <td>{job.description}</td>
                </tr>
                <tr>
                  <td>Fizetési sáv:</td>
                  <td>
                    {job.salaryFrom} - {job.salaryTo}
                  </td>
                </tr>
                <tr>
                  <td>Foglalkoztatás típusa:</td>
                  <td>{job.type}</td>
                </tr>
                <tr>
                  <td>Település:</td>
                  <td>{job.city}</td>
                </tr>
                <tr>
                  <td>Home Office:</td>
                  <td>{job.homeOffice ? "Igen" : "Nem"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
