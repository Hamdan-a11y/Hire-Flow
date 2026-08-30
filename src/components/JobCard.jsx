import { useState } from "react";

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  tags = [],
  posted,
  logoBg = "#4f46e5",
  onDelete,
}) {
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: isApplied ? "2px solid #10b981" : "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px",
        margin: "16px 0",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        textAlign: "left",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      {/* Top Header: Company Avatar + Title + Bookmark */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          {/* Company Avatar Badge */}
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "10px",
              backgroundColor: logoBg,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {company ? company[0] : "🏢"}
          </div>

          <div>
            <h3 style={{ margin: "0 0 4px 0", color: "#1e293b", fontSize: "18px" }}>
              {title}
            </h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px", fontWeight: "500" }}>
              {company} • <span style={{ color: "#0ea5e9" }}>{location}</span>
            </p>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "6px 10px",
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: isSaved ? "#fef3c7" : "#fff",
          }}
          title={isSaved ? "Saved" : "Save Job"}
        >
          {isSaved ? "⭐ Saved" : "☆ Save"}
        </button>
      </div>

      {/* Badges: Salary, Job Type, Posted Time */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "14px 0" }}>
        <span
          style={{
            backgroundColor: "#ecfdf5",
            color: "#059669",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          💰 {salary}
        </span>
        <span
          style={{
            backgroundColor: "#f1f5f9",
            color: "#475569",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        >
          💼 {type}
        </span>
        <span
          style={{
            backgroundColor: "#f8fafc",
            color: "#94a3b8",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        >
          ⏱️ {posted}
        </span>
      </div>

      {/* Tech Stack Tags */}
      {tags.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {tags.map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                padding: "3px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
        <button
          onClick={() => setIsApplied(true)}
          disabled={isApplied}
          style={{
            backgroundColor: isApplied ? "#10b981" : "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 18px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: isApplied ? "default" : "pointer",
            fontSize: "14px",
          }}
        >
          {isApplied ? "Applied ✅" : "Apply Now 🚀"}
        </button>

        <button
          onClick={() => onDelete(id)}
          style={{
            backgroundColor: "transparent",
            color: "#ef4444",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
