"use client";

const CommitList = ({ data }) => {
  return (
    <section>
      {Object.entries(data).map(([date, commits]) => (
        <article key={date}>
          <h2>{date}</h2>
          {commits.map((commit) => (
            <div key={commit.sha}>
              <p>{commit.commit.message}</p>
              <div>
                <img
                  src="https://github.com/favicon.ico"
                  alt="author"
                  width="30"
                  height="30"
                />
                <span>{commit.commit.author.name}</span>
              </div>
              <time>{`${new Date(
                commit.commit.author.date
              ).toLocaleTimeString()} ago`}</time>
            </div>
          ))}
        </article>
      ))}
    </section>
  );
};

export default CommitList;
