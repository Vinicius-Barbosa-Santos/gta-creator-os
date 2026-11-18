import PageBanner from "../../page-banner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authorized } from "../../session";
import CreativeEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function Creatives() {
  if (!(await authorized())) redirect("/login");
  return (
    <main className="shell py-10">
      <div className="mb-6">
        <PageBanner title="Thumbnails e vinhetas" cover="/portal-leonida.webp">
          <Link href="/studio" className="portal-secondary mt-4 inline-block">← Estúdio</Link>
        </PageBanner>
      </div>
      <CreativeEditor />
    </main>
  );
}
