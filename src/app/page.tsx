import { theme } from "@/theme/config";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1
          className="text-5xl font-bold"
          style={{ color: theme.colors.primary.main }}
        >
          Stash
        </h1>
        <p className="text-xl text-muted-foreground max-w-prose mx-auto">
          Guarde o registro, entenda seu dinheiro. Um app para registrar seus gastos de forma rápida e indolor.
        </p>
        <div className="pt-4 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10">
            <span className="text-2xl">✅</span>
            <p className="text-sm font-medium text-primary">
              Projeto inicializado com sucesso!
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Sistema de Design:</p>
            <ul className="space-y-1">
              <li className="font-medium">Paleta: Blue (confiável)</li>
              <li className="font-medium">Tipografia: Poppins</li>
              <li className="font-medium">Estilo: Bold & Vibrant</li>
            </ul>
          </div>
          <div className="pt-4 space-y-1">
            <p className="text-sm text-muted-foreground">
              Próximo passo: Crie especificações de features em{" "}
              <code className="bg-muted px-2 py-1 rounded font-mono text-xs">specs/</code>
            </p>
            <p className="text-sm text-muted-foreground">
              Use{" "}
              <code className="bg-muted px-2 py-1 rounded font-mono text-xs">
                /design:feature &lt;spec-path&gt;
              </code>{" "}
              para gerar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
