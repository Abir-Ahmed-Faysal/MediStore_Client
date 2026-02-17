"use client";

export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
