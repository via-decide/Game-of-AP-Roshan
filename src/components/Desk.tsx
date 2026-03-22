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
      className="absolute inset-0 overflow-y-auto"
    >
      <div className="min-h-full flex flex-col p-6 pb-48 pt-8">
        <div className="w-full flex justify-start mb-4">
          <button 
            onClick={() => changeView('room')}
            className="text-white/50 hover:text-white uppercase tracking-widest text-sm z-20 cursor-pointer"
          >
            ← Back to Room
          </button>
        </div>

        <div className="flex-grow" />
        <div className="mx-auto w-full max-w-2xl relative z-10 flex flex-col items-center">
          <h2 className="font-serif text-4xl mb-12 opacity-80 text-center">The Desk</h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full justify-center">
            <div 
              onClick={() => changeView('typewriter')}
              className="w-full sm:w-48 h-32 sm:h-48 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              <span className="font-serif uppercase tracking-widest opacity-50 text-center">Typewriter</span>
            </div>

            <div 
              onClick={() => changeView('drawer')}
              className="w-full sm:w-48 h-32 sm:h-48 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              <span className="font-serif uppercase tracking-widest opacity-50 text-center px-4">Locked Drawer</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
