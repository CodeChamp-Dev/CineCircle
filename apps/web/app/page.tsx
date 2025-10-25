"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { Container } from "../lib/ui/Container";

export default function HomePage() {
  const { isSignedIn, user } = useUser();

  return (
    <Container className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">CineCircle</h1>
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-prose">
        A trusted layer for sharing personal movie recommendations and curated Cineboards with
        friends.
      </p>

      {isSignedIn ? (
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You're signed in! Access your personalized movie recommendations and Cineboards.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in or create an account to start discovering amazing movies with your friends.
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <Link href="/health" className="text-brand-600 hover:underline">
          API Health
        </Link>
      </div>
    </Container>
  );
}
