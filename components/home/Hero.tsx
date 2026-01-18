'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* TEXTO */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Tudo o que você precisa saber para cuidar bem do seu cachorro
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Guias práticos sobre raças, alimentação, saúde e comportamento canino.
            Informação confiável para quem ama cães de verdade.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/racas"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Explorar Raças
            </a>

            <a
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Ler Guias
            </a>
          </div>
        </div>

        {/* IMAGEM */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 blur-lg opacity-70 group-hover:opacity-100 transition" />

          {/* Card da imagem */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16"
              alt="Cachorro feliz ao ar livre"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
