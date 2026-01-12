'use client';

import { motion } from 'framer-motion';

export function FinalCTA() {
  return (
    <section className="py-24 bg-blue-600">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Cuide do seu cachorro com mais confiança e carinho
        </h2>

        <p className="mt-5 text-lg text-blue-100">
          Explore nossos guias completos e descubra tudo o que você precisa
          para garantir saúde, bem-estar e felicidade ao seu melhor amigo.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/guias"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Ver Guias de Cuidados.
          </a>

          <a
            href="/racas"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition"
          >
            Explorar Raças
          </a>
        </div>
      </motion.div>
    </section>
  );
}
