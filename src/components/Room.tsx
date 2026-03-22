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
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/darkroom/1920/1080?blur=4')] bg-cover bg-center opacity-20 mix-blend-multiply pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-3 gap-8 w-full max-w-4xl p-8">
        <div 
          onClick={() => changeView('door')}
          className="col-span-1 h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
        >
          <span className="font-serif text-xl tracking-widest uppercase opacity-50">The Door</span>
        </div>

        <div 
          onClick={() => changeView('desk')}
          className="col-span-1 h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
        >
          <span className="font-serif text-xl tracking-widest uppercase opacity-50">The Desk</span>
        </div>

        <div 
          onClick={() => changeView('bookshelf')}
          className="col-span-1 h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
        >
          <span className="font-serif text-xl tracking-widest uppercase opacity-50">The Bookshelf</span>
        </div>

        <div 
          onClick={() => changeView('mirror')}
          className="col-span-1 col-start-2 h-64 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
        >
          <span className="font-serif text-xl tracking-widest uppercase opacity-50">The Mirror</span>
        </div>
      </div>
    </motion.div>
  );
}
