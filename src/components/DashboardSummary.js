"use client";

const DashboardSummary = ({ data }) => {
  return (
    <div>
      <div>
        <h2>Number of projects</h2>
        <h3>{data.projects}</h3>
      </div>
      <div>
        <h2>Total commits this year</h2>
        <h3>{data.totalCommits.toLocaleString()}</h3>
      </div>
      <div>
        <h2>Followers</h2>
        <h3>{data.followers}</h3>
      </div>
      <div>
        <h2>Following</h2>
        <h3>{data.following}</h3>
      </div>
    </div>
  );
};

export default DashboardSummary;
