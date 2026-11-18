import Image from "next/image";
import type { ReactNode } from "react";

export default function PageBanner({ title, cover, children }: {
  title: string;
  cover: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-banner">
      <Image src={cover} alt="" fill unoptimized className="page-banner-art object-cover" />
      <div className="page-banner-copy relative z-10 w-full min-w-0 p-6 sm:p-10">
        <h1 className="page-title">{title}</h1>
        {children}
      </div>
    </header>
  );
}
