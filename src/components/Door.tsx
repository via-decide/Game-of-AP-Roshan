import { motion } from 'motion/react';
import { GameState, View, Item } from '../types';

interface DoorProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
  updateFlag: (flag: keyof GameState['flags'], value: boolean) => void;
  addItem: (item: Item) => void;
}

export function Door({ state, changeView, addMessage, updateFlag }: DoorProps) {
  const handleInteract = () => {
    if (state.flags.doorUnlocked) {
      changeView('outro');
      return;
    }

    if (state.inventory.includes('glass_shard')) {
      addMessage("You use the sharp glass shard to cut the thick ropes binding the door handle. The door creaks open.");
      updateFlag('doorUnlocked', true);
    } else {
      addMessage("The door is bound tight with thick ropes. You can't untie them with your bare hands.");
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
          <h2 className="font-serif text-4xl mb-8 opacity-80 text-center">The Door</h2>
          
          <div 
            onClick={handleInteract}
            className="w-full max-w-xs sm:w-48 h-64 sm:h-80 border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <span className="font-serif uppercase tracking-widest opacity-70 text-center px-4">
              {state.flags.doorUnlocked ? 'Open Door' : 'Bound Door'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
