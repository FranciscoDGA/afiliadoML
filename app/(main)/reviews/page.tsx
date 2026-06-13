import { ReviewSection } from "@/components/ReviewSection";
import { reviews as reviewData } from "@/lib/mock-data";

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Avaliações</p>
      <h1 className="mt-2 text-4xl font-black text-slate-950">Opiniões de quem já comprou</h1>
      <p className="mt-4 text-slate-600">
        As avaliações ajudam a comparar produtos com mais confiança e deixam a vitrine com aparência de loja ativa.
      </p>
      <div className="mt-8">
        <ReviewSection reviews={reviewData} />
      </div>
    </div>
  );
}
