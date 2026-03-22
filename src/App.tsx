/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { GameState, INITIAL_STATE, View, Item } from './types';
import { Intro } from './components/Intro';
import { Room } from './components/Room';
import { Desk } from './components/Desk';
import { Typewriter } from './components/Typewriter';
import { Drawer } from './components/Drawer';
import { Bookshelf } from './components/Bookshelf';
import { Mirror } from './components/Mirror';
import { Door } from './components/Door';
import { Outro } from './components/Outro';
import { Inventory } from './components/Inventory';
import { DialogueBox } from './components/DialogueBox';
import { SoundManager } from './components/SoundManager';

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('writers_room_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Basic validation: ensure it has the required keys
        if (parsed.view && parsed.inventory && parsed.flags) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved game state', e);
      }
    }
    return INITIAL_STATE;
  });
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    if (state.view === 'outro') {
      localStorage.removeItem('writers_room_save');
    } else {
      localStorage.setItem('writers_room_save', JSON.stringify(state));
    }
  }, [state]);

  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      localStorage.removeItem('writers_room_save');
      setState(INITIAL_STATE);
    }
  };

  const changeView = (view: View) => {
    setState(prev => ({ ...prev, view }));
  };

  const addMessage = (msg: string) => {
    setState(prev => ({ ...prev, messages: [...prev.messages, msg] }));
  };

  const updateFlag = (flag: keyof GameState['flags'], value: boolean) => {
    setState(prev => ({ ...prev, flags: { ...prev.flags, [flag]: value } }));
  };

  const addItem = (item: Item) => {
    if (!state.inventory.includes(item)) {
      setState(prev => ({ ...prev, inventory: [...prev.inventory, item] }));
    }
  };

  const renderView = () => {
    switch (state.view) {
      case 'intro': return <div key="intro" className="w-full h-full"><Intro changeView={changeView} onUnlock={() => setIsAudioUnlocked(true)} isAudioUnlocked={isAudioUnlocked} /></div>;
      case 'room': return <div key="room" className="w-full h-full"><Room state={state} changeView={changeView} addMessage={addMessage} /></div>;
      case 'desk': return <div key="desk" className="w-full h-full"><Desk state={state} changeView={changeView} addMessage={addMessage} /></div>;
      case 'typewriter': return <div key="typewriter" className="w-full h-full"><Typewriter state={state} changeView={changeView} addMessage={addMessage} updateFlag={updateFlag} addItem={addItem} /></div>;
      case 'drawer': return <div key="drawer" className="w-full h-full"><Drawer state={state} changeView={changeView} addMessage={addMessage} updateFlag={updateFlag} addItem={addItem} /></div>;
      case 'bookshelf': return <div key="bookshelf" className="w-full h-full"><Bookshelf state={state} changeView={changeView} addMessage={addMessage} updateFlag={updateFlag} addItem={addItem} /></div>;
      case 'mirror': return <div key="mirror" className="w-full h-full"><Mirror state={state} changeView={changeView} addMessage={addMessage} updateFlag={updateFlag} addItem={addItem} /></div>;
      case 'door': return <div key="door" className="w-full h-full"><Door state={state} changeView={changeView} addMessage={addMessage} updateFlag={updateFlag} addItem={addItem} /></div>;
      case 'outro': return <div key="outro" className="w-full h-full"><Outro /></div>;
      default: return null;
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#050505]">
      <div className="noise-overlay" />
      <div className="vignette" />
      <div className="scanline" />

      <SoundManager 
        view={state.view} 
        isUnlocked={isAudioUnlocked} 
        onUnlock={() => setIsAudioUnlocked(true)} 
      />

      {state.view !== 'intro' && state.view !== 'outro' && (
        <>
          <Inventory items={state.inventory} />
          <DialogueBox messages={state.messages} />
          <button 
            onClick={resetGame}
            className="fixed bottom-4 right-4 z-[100] text-[8px] uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors"
          >
            Reset Progress
          </button>
        </>
      )}

      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>
    </div>
  );
}

