import { motion } from 'motion/react';
import { View } from '../types';

interface IntroProps {
  changeView: (view: View) => void;
}

export function Intro({ changeView }: IntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-8 text-center relative z-50"
    >
      <h1 className="font-serif text-6xl mb-8 tracking-widest uppercase">The Writer's Room</h1>
      <p className="font-serif text-xl opacity-70 max-w-2xl mb-12 leading-relaxed">
        You wake up in a room. The air is stale. The walls feel like they are closing in. 
        You don't remember how you got here, but you know you must escape.
      </p>
      <button 
        onClick={() => changeView('room')}
        className="border border-white/30 px-12 py-4 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
      >
        Wake Up
      </button>
    </motion.div>
  );
}
