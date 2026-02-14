import { reviewService } from "@/services/review.service";
import { Review } from "@/types/review";
import ReviewForm from "./reviewForm";

interface Props {
  medicineId: string;
  reviews: Review[];
}

const ReviewSection = async ({ medicineId, reviews }: Props) => {


  const {data} = await reviewService.isEligibleToReview(medicineId);
  return (
    <div className="mt-16">
      <h2 className="mb-6 border-b pb-2 text-2xl font-semibold">
        Customer Reviews
      </h2>

      {/* Reviews */}
      {reviews?.length ? (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex gap-4 rounded-xl border bg-muted/50 p-5 shadow-sm"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border">
                <img
                  src={review?.userRef?.name}
                  alt={review?.userRef?.image}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold">{review?.userRef?.name}</h3>
                <p className="text-xs text-yellow-500">⭐ {review?.rating}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No reviews yet. Be the first to review this product.
        </p>
      )}

      {/* If Eligible → Show Client Form */}
      {data && (
        <ReviewForm medicineId={medicineId} />
      )}
    </div>
  );
};

export default ReviewSection;
