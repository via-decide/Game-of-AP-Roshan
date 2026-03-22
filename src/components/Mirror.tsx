import { motion } from 'motion/react';
import { GameState, View, Item } from '../types';

interface MirrorProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
  updateFlag: (flag: keyof GameState['flags'], value: boolean) => void;
  addItem: (item: Item) => void;
}

export function Mirror({ state, changeView, addMessage, updateFlag, addItem }: MirrorProps) {
  const handleInteract = () => {
    if (!state.flags.clothRemoved) {
      addMessage("You pull the heavy cloth off the mirror. A thick layer of grime obscures your reflection.");
      updateFlag('clothRemoved', true);
      return;
    }

    if (!state.flags.mirrorBroken) {
      if (state.inventory.includes('lighter')) {
        addMessage("You use the lighter to see better. The reflection isn't yours. It's... a monster. You smash the glass in panic! A shard falls to the floor.");
        updateFlag('mirrorBroken', true);
        addItem('glass_shard');
      } else {
        addMessage("It's too dark to see anything clearly in the grime. You need a light source.");
      }
      return;
    }

    addMessage("The mirror is shattered. You don't want to look at the pieces.");
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

      <h2 className="font-serif text-4xl mb-8 opacity-80">The Mirror</h2>
      
      <div 
        onClick={handleInteract}
        className={`w-48 h-64 border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm ${state.flags.mirrorBroken ? 'border-dashed' : ''}`}
      >
        <span className="font-serif uppercase tracking-widest opacity-70 text-center px-4">
          {!state.flags.clothRemoved ? 'Covered Mirror' : state.flags.mirrorBroken ? 'Shattered Mirror' : 'Grime-covered Mirror'}
        </span>
      </div>
    </motion.div>
  );
}
