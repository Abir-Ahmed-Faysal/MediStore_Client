"use client";

export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center absolute"
    >
      <div className="h-12 w-12 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
