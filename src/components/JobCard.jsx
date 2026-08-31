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
  rating = "4.5",
  isSelected,
  onSelect,
  onDelete,
}) {
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div
      className={`indeed-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      {/* Top Header: Title + Bookmark Heart */}
      <div className="card-top">
        <div>
          <h2 className="card-job-title">{title}</h2>
          <div className="card-company-line">
            <span>{company}</span>
            <span className="company-rating">
              {rating} <span className="company-stars">★</span>
            </span>
          </div>
          <div className="card-location">{location}</div>
        </div>

        {/* Heart Bookmark Button */}
        <button
          className={`btn-bookmark ${isSaved ? "saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // Don't trigger card selection when clicking heart
            setIsSaved(!isSaved);
          }}
          title={isSaved ? "Saved" : "Save job"}
        >
          {isSaved ? "♥" : "♡"}
        </button>
      </div>

      {/* Salary & Type Pills */}
      <div className="card-pills-row">
        <span className="card-pill">{salary}</span>
        <span className="card-pill">{type}</span>
      </div>

      {/* Easily Apply Badge */}
      <div className="easy-apply-badge">
        <span>⚡</span>
        <span>Easily apply</span>
      </div>

      {/* Snippet Bullet Points */}
      <ul className="card-snippets">
        <li>Work with modern technologies including {tags.join(", ")}.</li>
        <li>Collaborative team environment with competitive benefits.</li>
      </ul>

      {/* Footer: Date posted + Apply Action + Delete */}
      <div className="card-footer-line">
        <span>Active {posted}</span>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Don't trigger card selection when clicking apply
              setIsApplied(true);
            }}
            disabled={isApplied}
            style={{
              backgroundColor: isApplied ? "#10b981" : "#2557a7",
              color: "#ffffff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: isApplied ? "default" : "pointer",
            }}
          >
            {isApplied ? "Applied ✓" : "Apply now"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Don't trigger card selection when deleting
              onDelete(id);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#949494",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
