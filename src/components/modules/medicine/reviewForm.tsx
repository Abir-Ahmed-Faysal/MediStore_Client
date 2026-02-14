"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createComment } from "@/actions/reviewAction";
import { useRouter } from "next/navigation";

interface Props {
  medicineId: string;
}

const ReviewForm = ({ medicineId }: Props) => {
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      rating,
      content,
    };

    try {
      const { data } = await createComment(medicineId, payload);

      if (!data) {
        toast.error("failed to comment");
      }

      toast.success("Review submitted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 rounded-xl border p-5"
    >
      <h3 className="text-lg font-semibold">Add Your Review</h3>

      {/* Rating */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Rating (1-5)</label>
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rounded-md border px-3 py-2"
        />
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Comment</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-md border px-3 py-2"
          required
        />
      </div>

      <Button type="submit">Submit Review</Button>
    </form>
  );
};

export default ReviewForm;
