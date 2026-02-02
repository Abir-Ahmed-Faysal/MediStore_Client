"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
  id: string;
  name: string;
  icon?: string;
};

export function CategoryCard({ id, name, icon }: CategoryCardProps) {
  const router = useRouter();

  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <span className="text-4xl">{icon ?? "📦"}</span>
        <p className="font-medium">{name}</p>

        <Button
          size="sm"
          onClick={() => router.push(`/medicines?category=${id}`)}
        >
          See medicines
        </Button>
      </CardContent>
    </Card>
  );
}
