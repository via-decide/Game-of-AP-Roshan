import { motion } from 'motion/react';
import { GameState, View } from '../types';

interface DeskProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
}

export function Desk({ state, changeView, addMessage }: DeskProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center relative"
    >
      <button 
        onClick={() => changeView('room')}
        className="absolute top-8 left-8 text-white/50 hover:text-white uppercase tracking-widest text-sm"
      >
        ← Back to Room
      </button>

      <h2 className="font-serif text-4xl mb-12 opacity-80">The Desk</h2>

      <div className="flex gap-8">
        <div 
          onClick={() => changeView('typewriter')}
          className="w-48 h-48 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
        >
          <span className="font-serif uppercase tracking-widest opacity-50">Typewriter</span>
        </div>

        <div 
          onClick={() => changeView('drawer')}
          className="w-48 h-48 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
        >
          <span className="font-serif uppercase tracking-widest opacity-50 text-center px-4">Locked Drawer</span>
        </div>
      </div>
    </motion.div>
  );
}
