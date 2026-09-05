import { useState } from "react";

export default function ApplyModal({ job, onClose, onSubmitApplication }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !resumeLink) return;

    onSubmitApplication(job.id, {
      name,
      email,
      phone,
      resumeLink,
      appliedAt: new Date().toLocaleDateString(),
    });

    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "520px",
          padding: "32px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
          textAlign: "left",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicking modal from closing it
      >
        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#2d2d2d", margin: "0 0 4px 0" }}>
              Apply to {job.company}
            </h2>
            <p style={{ fontSize: "14px", color: "#595959", margin: 0 }}>
              {job.title} • <span style={{ color: "#2557a7", fontWeight: "600" }}>{job.location}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#595959",
              padding: "4px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px", color: "#2d2d2d" }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px", color: "#2d2d2d" }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px", color: "#2d2d2d" }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. +1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px", color: "#2d2d2d" }}>
              Portfolio / GitHub / Resume Link *
            </label>
            <input
              type="url"
              required
              placeholder="e.g. https://github.com/janedoe"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #d4d2d0",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #d4d2d0",
                padding: "10px 18px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                color: "#2d2d2d",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                backgroundColor: "#2557a7",
                color: "#ffffff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Submit Application 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
