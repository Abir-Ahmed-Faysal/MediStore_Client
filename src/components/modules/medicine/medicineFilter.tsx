"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MedicineFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? "",
    manufacturer: searchParams.get("manufacturer") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set("page", "1");
    router.push(`/medicine?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border bg-background p-4 md:grid-cols-5"
    >
      <Input
        placeholder="Search medicine"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <Input
        placeholder="Category"
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      />

      <Input
        placeholder="Manufacturer"
        value={filters.manufacturer}
        onChange={(e) =>
          setFilters({ ...filters, manufacturer: e.target.value })
        }
      />

      <Input
        type="number"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(e) =>
          setFilters({ ...filters, minPrice: e.target.value })
        }
      />

      <Input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(e) =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
      />

      <div className="flex gap-2 md:col-span-5">
        <Button type="submit">Apply filters</Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/medicine")}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
