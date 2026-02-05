"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

/* -------------------- TYPES -------------------- */
type Medicine = {
  id: string;
  image: string;
  title: string;
  description: string;
  manufacturer: string;
  price: number;
  stock: number;
  categoryName: string;
};

/* -------------------- MOCK DATA -------------------- */
const initialData: Medicine[] = [
  {
    id: "0521dbac-cfe7-4941-83f0-cfbb19821a9e",
    image: "https://via.placeholder.com/40",
    title: "Napa Extra 500mg",
    description: "Pain reliever & fever reducer",
    manufacturer: "Square Pharmaceuticals Ltd.",
    price: 5,
    stock: 500,
    categoryName: "Paracetamol",
  },
  {
    id: "070fbf8f-50f0-4bf9-829c-fdbf5e9c0e23",
    image: "https://via.placeholder.com/40",
    title: "Napa 500mg",
    description: "Pain reliever & fever reducer",
    manufacturer: "Square Pharmaceuticals Ltd.",
    price: 5,
    stock: 500,
    categoryName: "Paracetamol",
  },
];

/* -------------------- EDIT MODAL -------------------- */
const EditModal = ({
  medicine,
  onClose,
  onSave,
}: {
  medicine: Medicine;
  onClose: () => void;
  onSave: (m: Medicine) => void;
}) => {
  const [form, setForm] = useState(medicine);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-xl space-y-5">
        <h2 className="text-lg font-semibold">Edit Medicine</h2>

        <div className="space-y-3">
          <input
            className="w-full rounded-md border px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="number"
            className="w-full rounded-md border px-3 py-2"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
          />
          <input
            type="number"
            className="w-full rounded-md border px-3 py-2"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: +e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------- MAIN TABLE -------------------- */
export default function Medicines() {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editItem, setEditItem] = useState<Medicine | null>(null);

  const handleDelete = async (id: string) => {
    // Optimistic UI
    setData((prev) => prev.filter((m) => m.id !== id));

    // Backend later
    // await fetch(`/api/medicines/${id}`, { method: "DELETE" });
  };

  const columns = useMemo<ColumnDef<Medicine>[]>(
    () => [
      {
        header: "Medicine",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.image}
              className="h-10 w-10 rounded-md border"
            />
            <div>
              <p className="font-medium">{row.original.title}</p>
              <p className="text-xs text-muted-foreground">
                {row.original.categoryName}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "manufacturer",
        header: "Manufacturer",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `৳ ${row.original.price}`,
      },
      {
        accessorKey: "stock",
        header: "Stock",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              title="Overview"
              onClick={() => router.push(`/medicines/${row.original.id}`)}
              className="rounded-md p-2 hover:bg-muted"
            >
              <Eye size={16} />
            </button>
            <button
              title="Edit"
              onClick={() => setEditItem(row.original)}
              className="rounded-md p-2 hover:bg-muted"
            >
              <Pencil size={16} />
            </button>
            <button
              title="Delete"
              onClick={() => handleDelete(row.original.id)}
              className="rounded-md p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [router]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <input
          placeholder="Search medicine..."
          className="w-64 rounded-md border px-3 py-2"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        <button
          onClick={() => router.push("/medicines/create")}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          <Plus size={16} />
          Add Medicine
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="w-full">
          <thead className="border-b bg-muted">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-0 hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && (
        <EditModal
          medicine={editItem}
          onClose={() => setEditItem(null)}
          onSave={(updated) => {
            setData((prev) =>
              prev.map((m) => (m.id === updated.id ? updated : m))
            );
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
