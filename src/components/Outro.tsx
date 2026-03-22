import { motion } from 'motion/react';

export function Outro() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col items-center justify-center bg-white text-black p-8 text-center relative z-50"
    >
      <h1 className="font-serif text-6xl mb-8 tracking-widest uppercase">Acceptance</h1>
      <p className="font-serif text-xl opacity-70 max-w-2xl mb-12 leading-relaxed">
        The light blinds you for a moment. As your eyes adjust, the room fades away. 
        You remember everything. The accident. The guilt. 
        But you are no longer trapped.
      </p>
      <p className="font-mono text-sm opacity-50 uppercase tracking-widest">
        Thank you for playing.
      </p>
    </motion.div>
  );
}
