"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { defineCustomElements, TdsButton } from "@scania/tegel-react";

defineCustomElements();

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) return null;

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
      <h1 className="tds-expressive-headline-01">Github Insights</h1>
      <TdsButton
        type="button"
        variant="primary"
        size="lg"
        onClick={() => signIn("github", { callback: "/" })}
        text="Sign in with Github"
      ></TdsButton>
    </div>
  );
}
