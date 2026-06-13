import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { productCategories } from "@/lib/constants";

export function FilterSidebar() {
  return (
    <Card className="p-5">
      <h3 className="text-lg font-bold text-slate-950">Filtros</h3>
      <div className="mt-4 space-y-4 text-sm">
        <div>
          <p className="font-semibold text-slate-900">Categorias</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Faixa de preço</p>
          <p className="mt-2 text-slate-600">R$ 50 - R$ 2.000</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Avaliação mínima</p>
          <p className="mt-2 text-slate-600">4.5 estrelas</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Frete grátis</p>
          <p className="mt-2 text-slate-600">Somente produtos elegíveis</p>
        </div>
      </div>
    </Card>
  );
}
