import PageBanner from "../../page-banner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authorized } from "../../session";
import Board from "./board";

export const dynamic = "force-dynamic";

export default async function Production() {
  if (!(await authorized())) redirect("/login");
  return (
    <main className="shell py-10">
      <div className="mb-6">
        <PageBanner title="Produção de conteúdo" cover="/guia-captura.webp">
          <Link href="/studio" className="portal-secondary mt-4 inline-block">← Estúdio</Link>
        </PageBanner>
      </div>
      <Board />
    </main>
  );
}
