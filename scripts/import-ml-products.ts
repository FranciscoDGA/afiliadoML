import { searchMercadoLivreProducts } from "@/lib/mercadolivre";
import { products as mockProducts } from "@/lib/mock-data";

async function main() {
  const query = process.argv[2] ?? "cozinha";
  const results = await searchMercadoLivreProducts(query, 10, 0);
  const output = results.length > 0 ? results : mockProducts;
  console.log(JSON.stringify({ query, count: output.length, products: output }, null, 2));
}

main().catch((error) => {
  console.error("Erro ao importar produtos:", error);
  process.exitCode = 1;
});
