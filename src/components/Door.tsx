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
      className="w-full h-full flex flex-col items-center justify-center relative"
    >
      <button 
        onClick={() => changeView('room')}
        className="absolute top-8 left-8 text-white/50 hover:text-white uppercase tracking-widest text-sm cursor-pointer"
      >
        ← Back to Room
      </button>

      <h2 className="font-serif text-4xl mb-8 opacity-80">The Door</h2>
      
      <div 
        onClick={handleInteract}
        className="w-48 h-80 border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
      >
        <span className="font-serif uppercase tracking-widest opacity-70 text-center px-4">
          {state.flags.doorUnlocked ? 'Open Door' : 'Bound Door'}
        </span>
      </div>
    </motion.div>
  );
}
