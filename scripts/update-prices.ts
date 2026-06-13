import { products } from "@/lib/mock-data";

async function main() {
  const updated = products.map((product) => ({
    ...product,
    price: Number((product.price * 0.98).toFixed(2)),
    updatedAt: new Date().toISOString()
  }));

  console.log(
    JSON.stringify(
      {
        ok: true,
        message: "Atualização simulada concluída",
        products: updated
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error("Erro ao atualizar preços:", error);
  process.exitCode = 1;
});
