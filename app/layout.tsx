import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteName, siteUrl, socialLinks } from "./site";

export const metadata: Metadata = {
  verification: { google: "t1bR0fA1jI6ixqEskNfWooa7Y0pROaiAICK2nH7FYzU" },
  metadataBase: new URL(siteUrl),
  title: { default: "GTA 6: notícias e guias para PS5 | Viny Plays", template: "%s | Viny Plays" },
  openGraph: { siteName, locale: "pt_BR", type: "website", images: ["/portal-leonida.webp"] },
  description: "Guias em português sobre GTA 6 e produção de conteúdo no PS5.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="font-black tracking-tight">VINY <span className="accent">PLAYS</span></Link>
          <nav aria-label="Navegação principal" className="flex flex-wrap gap-5 text-sm">
            <Link href="/noticias">Notícias</Link>
            <Link href="/guias">Guias</Link>
            <Link href="/demo">Demonstração</Link>
            <Link href="/studio">Estúdio ↗</Link>
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
        </header>
        {children}
        <footer className="shell py-10 text-sm text-neutral-400">Projeto independente sobre GTA 6, sem vínculo com a Rockstar Games ou a Take-Two.</footer>
      </body>
    </html>
  );
}
