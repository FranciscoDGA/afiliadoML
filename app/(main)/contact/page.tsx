import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Card className="p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Contato</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Fale com a equipe</h1>
        <form className="mt-8 grid gap-4">
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" type="email" />
          <textarea
            className="min-h-40 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-ml-blue"
            placeholder="Mensagem"
          />
          <div>
            <Button type="submit">Enviar mensagem</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
