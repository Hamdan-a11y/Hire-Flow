import { useEffect } from "react";
import { X } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="indeed-toast">
      <span>{message}</span>
      <button className="toast-close-btn" onClick={onClose} title="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}
