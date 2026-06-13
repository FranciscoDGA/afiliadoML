import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Card className="p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Sobre a loja</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Uma vitrine simples para comprar melhor</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          O Afiliado MLII foi pensado como um ecommerce de afiliados: navegação rápida, produtos em destaque,
          comparativos diretos e chamadas claras para compra.
        </p>
      </Card>
    </div>
  );
}
