"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
    // if !session push to /login
  }, [session, router]);

  return (
    <div>
      <h2>GitHub Insights</h2>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  );
}
