"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { reviews as seedReviews } from "@/lib/mock-data";

type ModerationState = "pendente" | "aprovado" | "rejeitado";

type ModerationReview = (typeof seedReviews)[number] & {
  state: ModerationState;
};

const initialReviews: ModerationReview[] = seedReviews.map((review, index) => ({
  ...review,
  state: index === 0 ? "pendente" : "aprovado"
}));

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ModerationReview[]>(initialReviews);

  const counts = useMemo(
    () => ({
      pendente: reviews.filter((review) => review.state === "pendente").length,
      aprovado: reviews.filter((review) => review.state === "aprovado").length,
      rejeitado: reviews.filter((review) => review.state === "rejeitado").length
    }),
    [reviews]
  );

  function updateReview(id: string, state: ModerationState) {
    setReviews((current) => current.map((review) => (review.id === id ? { ...review, state } : review)));
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Reviews</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Moderação de avaliações</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Aprovar, rejeitar e acompanhar a reputação dos produtos antes de publicar os depoimentos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-slate-500">Pendentes</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{counts.pendente}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Aprovadas</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{counts.aprovado}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Rejeitadas</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{counts.rejeitado}</p>
        </Card>
      </div>

      <Card className="space-y-4 p-5">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-950">{review.userName}</p>
                <Badge className={review.state === "aprovado" ? "bg-emerald-100 text-emerald-700" : review.state === "rejeitado" ? "bg-rose-100 text-rose-700" : "bg-ml-yellow text-slate-900"}>
                  {review.state}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
              <p className="mt-2 text-xs text-slate-500">{review.rating.toFixed(1)} ★</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => updateReview(review.id, "aprovado")}>
                Aprovar
              </Button>
              <Button variant="secondary" onClick={() => updateReview(review.id, "pendente")}>
                Devolver
              </Button>
              <Button variant="ghost" onClick={() => updateReview(review.id, "rejeitado")}>
                Rejeitar
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
