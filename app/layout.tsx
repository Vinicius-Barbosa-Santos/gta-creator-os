import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTA Creator OS | Guia independente",
  description: "Guias em português sobre GTA 6 e produção de conteúdo no PS5.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="font-black tracking-tight">GTA <span className="accent">CREATOR OS</span></Link>
          <nav aria-label="Navegação principal" className="flex flex-wrap gap-5 text-sm">
            <Link href="/guias">Guias</Link>
            <Link href="/studio">Estúdio ↗</Link>
          </nav>
        </header>
        {children}
        <footer className="shell py-10 text-sm text-neutral-400">Projeto independente sobre GTA 6.</footer>
      </body>
    </html>
  );
}
