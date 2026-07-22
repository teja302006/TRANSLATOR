import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="mx-auto mb-8 max-w-3xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight md:text-6xl"
      >
        Translate Every Language Instantly
      </motion.h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 md:text-lg">
        A premium AI translator interface with voice input, local history, favorites, and elegant motion-driven interactions.
      </p>
    </section>
  );
}

export default Hero;
