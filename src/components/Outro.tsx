import { motion } from 'motion/react';

export function Outro() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 overflow-y-auto bg-white text-black z-50"
    >
      <div className="min-h-full flex flex-col items-center p-6 pb-48 pt-24">
        <div className="m-auto w-full max-w-2xl relative z-10 flex flex-col items-center text-center">
          <h1 className="font-serif text-6xl mb-8 tracking-widest uppercase">Acceptance</h1>
          <p className="font-serif text-xl opacity-70 max-w-2xl mb-12 leading-relaxed">
            The light blinds you for a moment. As your eyes adjust, the room fades away. 
            You remember everything. The accident. The guilt. 
            But you are no longer trapped.
          </p>
          <p className="font-mono text-sm opacity-50 uppercase tracking-widest">
            Thank you for playing.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
