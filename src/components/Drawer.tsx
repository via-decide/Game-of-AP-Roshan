import { motion } from 'motion/react';
import { GameState, View, Item } from '../types';

interface DrawerProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
  updateFlag: (flag: keyof GameState['flags'], value: boolean) => void;
  addItem: (item: Item) => void;
}

export function Drawer({ state, changeView, addMessage, updateFlag, addItem }: DrawerProps) {
  const handleUnlock = () => {
    if (state.flags.drawerUnlocked) {
      addMessage("The drawer is already open. It's empty now.");
      return;
    }

    if (state.inventory.includes('small_key')) {
      addMessage("You turn the small key in the lock. It clicks open. Inside is a lighter and a torn note.");
      updateFlag('drawerUnlocked', true);
      addItem('lighter');
      addItem('torn_note');
    } else {
      addMessage("It's locked. A small keyhole sits just below the handle.");
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
          onClick={() => changeView('desk')}
          className="absolute top-8 left-8 text-white/50 hover:text-white uppercase tracking-widest text-sm cursor-pointer z-20"
        >
          ← Back to Desk
        </button>

        <div className="m-auto w-full max-w-2xl relative z-10 flex flex-col items-center">
          <h2 className="font-serif text-4xl mb-8 opacity-80 text-center">Locked Drawer</h2>
          
          <div 
            onClick={handleUnlock}
            className="w-full max-w-xs sm:w-64 h-32 border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <span className="font-serif uppercase tracking-widest opacity-70">
              {state.flags.drawerUnlocked ? 'Open Drawer' : 'Locked Drawer'}
            </span>
            {!state.flags.drawerUnlocked && (
              <span className="text-xs text-white/40 mt-2 font-mono">Requires Key</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
