"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardSummary from "@/components/DashboardSummary";
import CommitCount from "@/components/charts/CommitCount";
import ProgrammingLanguages from "@/components/charts/ProgrammingLanguages";
import { fetchGitHubData } from "./requests";

// add logout button
export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [commitData, setCommitData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [summary, setSummary] = useState({
    followers: 0,
    following: 0,
    projects: 0,
    totalCommits: 0,
  });

  useEffect(() => {
    if (!session) {
      // push to login
      router.push("/");
      return;
    }

    const fetchData = async () => {
      if (session?.accessToken) {
        try {
          const { commitData, languageData, summary } = await fetchGitHubData(
            session.accessToken
          );
          setCommitData(commitData);
          setLanguageData(languageData);
          setSummary(summary);
        } catch (error) {
          console.error("Failed to fetch GitHub data:", error);
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 900000);
    return () => clearInterval(intervalId);
  }, [session, router]);

  return (
    <div>
      <h2>MY GITHUB SUMMARY</h2>
      <DashboardSummary data={summary} />
      <CommitCount data={commitData} />
      <ProgrammingLanguages data={languageData} />
    </div>
  );
}
