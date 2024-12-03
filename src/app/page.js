"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div>
      <h2>GitHub Insights</h2>
      <button onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
      <button onClick={() => router.push("/commit-list")}>
        Go to Commit List
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
