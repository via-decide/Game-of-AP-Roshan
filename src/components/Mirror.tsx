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
          <h2 className="font-serif text-4xl mb-8 opacity-80 text-center">The Mirror</h2>
          
          <div 
            onClick={handleInteract}
            className={`w-full max-w-xs sm:w-48 h-48 sm:h-64 border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm ${state.flags.mirrorBroken ? 'border-dashed' : ''}`}
          >
            <span className="font-serif uppercase tracking-widest opacity-70 text-center px-4">
              {!state.flags.clothRemoved ? 'Covered Mirror' : state.flags.mirrorBroken ? 'Shattered Mirror' : 'Grime-covered Mirror'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
