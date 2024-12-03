"use client";

import { TdsBlock } from "@scania/tegel-react";

const DashboardSummary = ({ data }) => {
  const { projects, totalCommits, followers, following } = data;

  return (
    <div>
      <h4>Summary</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        <TdsBlock>
          <p>Number of Projects</p>
          <h1 className="tds-expressive-headline-01">{projects}</h1>
        </TdsBlock>
        <TdsBlock>
          <p>Total Commits This Year</p>
          <h1 className="tds-expressive-headline-01">
            {totalCommits.toLocaleString()}
          </h1>
        </TdsBlock>
        <TdsBlock>
          <p>Followers</p>
          <h1 className="tds-expressive-headline-01">{followers}</h1>
        </TdsBlock>
        <TdsBlock>
          <p>Following</p>
          <h1 className="tds-expressive-headline-01">{following}</h1>
        </TdsBlock>
      </div>
    </div>
  );
};

export default DashboardSummary;
