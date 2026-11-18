import Link from "next/link";
import { redirect } from "next/navigation";
import { authorized } from "../../session";
import CreativeEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function Creatives() {
  if (!(await authorized())) redirect("/login");
  return (
    <main className="shell py-10">
      <Link href="/studio" className="accent">← Estúdio</Link>
      <h1 className="my-6 text-4xl font-black">Thumbnails e vinhetas</h1>
      <CreativeEditor />
    </main>
  );
}
