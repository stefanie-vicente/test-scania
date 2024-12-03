"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TdsDivider } from "@scania/tegel-react";
import { formatDate } from "@/app/utils/helpers";

dayjs.extend(relativeTime);

const CommitList = ({
  data = [],
  userImg = "https://github.com/favicon.ico",
}) => {
  return (
    <section>
      {Object.entries(data)?.map(([date, commits]) => (
        <article key={date}>
          <h3>{formatDate(date)}</h3>
          {commits?.map((commit) => (
            <div key={commit.sha}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <img
                  src={userImg}
                  alt="author"
                  width="40"
                  height="40"
                  style={{ borderRadius: "50px", marginRight: "10px" }}
                />
                <div>
                  <p>{commit.commit.message}</p>
                  <p>
                    {commit.commit.author.name} authored{" "}
                    <time>{dayjs(commit.commit.author.date).fromNow()}</time>
                  </p>
                </div>
              </div>
              <TdsDivider orientation="horizontal" />
            </div>
          ))}
        </article>
      ))}
    </section>
  );
};

export default CommitList;
