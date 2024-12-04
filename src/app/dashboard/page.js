"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardSummary from "@/app/components/DashboardSummary";
import CommitCount from "@/app/components/charts/CommitCount";
import ProgrammingLanguages from "@/app/components/charts/ProgrammingLanguages";
import { fetchDashboardData } from "../utils/requests";
import {
  defineCustomElements,
  TdsHeader,
  TdsHeaderTitle,
  TdsSpinner,
  TdsHeaderItem,
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
          setCommitData(commitData || []);
          setLanguageData(languageData || []);
          setSummary(
            summary || {
              followers: 0,
              following: 0,
              projects: 0,
              totalCommits: 0,
            }
          );
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 900000);
    return () => clearInterval(intervalId);
  }, [session, router]);

  return (
    <div>
      <TdsHeader>
        <TdsHeaderTitle>Dashboard</TdsHeaderTitle>
        <TdsHeaderItem>
          <button onClick={() => router.push("/")}>Home</button>
        </TdsHeaderItem>
        <TdsHeaderItem>
          <button onClick={() => router.push("/commit-list")}>Commits</button>
        </TdsHeaderItem>
        <TdsHeaderItem slot="end">
          <button onClick={() => signOut()}>Sign out</button>
        </TdsHeaderItem>
      </TdsHeader>
      <div style={{ padding: "20px" }}>
        <h1 className="tds-expressive-headline-01">MY GITHUB SUMMARY</h1>
        {loading ? (
          <TdsSpinner variant="standard" />
        ) : (
          <>
            <DashboardSummary data={summary} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "300px",
              }}
            >
              <CommitCount data={commitData} />
              <ProgrammingLanguages data={languageData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
