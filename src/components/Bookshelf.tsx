import { motion } from 'motion/react';
import { GameState, View, Item } from '../types';

interface BookshelfProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
  updateFlag: (flag: keyof GameState['flags'], value: boolean) => void;
  addItem: (item: Item) => void;
}

export function Bookshelf({ state, changeView, addMessage, updateFlag, addItem }: BookshelfProps) {
  const handleExamine = () => {
    if (!state.flags.readBook) {
      addMessage("You pull out a dusty journal. The last entry reads: 'I must F... them. I must F... myself. That is the only way out.'");
      updateFlag('readBook', true);
    } else {
      addMessage("Rows of your published works. They feel hollow now.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-y-auto"
    >
      <div className="min-h-full flex flex-col items-center p-6 pb-48 pt-24">
        <button 
          onClick={() => changeView('room')}
          className="absolute top-8 left-8 text-white/50 hover:text-white uppercase tracking-widest text-sm cursor-pointer z-20"
        >
          ← Back to Room
        </button>

        <div className="m-auto w-full max-w-2xl relative z-10 flex flex-col items-center">
          <h2 className="font-serif text-4xl mb-8 opacity-80 text-center">The Bookshelf</h2>
          
          <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
             <div 
              onClick={handleExamine}
              className="w-full h-20 sm:h-16 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              <span className="font-serif uppercase tracking-widest opacity-70 text-center px-4">Examine Books</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
