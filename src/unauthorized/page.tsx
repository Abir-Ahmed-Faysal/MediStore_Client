import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-2xl font-semibold">
          Access Denied
        </h1>

        <p className="text-muted-foreground">
          You don’t have permission to access this page.
          If you think this is a mistake, please contact support.
        </p>

        <div className="flex justify-center gap-3 pt-4">
          <Link
            href="/"
            className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
          >
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
