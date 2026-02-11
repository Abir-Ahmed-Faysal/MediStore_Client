"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Select from "react-select";
import { MedicineResponse } from "@/services/medicine.service";
import { Edit } from "lucide-react";
import { updateMedicineAction } from "@/actions/MedicineAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

// -------------------- TYPES --------------------
type Category = {
  id: string;
  category_name: string;
};

// -------------------- ZOD SCHEMA --------------------
const medicineSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().min(5, "Image URL is required"),
});

export function UpdateMedicine({
  categories,
  medicine,
}: {
  categories?: Category[];
  medicine: MedicineResponse;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: medicine.title,
      manufacturer: medicine.manufacturer,
      price: Number(medicine.price),
      stock: medicine.stock,
      description: medicine.description,
      categoryId: medicine.categoryId,
      image: medicine.image,
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await updateMedicineAction(
          medicine.id,
          value
        );

        if (!data || error) {
          toast.error("medicine data failed updated");
          return;
        }

        toast.success("medicine data update successfully");

        setOpen(false);   // close dialog after success
        router.refresh(); // refresh server data
      } catch (error) {
        toast.error("medicine data failed updated");
      }
    },
  });

  const categoryOptions =
    categories?.map((c) => ({
      value: c.id,
      label: c.category_name,
    })) ?? [];

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            form.reset();
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Medicine</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* TITLE */}
          <form.Field name="title">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input
                    className="border p-2 w-full rounded-md"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* MANUFACTURER */}
          <form.Field name="manufacturer">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">
                    Manufacturer
                  </label>
                  <input
                    className="border p-2 w-full rounded-md"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* PRICE */}
          <form.Field name="price">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <input
                    type="number"
                    className="border p-2 w-full rounded-md"
                    value={f.state.value ?? ""}
                    onChange={(e) =>
                      f.handleChange(
                        e.target.value === ""
                          ? 0
                          : Number(e.target.value)
                      )
                    }
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* STOCK */}
          <form.Field name="stock">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">Stock</label>
                  <input
                    type="number"
                    className="border p-2 w-full rounded-md"
                    value={f.state.value ?? ""}
                    onChange={(e) =>
                      f.handleChange(
                        e.target.value === ""
                          ? 0
                          : Number(e.target.value)
                      )
                    }
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* CATEGORY */}
          <form.Field name="categoryId">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              const selectedValue =
                categoryOptions.find(
                  (opt) => opt.value === f.state.value
                ) ?? null;

              return (
                <div>
                  <label className="text-sm font-medium">
                    Category
                  </label>
                  <Select
                    options={categoryOptions}
                    value={selectedValue}
                    onChange={(option) =>
                      f.handleChange(option ? option.value : "")
                    }
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* IMAGE */}
          <form.Field name="image">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">
                    Image URL
                  </label>
                  <input
                    className="border p-2 w-full rounded-md"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* DESCRIPTION */}
          <form.Field name="description">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    className="border p-2 w-full rounded-md min-h-[100px]"
                    value={f.state.value}
                    onChange={(e) =>
                      f.handleChange(e.target.value)
                    }
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* FOOTER */}
          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <AlertDialogCancel
              onClick={() => form.reset()}
            >
              Cancel
            </AlertDialogCancel>

            <Button type="submit">
              Update
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
