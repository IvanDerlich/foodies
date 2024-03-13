import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
        <p>
          <Link href="/meals">Meals</Link>
        </p>
        <p>
          <Link href="/meals/share">Share a Meal</Link>
        </p>
        <p>
          <Link href="/community">Community</Link>
        </p>
        <p>
          <Link href="/meals/milanesas">Milanesas</Link>
        </p>
      </h1>
    </main>
  );
}
