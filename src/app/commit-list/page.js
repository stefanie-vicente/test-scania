"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { fetchCommitsList } from "../utils/requests";
import CommitList from "@/app/components/CommitList";
import {
  defineCustomElements,
  TdsTextField,
  TdsHeader,
  TdsHeaderTitle,
} from "@scania/tegel-react";

defineCustomElements();

export default function MyCommits() {
  const { data: session } = useSession();
  const router = useRouter();
  const [commits, setCommits] = useState([]);
  const [filteredCommits, setFilteredCommits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }
    const fetchCommits = async () => {
      if (session?.accessToken) {
        try {
          const commitsData = await fetchCommitsList(session.accessToken);
          setCommits(commitsData);
          setFilteredCommits(commitsData);
        } catch (error) {
          console.error("Error fetching commits data", error);
        }
      }
    };

    fetchCommits();
  }, [session]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = commits.filter(
      (commit) =>
        commit.commit.message.toLowerCase().includes(value) ||
        new Date(commit.commit.author.date).toLocaleDateString().includes(value)
    );

    setFilteredCommits(filtered);
  };

  const groupCommitsByDate = (commits) => {
    const grouped = commits.reduce((acc, commit) => {
      const date = dayjs(commit.commit.author.date).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(commit);
      return acc;
    }, {});

    const sortedGrouped = Object.fromEntries(
      Object.entries(grouped).sort(([a], [b]) => dayjs(b).diff(dayjs(a)))
    );

    return sortedGrouped;
  };

  const groupedCommits = groupCommitsByDate(filteredCommits);

  return (
    <div>
      <TdsHeader>
        <TdsHeaderTitle>Commit List</TdsHeaderTitle>
      </TdsHeader>
      <div style={{ padding: "20px" }}>
        <h1 className="tds-expressive-headline-01">My Commits</h1>
        <div style={{ maxWidth: "300px" }}>
          <TdsTextField
            type="text"
            placeholder="Search by message or date"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <CommitList data={groupedCommits} userImg={session?.user?.image} />
      </div>
    </div>
  );
}
