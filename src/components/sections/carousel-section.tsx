import { motion } from "framer-motion"

const portfolioItems = [
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/a8bc87f9-d65f-4998-9216-cc5a8ea7affa.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/826345c9-fdfb-4764-a985-db2ac5f3b588.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/d039d3ec-a352-44c2-bf07-bd0687b3cc00.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/01b13a85-4d05-462f-91db-1655a7f4310a.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/c5ee8c83-cec0-4179-a164-6cf3b8f831b6.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/3392db4b-2a0f-4aac-b4ad-65597919e796.jpg",
]

export function CarouselSection() {
  // Duplicate for seamless loop
  const items = [...portfolioItems, ...portfolioItems]

  return (
    <section className="bg-primary py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-serif text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Каждый кадр рассказывает историю.
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] rounded-xl overflow-hidden shadow-2xl"
              data-clickable
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Пример портфолио ${(i % portfolioItems.length) + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}