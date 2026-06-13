import type { Review } from "@/types/review";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type ReviewSectionProps = {
  reviews: Review[];
};

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold text-slate-950">{review.userName}</p>
            <p className="text-sm text-slate-500">{formatDate(review.createdAt)}</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">{review.comment}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ml-blue">{review.rating.toFixed(1)} ★</p>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Compra verificada
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
