import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const stats = [
  { label: "Comissões", value: 1840.9, tone: "text-ml-blue" },
  { label: "Cliques", value: 12780, tone: "text-slate-950" },
  { label: "Taxa de conversão", value: 4.8, tone: "text-slate-950" }
];

export function AffiliateStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-5">
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className={`mt-2 text-2xl font-black ${stat.tone}`}>
            {stat.label === "Comissões"
              ? formatCurrency(stat.value)
              : stat.label === "Taxa de conversão"
                ? `${stat.value}%`
                : stat.value.toLocaleString("pt-BR")}
          </p>
        </Card>
      ))}
    </div>
  );
}
