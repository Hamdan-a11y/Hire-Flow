import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import JobForm from "./components/JobForm";
import JobDetails from "./components/JobDetails";
import ApplyModal from "./components/ApplyModal";

const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote in San Francisco, CA",
    type: "Full-time",
    salary: "$145,000 - $175,000 a year",
    tags: ["React", "TypeScript", "GraphQL"],
    posted: "2 days ago",
    rating: "4.8",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $160,000 a year",
    tags: ["React", "Node.js", "Tailwind"],
    posted: "1 day ago",
    rating: "4.6",
  },
  {
    id: 3,
    title: "Product Designer (UI/UX)",
    company: "Figma",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $140,000 a year",
    tags: ["Figma", "Design Systems", "Prototyping"],
    posted: "3 days ago",
    rating: "4.9",
  },
  {
    id: 4,
    title: "Backend Node.js Engineer",
    company: "Datadog",
    location: "New York, NY",
    type: "Contract",
    salary: "$120,000 - $150,000 a year",
    tags: ["Node.js", "AWS", "Docker"],
    posted: "5 hours ago",
    rating: "4.4",
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  // 1. Jobs state with localStorage persistence
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("hireflow_jobs");
    return saved ? JSON.parse(saved) : DEFAULT_JOBS;
  });

  // 2. Saved Bookmarks state
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem("hireflow_saved_ids");
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Applied Jobs state
  const [appliedJobIds, setAppliedJobIds] = useState(() => {
    const saved = localStorage.getItem("hireflow_applied_ids");
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Modal state (holds job object to apply to, or null if closed)
  const [applyingJob, setApplyingJob] = useState(null);

  const [selectedJobId, setSelectedJobId] = useState(1);
  const [activeTab, setActiveTab] = useState("find"); // "find" | "saved" | "applied"

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("hireflow_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("hireflow_saved_ids", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem("hireflow_applied_ids", JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  // Toggle Bookmark
  const handleToggleSave = (id) => {
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jobId) => jobId !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  // Submit Application
  const handleSubmitApplication = (jobId) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds([...appliedJobIds, jobId]);
    }
  };

  // Filter jobs by Tab, Search, Location, and Type
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "saved" && !savedJobIds.includes(job.id)) {
      return false;
    }
    if (activeTab === "applied" && !appliedJobIds.includes(job.id)) {
      return false;
    }

    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = job.location
      .toLowerCase()
      .includes(locationTerm.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      job.type.toLowerCase() === selectedType.toLowerCase() ||
      (selectedType === "Remote" && job.location.toLowerCase().includes("remote"));

    return matchesSearch && matchesLocation && matchesType;
  });

  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) || filteredJobs[0] || null;

  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);
    setShowForm(false);
  };

  const handleDeleteJob = (idToDelete) => {
    const updated = jobs.filter((job) => job.id !== idToDelete);
    setJobs(updated);
    setSavedJobIds(savedJobIds.filter((id) => id !== idToDelete));
    setAppliedJobIds(appliedJobIds.filter((id) => id !== idToDelete));
    if (selectedJobId === idToDelete && updated.length > 0) {
      setSelectedJobId(updated[0].id);
    }
  };

  return (
    <div>
      {/* 1. Indeed Top Navbar */}
      <nav className="indeed-nav">
        <div className="nav-left">
          <a href="#" className="indeed-logo" onClick={() => setActiveTab("find")}>
            indeed
          </a>
          <ul className="nav-links">
            <li>
              <a
                href="#"
                className={`nav-link ${activeTab === "find" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("find");
                }}
              >
                Find jobs
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link ${activeTab === "saved" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("saved");
                }}
              >
                ♥ Saved ({savedJobIds.length})
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link ${activeTab === "applied" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("applied");
                }}
              >
                ✓ Applied ({appliedJobIds.length})
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <button
            className="btn-post-job"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Close Form" : "Employers / Post Job"}
          </button>
        </div>
      </nav>

      {/* 2. Search Section (What & Where) */}
      <header className="search-hero">
        <div className="search-box-wrapper">
          <div className="search-field">
            <label>What</label>
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label>Where</label>
            <input
              type="text"
              placeholder='City, state, zip code, or "remote"'
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
            />
          </div>

          <button className="btn-find-jobs">Find jobs</button>
        </div>

        {/* 3. Filter Bar (Pills) */}
        <div className="filter-bar">
          {["All", "Remote", "Full-time", "Contract"].map((type) => {
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                className={`indeed-pill ${isActive ? "active" : ""}`}
                onClick={() => setSelectedType(type)}
              >
                {type} {type !== "All" && "▾"}
              </button>
            );
          })}
        </div>
      </header>

      {/* 4. Main 2-Column Split Feed */}
      <main className="feed-container">
        {showForm && (
          <div style={{ marginBottom: "24px" }}>
            <JobForm onAddJob={handleAddJob} />
          </div>
        )}

        <div className="feed-header">
          <span>
            {activeTab === "saved" && (
              <>
                <strong>Saved Jobs</strong> ({filteredJobs.length})
              </>
            )}
            {activeTab === "applied" && (
              <>
                <strong>Applied Jobs</strong> ({filteredJobs.length})
              </>
            )}
            {activeTab === "find" && (
              <>
                Showing <strong>{filteredJobs.length}</strong> jobs based on your search
              </>
            )}
          </span>
        </div>

        {/* 2-Column Split View */}
        <div className="indeed-split-layout">
          {/* Left Column: Job Cards List */}
          <section className="job-list">
            {filteredJobs.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "48px 24px",
                  borderRadius: "8px",
                  border: "1px solid #d4d2d0",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontSize: "18px", color: "#2d2d2d", marginBottom: "8px" }}>
                  {activeTab === "saved"
                    ? "You haven't saved any jobs yet"
                    : activeTab === "applied"
                    ? "You haven't applied to any jobs yet"
                    : "No jobs match your search"}
                </h3>
                <p style={{ color: "#595959", fontSize: "14px" }}>
                  {activeTab === "saved"
                    ? "Click the heart icon on any job card to save it."
                    : activeTab === "applied"
                    ? "Click 'Apply now' on any job to submit an application."
                    : "Try different keywords or remove filters."}
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  isSelected={job.id === selectedJobId}
                  isSaved={savedJobIds.includes(job.id)}
                  isApplied={appliedJobIds.includes(job.id)}
                  onSelect={setSelectedJobId}
                  onToggleSave={handleToggleSave}
                  onApplyClick={setApplyingJob}
                  onDelete={handleDeleteJob}
                />
              ))
            )}
          </section>

          {/* Right Column: Sticky Job Details Pane */}
          {filteredJobs.length > 0 && selectedJob && (
            <aside>
              <JobDetails
                job={selectedJob}
                isSaved={savedJobIds.includes(selectedJob.id)}
                isApplied={appliedJobIds.includes(selectedJob.id)}
                onToggleSave={handleToggleSave}
                onApplyClick={setApplyingJob}
              />
            </aside>
          )}
        </div>
      </main>

      {/* 5. Popup Apply Modal */}
      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
          onSubmitApplication={handleSubmitApplication}
        />
      )}
    </div>
  );
}
