import { NextResponse } from "next/server";
import { products } from "@/lib/mock-data";

export async function POST() {
  const updatedCount = products.length;

  return NextResponse.json({
    ok: true,
    message: "Atualização simulada concluída.",
    updatedCount,
    updatedAt: new Date().toISOString()
  });
}
