import { useState } from "react";

export default function JobDetails({ job, isSaved, onToggleSave }) {
  const [isApplied, setIsApplied] = useState(false);

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
          <span className="company-rating">
            {job.rating} <span className="company-stars">★</span>
          </span>
        </div>
        <p className="details-location">{job.location}</p>
      </div>

      {/* Salary & Type info box */}
      <div className="details-pill-box">
        <div>
          <span className="details-label">Pay: </span>
          <span className="details-value">{job.salary}</span>
        </div>
        <div>
          <span className="details-label">Job type: </span>
          <span className="details-value">{job.type}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="details-actions">
        <button
          className="btn-indeed-apply"
          onClick={() => setIsApplied(true)}
          disabled={isApplied}
        >
          {isApplied ? "Applied ✓" : "Apply now 🚀"}
        </button>

        <button
          className={`btn-indeed-save ${isSaved ? "saved" : ""}`}
          onClick={() => onToggleSave(job.id)}
        >
          {isSaved ? "♥ Saved" : "♡ Save job"}
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

        <p className="details-posted-date">Posted {job.posted}</p>
      </div>
    </div>
  );
}
