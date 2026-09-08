import { Star, Heart, Zap, Check, Trash2, MapPin } from "lucide-react";

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
  isSaved,
  isApplied,
  onSelect,
  onToggleSave,
  onApplyClick,
  onDelete,
}) {
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
            <span className="company-rating" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
              {rating}
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
            </span>
          </div>
          <div className="card-location" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={13} color="#767676" />
            <span>{location}</span>
          </div>
        </div>

        {/* Heart Bookmark Button */}
        <button
          className={`btn-bookmark ${isSaved ? "saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(id);
          }}
          title={isSaved ? "Saved" : "Save job"}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Heart
            size={18}
            fill={isSaved ? "#2557a7" : "none"}
            color={isSaved ? "#2557a7" : "#767676"}
          />
        </button>
      </div>

      {/* Salary & Type Pills */}
      <div className="card-pills-row">
        <span className="card-pill">{salary}</span>
        <span className="card-pill">{type}</span>
      </div>

      {/* Easily Apply Badge */}
      <div className="easy-apply-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {isApplied ? (
          <>
            <Check size={14} color="#10b981" />
            <span style={{ color: "#10b981" }}>Application submitted</span>
          </>
        ) : (
          <>
            <Zap size={14} fill="#2557a7" color="#2557a7" />
            <span>Easily apply</span>
          </>
        )}
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
              e.stopPropagation();
              onApplyClick({ id, title, company, location });
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
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {isApplied ? (
              <>
                <Check size={14} /> Applied
              </>
            ) : (
              "Apply now"
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#949494",
              fontSize: "12px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
