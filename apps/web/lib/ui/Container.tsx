import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Simple layout wrapper; Tailwind utility classes will be composed here later.
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto max-w-4xl px-4 py-6 ${className}`.trim()}>{children}</div>;
}
