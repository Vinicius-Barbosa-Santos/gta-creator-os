import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "../../page-banner";
import { editorialGuides } from "../editorial-guides";

type GuideParams = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return editorialGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GuideParams): Promise<Metadata> {
  const { slug } = await params;
  const guide = editorialGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guias/${slug}` },
  };
}

export default async function EditorialGuide({ params }: GuideParams) {
  const { slug } = await params;
  const guide = editorialGuides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <main className="shell grid gap-6 py-12">
      <Link href="/guias" className="portal-secondary w-fit">← Todos os guias</Link>
      <PageBanner title={guide.title} cover={guide.cover} />
      <section className="panel grid gap-4">
        <h2 className="text-2xl font-bold">Passo a passo</h2>
        <ol className="list-decimal space-y-3 pl-6 text-neutral-300">
          {guide.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>
      <figure className="panel grid gap-4">
        <figcaption className="text-2xl font-bold">{guide.exampleTitle}</figcaption>
        <dl className="grid gap-3 sm:grid-cols-3">
          {guide.example.map(([label, detail]) => (
            <div key={label} className="studio-lane grid content-start gap-2 rounded-xl p-4">
              <dt className="font-bold text-pink-200">{label}</dt>
              <dd className="text-neutral-300">{detail}</dd>
            </div>
          ))}
        </dl>
      </figure>
    </main>
  );
}
