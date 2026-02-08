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

// -------------------- TYPES --------------------
type Category = {
  id: string;
  category_name: string;
  icon: string;
};

// -------------------- ZOD SCHEMA --------------------
const medicineSchema = z.object({
  category_name: z
    .string()
    .min(3, "Category name must be at least 3 characters"),
  icon: z.string().min(2, "Icon URL is required"),
});

export function EditCategory({ category }: { category?: Category }) {
  const form = useForm({
    defaultValues: {
      category_name: category?.category_name || "",
      icon: category?.icon || "",
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("FINAL SUBMIT VALUE 👉", value);
      // TODO: Call your API to update the category here
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset(); // Reset to default values each time dialog opens
          }}
        >
          Edit Category
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Category</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* -------------------- Category Name -------------------- */}
          <form.Field name="category_name">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">Category Name</label>
                  <input
                    placeholder="Ex: Paracetamol"
                    className="border p-2 w-full rounded-md"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">{error.message}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* -------------------- Icon -------------------- */}
          <form.Field name="icon">
            {(f) => {
              const showError =
                f.state.meta.isTouched || form.state.submissionAttempts > 0;
              const error = f.state.meta.errors?.[0];

              return (
                <div>
                  <label className="text-sm font-medium">Icon URL</label>
                  <input
                    placeholder="Ex: http://example.com/icon.png"
                    className="border p-2 w-full rounded-md"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                    onBlur={f.handleBlur}
                  />
                  {showError && error && (
                    <p className="text-sm text-red-500 mt-1">{error.message}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* -------------------- Footer -------------------- */}
          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <AlertDialogCancel
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
