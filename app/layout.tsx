import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "Afiliado MLII",
  description: "Loja de ofertas e produtos selecionados do Mercado Livre."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={manrope.variable}>
        <div className="ml-shell min-h-screen">
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <a href="/" className="flex items-center gap-3 font-semibold text-slate-900">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ml-blue text-sm font-black text-white shadow-soft">
                  ML
                </span>
                <span>
                  Afiliado <span className="text-ml-blue">MLII</span>
                </span>
              </a>
              <nav className="hidden items-center gap-6 text-sm font-medium text-ml-muted md:flex">
                <a href="/products" className="transition hover:text-ml-blue">
                  Ofertas
                </a>
                <a href="/products" className="transition hover:text-ml-blue">
                  Produtos
                </a>
                <a href="/blog" className="transition hover:text-ml-blue">
                  Guias
                </a>
                <a href="/reviews" className="transition hover:text-ml-blue">
                  Avaliações
                </a>
                <a href="/contact" className="transition hover:text-ml-blue">
                  Contato
                </a>
              </nav>
              <a
                href="/dashboard"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-ml-blue hover:text-ml-blue"
              >
                Área do lojista
              </a>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-ml-muted sm:px-6 lg:grid-cols-3 lg:px-8">
              <div>
                <p className="font-semibold text-slate-900">Afiliado MLII</p>
                <p className="mt-2 max-w-sm">
                  Loja de ofertas selecionadas com foco em conversão, confiança e compras rápidas.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Links rápidos</p>
                <div className="mt-2 grid gap-2">
                  <a href="/products" className="hover:text-ml-blue">
                    Ofertas
                  </a>
                  <a href="/products" className="hover:text-ml-blue">
                    Produtos
                  </a>
                  <a href="/blog" className="hover:text-ml-blue">
                    Guias
                  </a>
                  <a href="/reviews" className="hover:text-ml-blue">
                    Avaliações
                  </a>
                  <a href="/contact" className="hover:text-ml-blue">
                    Contato
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Compra segura</p>
                <p className="mt-2">
                  Compare preços, veja avaliações e clique para comprar com segurança no Mercado Livre.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
