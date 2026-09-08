import { Star, Heart, Send, Check, MapPin, Banknote, Briefcase, Clock } from "lucide-react";

export default function JobDetails({
  job,
  isSaved,
  isApplied,
  onToggleSave,
  onApplyClick,
}) {
  if (!job) {
    return (
      <div className="indeed-details-pane empty">
        <p>Select a job to view details</p>
      </div>
    );
  }

  return (
    <div className="indeed-details-pane">
      {/* Header Info */}
      <div className="details-header">
        <h1 className="details-title">{job.title}</h1>
        <div className="details-company-line">
          <a href="#" className="details-company-name">
            {job.company}
          </a>
          <span className="company-rating" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
            {job.rating}
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
          </span>
        </div>
        <p className="details-location" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <MapPin size={14} color="#767676" />
          {job.location}
        </p>
      </div>

      {/* Salary & Type info box */}
      <div className="details-pill-box">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Banknote size={16} color="#2557a7" />
          <span className="details-label">Pay:</span>
          <span className="details-value">{job.salary}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Briefcase size={16} color="#2557a7" />
          <span className="details-label">Job type:</span>
          <span className="details-value">{job.type}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="details-actions">
        <button
          className="btn-indeed-apply"
          onClick={() => onApplyClick(job)}
          disabled={isApplied}
          style={{
            backgroundColor: isApplied ? "#10b981" : "#2557a7",
            cursor: isApplied ? "default" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isApplied ? (
            <>
              <Check size={16} /> Applied
            </>
          ) : (
            <>
              <Send size={16} /> Apply now
            </>
          )}
        </button>

        <button
          className={`btn-indeed-save ${isSaved ? "saved" : ""}`}
          onClick={() => onToggleSave(job.id)}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <Heart
            size={16}
            fill={isSaved ? "#2557a7" : "none"}
            color="#2557a7"
          />
          {isSaved ? "Saved" : "Save job"}
        </button>
      </div>

      <hr className="details-divider" />

      {/* Full Description Content */}
      <div className="details-body">
        <h3>Full job description</h3>
        <p>
          <strong>{job.company}</strong> is looking for a talented{" "}
          <strong>{job.title}</strong> to join our high-performing team.
        </p>

        <h4>What you'll do:</h4>
        <ul>
          <li>Build responsive, scalable, and delightful user experiences.</li>
          <li>Collaborate with cross-functional teams of engineers, designers, and product managers.</li>
          <li>Drive technical excellence using modern best practices.</li>
        </ul>

        <h4>Key Skills & Requirements:</h4>
        <div className="details-tags">
          {job.tags &&
            job.tags.map((tag, index) => (
              <span key={index} className="details-tag-badge">
                {tag}
              </span>
            ))}
        </div>

        <h4>Benefits:</h4>
        <ul>
          <li>Comprehensive health, dental, and vision insurance.</li>
          <li>401(k) matching and equity incentives.</li>
          <li>Flexible paid time off and remote work stipend.</li>
        </ul>

        <p className="details-posted-date" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Clock size={13} color="#767676" />
          Posted {job.posted}
        </p>
      </div>
    </div>
  );
}
