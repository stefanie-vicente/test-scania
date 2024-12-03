import axios from "axios";

const gitHubRequest = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    throw error;
  }
};

const fetchUserData = (headers) =>
  gitHubRequest("https://api.github.com/user", headers);

const fetchRepositories = async (headers) => {
  const reposResponse = await gitHubRequest(
    "https://api.github.com/user/repos",
    headers
  );
  const repos = reposResponse.filter((repo) => !repo.fork);

  if (repos.length === 0) console.log("No non-forked repositories found.");
  return repos;
};

const isEmptyRepo = (repo) => {
  if (repo.size === 0) {
    console.log(`Repository ${repo.name} is empty.`);
    return true;
  }
  return false;
};

export const fetchTotalCommits = async (repos, headers) => {
  let totalCommits = 0;
  for (const repo of repos) {
    if (isEmptyRepo(repo)) continue;
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

export const fetchCommitsList = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const repos = await fetchRepositories(headers);
    if (repos.length === 0) return;

    const allCommits = [];
    for (const repo of repos) {
      if (isEmptyRepo(repo)) continue;
      try {
        const commitsResponse = await axios.get(`${repo.url}/commits`, {
          headers,
        });
        allCommits.push(...commitsResponse.data);
      } catch (error) {
        console.error(`Error fetching commits for repo ${repo.name}`);
      }
    }
    return allCommits;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
};

export const fetchCommitsFrequency = async (repos, headers) => {
  const commitFrequencies = Array(12).fill(0);

  for (const repo of repos) {
    if (isEmptyRepo(repo)) continue;
    try {
      const owner = repo.owner.login;
      const repoName = repo.name;
      const url = `https://api.github.com/repos/${owner}/${repoName}/stats/commit_activity`;
      const weeklyCommitActivity = await gitHubRequest(url, headers);

      weeklyCommitActivity.forEach((week) => {
        const weekDate = new Date(week.week * 1000);
        const month = weekDate.getMonth();
        commitFrequencies[month] += week.total;
      });
    } catch (error) {
      console.error(`Error fetching commit activity for repo ${repo.name}`);
    }
  }

  return commitFrequencies;
};

export const fetchLanguages = async (repos, headers) => {
  const languageCounts = {};
  for (const repo of repos) {
    try {
      const languages = await gitHubRequest(repo.languages_url, headers);
      Object.entries(languages).forEach(([language, count]) => {
        languageCounts[language] = (languageCounts[language] || 0) + count;
      });
    } catch (error) {
      console.error(`Error fetching languages for repo ${repo.name}`);
    }
  }

  return Object.entries(languageCounts).map(([language, count]) => ({
    language,
    count,
  }));
};

export const fetchDashboardData = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const repos = await fetchRepositories(headers);
    if (repos.length === 0) return;

    const repoCommits = await fetchCommitsFrequency(repos, headers);
    const languages = await fetchLanguages(repos, headers);
    const userData = await fetchUserData(headers);

    return {
      commitData: repoCommits,
      languageData: languages,
      summary: {
        followers: userData.followers,
        following: userData.following,
        projects: repos.length,
        totalCommits: await fetchTotalCommits(repos, headers),
      },
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
};
