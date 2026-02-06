"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertDialogBasic } from "./addMedicineDialauge";
import { AlertDialogDestructive } from "./deleteMedineDialauge";
import { MedicineResponse, Pagination } from "@/services/medicine.service";
import { categories } from "@/app/(dashboardLayout)/@seller/seller-dashboard/medicine/page";
import { UpdateMedicine } from "./updateMedicine";

export default function MedicineTable({
  categories,
  medicines,
  pagination,
}: {
  categories: categories[];
  medicines: MedicineResponse[];
  pagination: Pagination;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const handleSearch = (value: string) => {
    params.set("search", value);
    router.push(`?${params.toString()}`);
  };

const goToPage = (page: number) => {
  params.set("page", page.toString());
  router.push(`?${params.toString()}`);
};

const prevHandler = () => {
  if (pagination.page > 1) {
    goToPage(pagination.page - 1);
  }
};

const nextHandler = () => {
  if (pagination.page < pagination.totalPage) {
    goToPage(pagination.page + 1);
  }
};


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search medicine..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <AlertDialogBasic categories={categories} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>
                <img src={medicine.image} className="w-10 h-10 object-cover" />
              </TableCell>
              <TableCell>{medicine?.title}</TableCell>
              <TableCell>{medicine?.manufacturer}</TableCell>
              <TableCell>{medicine?.categoryRef?.category_name}</TableCell>
              <TableCell>{medicine?.stock}</TableCell>
              <TableCell>{medicine?.price}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                <UpdateMedicine medicine={medicine}  ></UpdateMedicine>
                <AlertDialogDestructive id={medicine.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
<TableCell colSpan={7} className="text-center">
  <div className="flex items-center justify-center gap-6">
    
    <span className="text-sm text-muted-foreground">
      Showing page {pagination.page} of {pagination.totalPage}
    </span>

    <div className="flex items-center gap-2">
      <button
        onClick={prevHandler}
        disabled={pagination.page === 1}
        aria-label="Previous page"
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ←
      </button>

      <span className="min-w-8 text-center">
        {pagination.page}
      </span>

      <button
        onClick={nextHandler}
        disabled={pagination.page === pagination.totalPage}
        aria-label="Next page"
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        →
      </button>
    </div>

  </div>
</TableCell>

          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
