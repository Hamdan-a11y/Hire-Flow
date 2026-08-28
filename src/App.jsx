import { useState } from "react";

function JobCard({ id, title, company, salary, onDelete }) {
  const [isApplied, setIsApplied] = useState(false);


  return (
    <div className="job-card" style={{
    border: isApplied ? "2px solid #4CAF50" : "1px solid #ccc",
    backgroundColor: isApplied ? "#f0fff4" : "transparent",
    padding: "12px", 
    margin: "10px 0", 
    borderRadius: "8px"
  }}>
      <h3>{title}</h3>
      <p>Company: {company}</p>
      <p>Salary: {salary} / yr</p>
      <button onClick={() => setIsApplied(true)}
      disabled={isApplied}
      >

  {isApplied ? "Applied ✅" : "Apply Now"}
</button>
<button 
  onClick={() => onDelete(id)}
  style={{ marginLeft: "8px", backgroundColor: "#ff4d4f", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
>
  Delete 🗑️
</button>

    </div>
  );
}

export default function App() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const appName = "HireFlow";
  const [jobs, setJobs] = useState([
  { id: 1, title: "Senior React Developer", company: "TechCorp", salary: "$120,000" },
  { id: 2, title: "Full Stack Engineer", company: "CloudFlow", salary: "$135,000" },
  { id: 3, title: "UI/UX Designer", company: "PixelCraft", salary: "$95,000" },
  { id: 4, title: "Backend Node.js Developer", company: "DataPulse", salary: "$125,000" }
]);

  const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(searchTerm.toLowerCase())
);
const handleAddJob = (e) => {
  e.preventDefault(); // 1. Stop page reload

  // Basic check: don't add empty jobs
  if (!title || !company || !salary) return;

  // 2. Create the new job object
  const newJob = {
    id: Date.now(), // Generates a unique number based on the current timestamp
    title: title,
    company: company,
    salary: salary
  };

  // 3. Update the state with the new job
  setJobs([...jobs, newJob]);

  // 4. Clear the input boxes
  setTitle("");
  setCompany("");
  setSalary("");
};

  const handleDeleteJob = (idToDelete) => {
  setJobs(jobs.filter((job) => job.id !== idToDelete));
};
return (
    <div className="app-container">
      <header>
        <h1> {appName}</h1>
        <p>Find your dream job in tech.</p>
        <p>Currently featuring <strong>{filteredJobs.length}</strong> open roles in </p>
      </header>
      
      <main>
        <form onSubmit={handleAddJob} style={{ border: "1px dashed #999", padding: "16px", borderRadius: "8px", margin: "20px 0" }}>

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
        <input
        type="text"
        placeholder="Search job titles (e.g. React Developer)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>Searching for: <strong>{searchTerm}</strong></p>

        <button>Search</button>

        <section className="job-list">
          {filteredJobs.length === 0 && (
    <p>No jobs found matching "{searchTerm}".</p>
  )}
          {filteredJobs.map((job) =>(
            <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            salary={job.salary}
            onDelete={handleDeleteJob}
            />
          ))}
        </section>
      </main>
    </div>
  );
}