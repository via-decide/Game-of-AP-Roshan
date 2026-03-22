import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { GameState, View, Item } from '../types';

interface TypewriterProps {
  state: GameState;
  changeView: (view: View) => void;
  addMessage: (msg: string) => void;
  updateFlag: (flag: keyof GameState['flags'], value: boolean) => void;
  addItem: (item: Item) => void;
}

export function Typewriter({ state, changeView, addMessage, updateFlag, addItem }: TypewriterProps) {
  const [input, setInput] = useState('');

  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (state.flags.typewriterSolved) {
      addMessage("It's jammed. You can't type anymore.");
      return;
    }

    if (input === 'FORGIVE') {
      addMessage("The carriage returns with a sharp ding. A hidden compartment pops open. You found a small key.");
      updateFlag('typewriterSolved', true);
      addItem('small_key');
    } else {
      addMessage("You type the word, but nothing happens. It feels wrong.");
      setInput('');
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
        onClick={() => changeView('desk')}
        className="absolute top-8 left-8 text-white/50 hover:text-white uppercase tracking-widest text-sm cursor-pointer"
      >
        ← Back to Desk
      </button>

      <h2 className="font-serif text-4xl mb-8 opacity-80">The Typewriter</h2>
      
      <p className="mb-8 text-white/60 max-w-md text-center font-serif">
        An old mechanical typewriter. The paper is blank. It seems to be waiting for a specific word.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input 
          type="text" 
          value={input}
          onChange={handleType}
          disabled={state.flags.typewriterSolved}
          className="bg-transparent border-b border-white/30 text-center text-2xl font-mono text-white/80 focus:outline-none focus:border-white/80 transition-colors w-64 mb-8 uppercase tracking-widest"
          placeholder="TYPE..."
        />
        <button 
          type="submit"
          disabled={state.flags.typewriterSolved || input.length === 0}
          className="border border-white/30 px-8 py-3 uppercase tracking-widest hover:bg-white/10 transition-colors disabled:opacity-30 cursor-pointer"
        >
          Strike Keys
        </button>
      </form>
    </motion.div>
  );
}
