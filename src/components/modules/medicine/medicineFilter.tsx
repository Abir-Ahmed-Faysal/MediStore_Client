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
    sortBy: searchParams.get("sortBy") ?? "",
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
      className="grid gap-4 rounded-lg border bg-background p-4 md:grid-cols-6"
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

      <select
        value={filters.sortBy}
        onChange={(e) =>
          setFilters({ ...filters, sortBy: e.target.value })
        }
        className="px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="">Sort by...</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A to Z</option>
        <option value="name_desc">Name: Z to A</option>
        <option value="newest">Newest First</option>
      </select>

      <div className="flex gap-2 md:col-span-6">
        <Button className="hover:bg-[rgb(90,191,36)]  bg-[rgb(90,191,36)]" type="submit">Search</Button>

      </div>
    </form>
  );
}
