import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetUserInfoQuery,
  useGetUserExperiencesQuery,
  useModifyExperienceMutation,
  useGetJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "../services/api";

const JobSeekerProfile = ({
  user,
  experiences,
  isLoading,
  handleEdit,
  handleSave,
  editingExperienceId,
  experienceData,
  setExperienceData,
}) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <nav
        className="navbar bg-white mb-5"
        style={{ height: "100px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ fontSize: "24px" }}>
            Profilom
          </span>
        </div>
      </nav>
      <div className="d-flex justify-content-center">
        <div
          className="col-md-8 bg-white"
          style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0, 0.1)" }}
        >
          <h2 className="mt-4 p-4">Személyes adataim</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Név:</td>
                  <td>{user?.fullname}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Státusz:</td>
                  <td>{user?.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="mt-4 p-4">Tapasztalatok</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                {experiences.map((experience, index) => (
                  <tr
                    key={experience.id}
                    className={index % 2 !== 0 ? "bg-light" : ""}
                  >
                    {editingExperienceId === experience.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={experienceData.company}
                            onChange={(e) =>
                              setExperienceData({
                                ...experienceData,
                                company: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={experienceData.position}
                            onChange={(e) =>
                              setExperienceData({
                                ...experienceData,
                                position: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={experienceData.from}
                            onChange={(e) =>
                              setExperienceData({
                                ...experienceData,
                                from: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={experienceData.to}
                            onChange={(e) =>
                              setExperienceData({
                                ...experienceData,
                                to: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={handleSave}
                          >
                            Mentés
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{experience.company}</td>
                        <td>{experience.title}</td>
                        <td>{experience.interval}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(experience)}
                          >
                            Szerkesztés
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyProfile = ({
  user,
  jobs,
  isLoading,
  handleAddJob,
  handleUpdateJob,
  handleDeleteJob,
}) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <nav
        className="navbar bg-white mb-5"
        style={{ height: "100px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ fontSize: "24px" }}>
            Cégem Profilja
          </span>
        </div>
      </nav>
      <div className="d-flex justify-content-center">
        <div
          className="col-md-8 bg-white"
          style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0, 0.1)" }}
        >
          <h2 className="mt-4 p-4">Cégem adatai</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Név:</td>
                  <td>{user?.fullname}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Státusz:</td>
                  <td>{user?.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="mt-4 p-4">Általam feladott állások</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job.id}
                    className={index % 2 !== 0 ? "bg-light" : ""}
                  >
                    <td>{job.position}</td>
                    <td>
                      {job.salaryFrom} - {job.salaryTo}
                    </td>
                    <td>{job.type}</td>
                    <td>{job.city}</td>
                    <td>{job.homeOffice ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdateJob(job)}
                      >
                        Szerkesztés
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4">
            <button className="btn btn-success" onClick={handleAddJob}>
              Új álláshirdetés hozzáadása
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useGetUserInfoQuery(userId);
  const {
    data: experiencesData,
    isLoading: expLoading,
    refetch: refetchExperiences,
  } = useGetUserExperiencesQuery(userId);
  const {
    data: jobsData,
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useGetJobsQuery();
  const [modifyExperience] = useModifyExperienceMutation();
  const [addJob] = useAddJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [experienceData, setExperienceData] = useState({
    company: "",
    position: "",
    from: "",
    to: "",
  });
  const [localExperiences, setLocalExperiences] = useState([]);
  const [localJobs, setLocalJobs] = useState([]);

  useEffect(() => {
    if (experiencesData && Array.isArray(experiencesData.data)) {
      setLocalExperiences(experiencesData.data);
    } else {
      setLocalExperiences([]);
    }
  }, [experiencesData, userId]);

  useEffect(() => {
    if (jobsData && Array.isArray(jobsData.data)) {
      setLocalJobs(jobsData.data);
    } else {
      setLocalJobs([]);
    }
  }, [jobsData, userId]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  const handleEdit = (experience) => {
    setEditingExperienceId(experience.id);
    setExperienceData({
      company: experience.company,
      position: experience.title,
      from: experience.interval.split("-")[0],
      to: experience.interval.split("-")[1],
    });
  };

  const handleSave = async () => {
    const updatedExperience = {
      id: editingExperienceId,
      company: experienceData.company,
      title: experienceData.position,
      interval: `${experienceData.from}-${experienceData.to}`,
      userId: userId,
    };
    await modifyExperience(updatedExperience);
    refetchExperiences();
    setEditingExperienceId(null);
  };

  const handleAddJob = async () => {
    navigate("/add-job");
  };

  const handleUpdateJob = async (job) => {
    const updatedJob = {
      id: job.id,
      position: job.position,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      type: job.type,
      city: job.city,
      homeOffice: job.homeOffice,
    };

    const response = await updateJob(updatedJob);
    if (!response.error) {
      refetchJobs();
    }
  };

  const handleDeleteJob = async (jobId) => {
    const response = await deleteJob(jobId);
    if (!response.error) {
      refetchJobs();
    }
  };

  if (userLoading || expLoading || jobsLoading) return <div>Loading...</div>;

  return user?.role === "jobseeker" ? (
    <JobSeekerProfile
      user={user}
      experiences={localExperiences}
      isLoading={userLoading || expLoading}
      handleEdit={handleEdit}
      handleSave={handleSave}
      editingExperienceId={editingExperienceId}
      experienceData={experienceData}
      setExperienceData={setExperienceData}
    />
  ) : (
    <CompanyProfile
      user={user}
      jobs={localJobs}
      isLoading={userLoading || jobsLoading}
      handleAddJob={handleAddJob}
      handleUpdateJob={handleUpdateJob}
      handleDeleteJob={handleDeleteJob}
    />
  );
};

export default Profile;
