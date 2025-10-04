import Link from "next/link";
import React from "react";

import { Container } from "../lib/ui/Container";

export default function HomePage() {
  return (
    <Container className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">CineCircle</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-prose">
        A trusted layer for sharing personal movie recommendations and curated Cineboards with
        friends.
      </p>
      <div className="flex gap-4">
        <Link href="/health" className="text-brand-600 hover:underline">
          API Health
        </Link>
      </div>
    </Container>
  );
}
