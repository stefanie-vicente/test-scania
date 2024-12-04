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
  try {
    const repos = await gitHubRequest(
      "https://api.github.com/user/repos",
      headers
    );
    const nonForkedRepos = repos?.filter((repo) => !repo.fork);
    if (nonForkedRepos.length === 0)
      console.log("No non-forked repositories found.");
    return nonForkedRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

const isEmptyRepo = (repo) => repo.size === 0;

const fetchTotalCommits = async (repos, headers) => {
  const commitCounts = await Promise.all(
    repos?.map(async (repo) => {
      if (isEmptyRepo(repo)) {
        console.log(`Repository ${repo.name} is empty.`);
        return 0;
      }
      try {
        const commits = await gitHubRequest(`${repo.url}/commits`, headers);
        return commits.length;
      } catch (error) {
        console.error(`Error fetching commits for repo ${repo.name}:`, error);
        return 0;
      }
    })
  );
  return commitCounts.reduce((total, count) => total + count, 0);
};

export const fetchCommitsList = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const repos = await fetchRepositories(headers);

    if (repos.length === 0) return [];

    const allCommits = await Promise.all(
      repos?.map(async (repo) => {
        if (isEmptyRepo(repo)) return [];
        try {
          const commits = await gitHubRequest(`${repo.url}/commits`, headers);
          return commits;
        } catch (error) {
          console.error(`Error fetching commits for repo ${repo.name}:`, error);
          return [];
        }
      })
    );

    return allCommits.flat();
  } catch (error) {
    console.error("Error fetching commits list:", error);
  }
};

const fetchCommitsFrequency = async (repos, headers) => {
  const commitFrequencies = Array(12).fill(0);

  const activityData = await Promise.all(
    repos?.map(async (repo) => {
      if (isEmptyRepo(repo)) return [];
      try {
        const owner = repo.owner.login;
        const repoName = repo.name;
        const url = `https://api.github.com/repos/${owner}/${repoName}/stats/commit_activity`;
        return gitHubRequest(url, headers);
      } catch (error) {
        console.error(
          `Error fetching commit activity for repo ${repo.name}:`,
          error
        );
        return [];
      }
    })
  );

  activityData &&
    activityData?.forEach((weeklyCommitActivity) => {
      weeklyCommitActivity.length > 0 &&
        weeklyCommitActivity?.forEach((week) => {
          const weekDate = new Date(week.week * 1000);
          const month = weekDate.getMonth();
          commitFrequencies[month] += week.total;
        });
    });

  return commitFrequencies;
};

const fetchLanguages = async (repos, headers) => {
  const languageCounts = {};

  const languageData = await Promise.all(
    repos?.map(async (repo) => {
      try {
        return gitHubRequest(repo.languages_url, headers);
      } catch (error) {
        console.error(`Error fetching languages for repo ${repo.name}:`, error);
        return {};
      }
    })
  );

  languageData &&
    languageData?.forEach((languages) => {
      Object.entries(languages)?.forEach(([language, count]) => {
        languageCounts[language] = (languageCounts[language] || 0) + count;
      });
    });

  return Object.entries(languageCounts)?.map(([language, count]) => ({
    language,
    count,
  }));
};

export const fetchDashboardData = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const repos = await fetchRepositories(headers);
    if (repos.length === 0) return;

    const [repoCommits, languages, userData, totalCommits] = await Promise.all([
      fetchCommitsFrequency(repos, headers),
      fetchLanguages(repos, headers),
      fetchUserData(headers),
      fetchTotalCommits(repos, headers),
    ]);

    return {
      commitData: repoCommits,
      languageData: languages,
      summary: {
        followers: userData.followers,
        following: userData.following,
        projects: repos.length,
        totalCommits,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};
