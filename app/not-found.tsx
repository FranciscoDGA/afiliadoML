export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">Página não encontrada</h1>
      <p className="mt-3 text-ml-muted">
        Vamos continuar a construção do projeto a partir da base atual. Esta rota ainda não existe.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex rounded-full bg-ml-blue px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Voltar para a home
      </a>
    </div>
  );
}
