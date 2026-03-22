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
      className="absolute inset-0 overflow-y-auto bg-black text-white z-50"
    >
      <div className="min-h-full flex flex-col items-center p-6 pb-48 pt-24">
        <div className="m-auto w-full max-w-2xl relative z-10 flex flex-col items-center text-center">
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
        </div>
      </div>
    </motion.div>
  );
}
