import Link from "next/link";
import { Card } from "@/components/ui/card";

const links = [
  { href: "/dashboard", label: "Visão geral" },
  { href: "/dashboard/produtos", label: "Produtos" },
  { href: "/dashboard/blog", label: "Blog" },
  { href: "/dashboard/reviews", label: "Reviews" },
  { href: "/dashboard/settings", label: "Configurações" }
];

export function AdminSidebar() {
  return (
    <Card className="p-4">
      <p className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-ml-blue">Painel</p>
      <nav className="mt-4 grid gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </Card>
  );
}
