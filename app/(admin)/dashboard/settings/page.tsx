"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Configurações</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Ajustes da loja</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Aqui ficam os dados que deixam a loja consistente: afiliado, SEO, integração e apresentação pública.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="space-y-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Affiliate ID" />
            <Input placeholder="Nome da loja" />
            <Input placeholder="Meta title padrão" />
            <Input placeholder="Meta description padrão" />
            <Input placeholder="Instagram / TikTok" />
            <Input placeholder="WhatsApp comercial" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Google Analytics ID" />
            <Input placeholder="Pixel do Facebook" />
          </div>
          <Input placeholder="Mensagem de destaque na home" />
          <Button>Salvar configurações</Button>
        </Card>

        <Card className="space-y-4 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Boas práticas</p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Use um nome comercial curto e fácil de lembrar.</li>
            <li>• Mantenha a mensagem da home focada em ofertas e preço.</li>
            <li>• Salve o affiliate ID antes de publicar os links de compra.</li>
            <li>• Use o mesmo tom visual em páginas, cards e banners.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
