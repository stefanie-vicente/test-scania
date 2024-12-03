export const getTotalCommits = async (repos, headers) => {
  let totalCommits = 0;
  for (const repo of repos) {
    if (repo.size === 0) {
      console.log(`Repository ${repo.name} is empty.`);
      continue;
    }
    try {
      const commitsResponse = await axios.get(`${repo.url}/commits`, {
        headers,
      });
      totalCommits += commitsResponse.data.length;
    } catch (error) {
      console.error(`Error fetching total commits for repo ${repo.name}`);
    }
  }
  return totalCommits;
};

export const groupCommitsByDate = (commits) => {
  const grouped = {};
  commits.forEach((commit) => {
    const date = new Date(commit.commit.author.date).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(commit);
  });
  return grouped;
};
