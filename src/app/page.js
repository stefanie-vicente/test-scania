"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { defineCustomElements, TdsButton } from "@scania/tegel-react";

defineCustomElements();

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }
  }, [status, router]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <h1 className="tds-expressive-headline-01">GitHub Insights</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <TdsButton
          onClick={() => router.push("/dashboard")}
          text="Dashboard"
          type="button"
          variant="primary"
          size="lg"
        ></TdsButton>
        <TdsButton
          onClick={() => router.push("/commit-list")}
          text="Commit List"
          type="button"
          variant="primary"
          size="lg"
        ></TdsButton>
        <TdsButton
          text="Sign Out"
          type="button"
          variant="primary"
          size="lg"
          onClick={() => signOut()}
        ></TdsButton>
      </div>
    </div>
  );
}
