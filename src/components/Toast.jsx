import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup timer on unmount or message change
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="indeed-toast">
      <span>{message}</span>
      <button className="toast-close-btn" onClick={onClose} title="Dismiss">
        ✕
      </button>
    </div>
  );
}
