import { NextResponse } from "next/server";
import { z } from "zod";
import { searchMercadoLivreProducts } from "@/lib/mercadolivre";

const schema = z.object({
  query: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minRating: z.number().optional(),
  freeShipping: z.boolean().optional()
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const products = await searchMercadoLivreProducts(body.query ?? "cozinha", 10, 0, body);
    return NextResponse.json({
      ok: true,
      products,
      message: products.length ? "Produtos encontrados com sucesso." : "Nenhum produto encontrado."
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Falha ao importar produtos",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
