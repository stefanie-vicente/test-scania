"use client";

import { TdsBlock } from "@scania/tegel-react";

const DashboardSummary = ({ data }) => {
  return (
    <div>
      <p className="tds-body-01">Summary</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <TdsBlock>
          <p>Number of projects</p>
          <h1 className="tds-expressive-headline-01">{data.projects}</h1>
        </TdsBlock>
        <TdsBlock>
          <p>Total commits this year</p>
          <h1 className="tds-expressive-headline-01">
            {data.totalCommits.toLocaleString()}
          </h1>
        </TdsBlock>
        <TdsBlock>
          <p>Followers</p>
          <h1 className="tds-expressive-headline-01">{data.followers}</h1>
        </TdsBlock>
        <TdsBlock>
          <p>Following</p>
          <h1 className="tds-expressive-headline-01">{data.following}</h1>
        </TdsBlock>
      </div>
    </div>
  );
};

export default DashboardSummary;
