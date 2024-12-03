"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardSummary from "@/components/DashboardSummary";
import CommitCount from "@/components/charts/CommitCount";
import ProgrammingLanguages from "@/components/charts/ProgrammingLanguages";
import { fetchDashboardData } from "../utils/requests";
import {
  defineCustomElements,
  TdsHeader,
  TdsHeaderTitle,
} from "@scania/tegel-react";

defineCustomElements();

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      if (session?.accessToken) {
        try {
          setLoading(true);
          const { commitData, languageData, summary } =
            await fetchDashboardData(session.accessToken);
          setCommitData(commitData);
          setLanguageData(languageData);
          setSummary(summary);
        } catch (error) {
          console.error("Failed to fetch GitHub data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 900000);
    return () => clearInterval(intervalId);
  }, [session, router]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <TdsHeader>
        <TdsHeaderTitle>Dashboard</TdsHeaderTitle>
      </TdsHeader>
      <h1 className="tds-expressive-headline-01">MY GITHUB SUMMARY</h1>
      <DashboardSummary data={summary} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CommitCount data={commitData} />
        <ProgrammingLanguages data={languageData} />
      </div>
    </div>
  );
}
