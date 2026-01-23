import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const images = [
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/a8bc87f9-d65f-4998-9216-cc5a8ea7affa.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/826345c9-fdfb-4764-a985-db2ac5f3b588.jpg",
  "https://cdn.poehali.dev/projects/3270de15-aa3c-4cf9-9199-108610462a6b/files/622f3f91-2437-4d34-b0a7-d29a822e76d2.jpg",
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6 py-24"
    >
      {/* Stacked images */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-[280px] md:w-[320px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
          style={{ rotate: rotate1, x: x1, y, zIndex: 1 }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Портфолио 1"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="relative w-[280px] md:w-[320px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
          style={{ rotate: rotate2, y, zIndex: 2 }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[1] || "/placeholder.svg"}
            alt="Портфолио 2"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute w-[280px] md:w-[320px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
          style={{ rotate: rotate3, x: x3, y, zIndex: 1 }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[2] || "/placeholder.svg"}
            alt="Портфолио 3"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-center text-foreground mix-blend-difference">
          Портреты, <em className="italic">с душой</em>.
        </h1>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 rounded-full bg-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}