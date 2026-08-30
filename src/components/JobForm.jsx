import { useState } from "react";

export default function JobForm({ onAddJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !company || !salary) return;

    // Call the parent function and pass the new job object
    onAddJob({
      id: Date.now(),
      title: title,
      company: company,
      salary: salary,
    });

    // Clear inputs
    setTitle("");
    setCompany("");
    setSalary("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px dashed #999",
        padding: "16px",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <h3>Post a New Job</h3>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salary (e.g. $110,000)"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button type="submit">Post Job</button>
    </form>
  );
}
