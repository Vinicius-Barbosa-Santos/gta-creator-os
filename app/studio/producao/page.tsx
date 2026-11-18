import Link from "next/link";
import { redirect } from "next/navigation";
import { authorized } from "../../session";
import Board from "./board";

export const dynamic = "force-dynamic";

export default async function Production() {
  if (!(await authorized())) redirect("/login");
  return (
    <main className="shell py-10">
      <Link href="/studio" className="accent">← Estúdio</Link>
      <h1 className="my-6 text-4xl font-black">Produção de conteúdo</h1>
      <Board />
    </main>
  );
}
