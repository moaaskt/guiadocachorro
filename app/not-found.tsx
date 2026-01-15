import Image from "next/image";
import Link from "next/link";
import { getPageBySlug } from "@/services/pages";
;

export default async function NotFound() {
  const page = await getPageBySlug("404");

  const imageUrl = page?.image_url?.trim();

  return (
    <>
      

      <main className="relative min-h-[calc(100vh-64px)] w-full">
        {/* IMAGEM FULL */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={page?.title ?? "Página não encontrada"}
            fill
            priority
            className="object-cover"
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTEÚDO */}
        <div className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {page?.title ?? "Página não encontrada"}
          </h1>

          <p className="max-w-xl text-lg opacity-90 mb-8">
            {page?.description ??
              "Você chegou até aqui, mas essa página não existe ou foi movida."}
          </p>

          <div className="flex gap-4">
            <Link
              href="/"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90 transition"
            >
              Voltar para Home
            </Link>

            <Link
              href="/racas"
              className="rounded-xl border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition"
            >
              Ver Raças
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
