import { AffiliateStats } from "@/components/AffiliateStats";
import { Card } from "@/components/ui/card";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";

const activity = [
  { label: "Produtos importados hoje", value: 18 },
  { label: "Produtos com frete grátis", value: 26 },
  { label: "Posts publicados", value: 12 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Visão geral da loja</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Acompanhe volume, clique, conversão e crescimento do catálogo sem sair do painel.
        </p>
      </div>
      <AffiliateStats />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Movimento do catálogo</h2>
                <p className="mt-1 text-sm text-slate-600">Volume semanal de visitas e ofertas ativas.</p>
              </div>
            </div>
            <div className="mt-4">
              <PriceHistoryChart />
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            {activity.map((item) => (
              <Card key={item.label} className="p-5">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{item.value.toLocaleString("pt-BR")}</p>
              </Card>
            ))}
          </div>
        </div>
        <Card className="p-5">
          <h2 className="text-xl font-bold text-slate-950">Atalhos</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a href="/dashboard/produtos" className="rounded-2xl bg-slate-50 px-4 py-3 font-semibold hover:bg-slate-100">
              Gerenciar produtos
            </a>
            <a href="/dashboard/blog" className="rounded-2xl bg-slate-50 px-4 py-3 font-semibold hover:bg-slate-100">
              Publicar blog
            </a>
            <a href="/dashboard/reviews" className="rounded-2xl bg-slate-50 px-4 py-3 font-semibold hover:bg-slate-100">
              Moderar reviews
            </a>
            <a href="/dashboard/settings" className="rounded-2xl bg-slate-50 px-4 py-3 font-semibold hover:bg-slate-100">
              Configurações da loja
            </a>
            <a href="/products" className="rounded-2xl bg-slate-50 px-4 py-3 font-semibold hover:bg-slate-100">
              Ver catálogo público
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
