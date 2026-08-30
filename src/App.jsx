import { useState } from "react";
import JobCard from "./components/JobCard";
import JobForm from "./components/JobForm";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "Stripe",
      location: "Remote (US/EU)",
      type: "Full-time",
      salary: "$145,000 - $175,000",
      tags: ["React", "TypeScript", "Tailwind"],
      posted: "2d ago",
      logoBg: "#635bff",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Airbnb",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      tags: ["React", "Node.js", "GraphQL"],
      posted: "1d ago",
      logoBg: "#ff5a5f",
    },
    {
      id: 3,
      title: "Product Designer (UI/UX)",
      company: "Figma",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      tags: ["UI/UX", "Design Systems", "Figma"],
      posted: "3d ago",
      logoBg: "#a259ff",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "Datadog",
      location: "New York, NY",
      type: "Contract",
      salary: "$120,000 - $150,000",
      tags: ["Go", "Node.js", "AWS"],
      posted: "5h ago",
      logoBg: "#6320ee",
    },
  ]);

  // Filter jobs by both Title/Company AND Location
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = job.location
      .toLowerCase()
      .includes(locationTerm.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]); // Add new job at the top
    setShowForm(false); // Close form after posting
  };

  const handleDeleteJob = (idToDelete) => {
    setJobs(jobs.filter((job) => job.id !== idToDelete));
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Navbar */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>💼</span>
          <h1 style={{ margin: 0, fontSize: "22px", color: "#0f172a", fontWeight: "800" }}>
            Hire<span style={{ color: "#2563eb" }}>Flow</span>
          </h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: showForm ? "#64748b" : "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {showForm ? "✕ Close Form" : "+ Post a Job"}
        </button>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
        
        {/* Hero Title */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "32px", color: "#0f172a", margin: "0 0 8px 0" }}>
            Find your next dream role
          </h2>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Discover top tech jobs at companies building the future.
          </p>
        </div>

        {/* Collapsible Job Post Form */}
        {showForm && (
          <div style={{ marginBottom: "24px" }}>
            <JobForm onAddJob={handleAddJob} />
          </div>
        )}

        {/* Dual Search Bar: What & Where */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Job title, skill, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 240px",
              padding: "12px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            type="text"
            placeholder="📍 Location or 'Remote'..."
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
            style={{
              flex: "1 1 200px",
              padding: "12px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Results Counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <p style={{ color: "#475569", fontWeight: "600", fontSize: "15px" }}>
            Showing <strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? "job" : "jobs"}
          </p>
        </div>

        {/* Job List */}
        <section className="job-list">
          {filteredJobs.length === 0 ? (
            <div
              style={{
                backgroundColor: "#fff",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px dashed #cbd5e1",
                color: "#64748b",
              }}
            >
              <p style={{ fontSize: "28px", margin: "0 0 10px 0" }}>🔍</p>
              <p style={{ fontWeight: "600", fontSize: "16px" }}>No jobs match your criteria.</p>
              <p style={{ fontSize: "14px", marginTop: "4px" }}>Try clearing or adjusting your search terms.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} {...job} onDelete={handleDeleteJob} />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
