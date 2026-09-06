import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import JobForm from "./components/JobForm";
import JobDetails from "./components/JobDetails";
import ApplyModal from "./components/ApplyModal";
import Toast from "./components/Toast";

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

const getSalaryNumber = (salaryStr = "") => {
  const numbers = salaryStr.replace(/[^0-9]/g, "");
  return numbers ? parseInt(numbers, 10) : 0;
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // 1. Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  // 2. Jobs state with localStorage persistence
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("hireflow_jobs");
    return saved ? JSON.parse(saved) : DEFAULT_JOBS;
  });

  // 3. Saved Bookmarks state
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem("hireflow_saved_ids");
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Applied Jobs state
  const [appliedJobIds, setAppliedJobIds] = useState(() => {
    const saved = localStorage.getItem("hireflow_applied_ids");
    return saved ? JSON.parse(saved) : [];
  });

  // 5. Modal state
  const [applyingJob, setApplyingJob] = useState(null);

  const [selectedJobId, setSelectedJobId] = useState(1);
  const [activeTab, setActiveTab] = useState("find");

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

  // Helper to trigger toast
  const showToast = (message) => {
    setToastMessage(message);
  };

  // Toggle Bookmark with Toast
  const handleToggleSave = (id) => {
    const job = jobs.find((j) => j.id === id);
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jobId) => jobId !== id));
      showToast(`Removed "${job?.title || "Job"}" from Saved Jobs`);
    } else {
      setSavedJobIds([...savedJobIds, id]);
      showToast(`Saved "${job?.title || "Job"}" to bookmarks ♥`);
    }
  };

  // Submit Application with Toast
  const handleSubmitApplication = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds([...appliedJobIds, jobId]);
    }
    showToast(`Application sent to ${job?.company || "Company"}! 🚀`);
  };

  // Add Job with Toast
  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);
    setShowForm(false);
    showToast(`"${newJob.title}" posted successfully! 🎉`);
  };

  // Delete Job with Toast
  const handleDeleteJob = (idToDelete) => {
    const job = jobs.find((j) => j.id === idToDelete);
    const updated = jobs.filter((job) => job.id !== idToDelete);
    setJobs(updated);
    setSavedJobIds(savedJobIds.filter((id) => id !== idToDelete));
    setAppliedJobIds(appliedJobIds.filter((id) => id !== idToDelete));
    if (selectedJobId === idToDelete && updated.length > 0) {
      setSelectedJobId(updated[0].id);
    }
    showToast(`Deleted "${job?.title || "Job"}" 🗑️`);
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

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "salary") {
      return getSalaryNumber(b.salary) - getSalaryNumber(a.salary);
    }
    if (sortBy === "rating") {
      return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
    }
    return b.id - a.id;
  });

  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) || sortedJobs[0] || null;

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

        {/* Results Count & Sort Dropdown */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div className="feed-header" style={{ margin: 0 }}>
            <span>
              {activeTab === "saved" && (
                <>
                  <strong>Saved Jobs</strong> ({sortedJobs.length})
                </>
              )}
              {activeTab === "applied" && (
                <>
                  <strong>Applied Jobs</strong> ({sortedJobs.length})
                </>
              )}
              {activeTab === "find" && (
                <>
                  Showing <strong>{sortedJobs.length}</strong> jobs
                </>
              )}
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#595959" }}>
            <label htmlFor="sort-select" style={{ fontWeight: "600" }}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "6px 10px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#2d2d2d",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="recent">date (most recent)</option>
              <option value="salary">salary (highest first)</option>
              <option value="rating">rating (top companies)</option>
            </select>
          </div>
        </div>

        {/* 2-Column Split View */}
        <div className="indeed-split-layout">
          {/* Left Column: Job Cards List */}
          <section className="job-list">
            {sortedJobs.length === 0 ? (
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
              sortedJobs.map((job) => (
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
          {sortedJobs.length > 0 && selectedJob && (
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

      {/* 6. Floating Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
