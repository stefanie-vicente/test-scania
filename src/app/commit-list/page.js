"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchCommitsList } from "../utils/requests";
import { groupCommitsByDate } from "../utils/helpers";
import CommitList from "@/components/CommitList";

export default function MyCommits() {
  const { data: session } = useSession();
  const router = useRouter();
  const [commits, setCommits] = useState([]);
  const [filteredCommits, setFilteredCommits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(session);
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

  const groupedCommits = groupCommitsByDate(filteredCommits);

  return (
    <div>
      <header>
        <h1>My Commits</h1>
        <input
          type="text"
          placeholder="Search by message or date"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>

      <CommitList data={groupedCommits} />
    </div>
  );
}
