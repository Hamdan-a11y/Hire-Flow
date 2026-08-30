import { useState } from "react";

export default function JobForm({ onAddJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !company || !salary || !location) return;

    // Convert comma-separated tags string to array
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onAddJob({
      id: Date.now(),
      title,
      company,
      location,
      type,
      salary,
      tags: tagsArray.length > 0 ? tagsArray : ["React", "JavaScript"],
      posted: "Just now",
      rating: "4.7",
    });

    // Clear inputs
    setTitle("");
    setCompany("");
    setLocation("");
    setSalary("");
    setTagsInput("");
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #2557a7",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d", marginBottom: "16px" }}>
        Post a job on Indeed
      </h3>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: "#2d2d2d" }}>
              Job Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Senior React Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: "#2d2d2d" }}>
              Company Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Google, Stripe"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: "#2d2d2d" }}>
              Location *
            </label>
            <input
              type="text"
              placeholder='e.g. "Remote in New York" or "Austin, TX"'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: "#2d2d2d" }}>
              Job Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#fff",
              }}
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: "#2d2d2d" }}>
              Salary Range *
            </label>
            <input
              type="text"
              placeholder="e.g. $120,000 - $140,000 a year"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: "#2d2d2d" }}>
              Skills / Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. React, TypeScript, GraphQL"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#2557a7",
            color: "#ffffff",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "6px",
          }}
        >
          Post Job Now
        </button>
      </form>
    </div>
  );
}
