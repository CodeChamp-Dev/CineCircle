import React from "react";

async function getHealth() {
  // At runtime this will call the API route; for now assume local dev port 3001.
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001"}/api/health`,
      {
        // Force dynamic fetch; health is near-real-time.
        cache: "no-store",
      },
    );
    if (!res.ok) return { status: "error", code: res.status };
    return res.json();
  } catch (e) {
    return { status: "offline" };
  }
}

export default async function HealthPage() {
  const data = await getHealth();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">API Health</h1>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
