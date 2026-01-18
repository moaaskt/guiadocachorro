"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Quantas vezes por dia devo alimentar meu cachorro?",
    answer:
      "Geralmente, filhotes devem comer 3 a 4 vezes ao dia. Adultos saudáveis podem comer 2 vezes ao dia (manhã e noite).",
  },
  {
    question: "Quais vacinas são obrigatórias?",
    answer:
      "No Brasil, as vacinas essenciais incluem a múltipla (V8 ou V10) e a antirrábica. Consulte seu veterinário para orientações específicas.",
  },
  {
    question: "Como sei se meu cachorro está com febre?",
    answer:
      "Sinais comuns incluem letargia, nariz quente e seco, falta de apetite. A temperatura ideal do cachorro fica entre 38° e 39°.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-300 p-4"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left text-lg font-semibold text-gray-800"
              >
                {item.question}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
