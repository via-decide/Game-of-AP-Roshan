import { motion } from 'motion/react';
import { GameState, View } from '../types';

interface RoomProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
}

export function Room({ state, changeView, addMessage }: RoomProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/darkroom/1920/1080?blur=4')] bg-cover bg-center opacity-20 mix-blend-multiply pointer-events-none" />
      
      <div className="min-h-full flex flex-col p-6 pb-48 pt-8 md:pt-24">
        <div className="flex-grow" />
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl relative z-10">
          <div 
            onClick={() => changeView('door')}
            className="h-32 md:h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <span className="font-serif text-lg md:text-xl tracking-widest uppercase opacity-50 text-center">The Door</span>
          </div>

          <div 
            onClick={() => changeView('desk')}
            className="h-32 md:h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <span className="font-serif text-lg md:text-xl tracking-widest uppercase opacity-50 text-center">The Desk</span>
          </div>

          <div 
            onClick={() => changeView('bookshelf')}
            className="h-32 md:h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <span className="font-serif text-lg md:text-xl tracking-widest uppercase opacity-50 text-center">The Bookshelf</span>
          </div>

          <div 
            onClick={() => changeView('mirror')}
            className="h-32 md:h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <span className="font-serif text-lg md:text-xl tracking-widest uppercase opacity-50 text-center">The Mirror</span>
          </div>
        </div>
        <div className="flex-grow" />
      </div>
    </motion.div>
  );
}
