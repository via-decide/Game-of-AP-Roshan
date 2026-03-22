import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { View } from '../types';

interface SoundManagerProps {
  view: View;
  isUnlocked: boolean;
  onUnlock: () => void;
}

// Using Pixabay URLs which are generally reliable if handled correctly
const SOUNDS = {
  ambient: 'https://cdn.pixabay.com/audio/2022/10/16/audio_106443166d.mp3',
  clock: 'https://cdn.pixabay.com/audio/2022/03/15/audio_732243e3f0.mp3',
  creak: 'https://cdn.pixabay.com/audio/2022/03/24/audio_779078d061.mp3',
  whisper: 'https://cdn.pixabay.com/audio/2021/08/09/audio_8816d7c353.mp3',
};

export function SoundManager({ view, isUnlocked, onUnlock }: SoundManagerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const clockRef = useRef<HTMLAudioElement | null>(null);
  const creakRef = useRef<HTMLAudioElement | null>(null);
  const whisperRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = () => {
    // Clear existing if retrying
    if (ambientRef.current) {
      [ambientRef, clockRef, creakRef, whisperRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = "";
          ref.current.load();
        }
      });
    }

    console.log('Initializing audio objects...');
    try {
      const createAudio = (src: string, loop = false, volume = 1) => {
        const audio = new Audio();
        // Do NOT use crossOrigin unless specifically needed, as it often causes Error 4
        audio.src = src;
        audio.loop = loop;
        audio.volume = volume;
        audio.preload = 'auto';
        return audio;
      };

      ambientRef.current = createAudio(SOUNDS.ambient, true, 0.2);
      clockRef.current = createAudio(SOUNDS.clock, true, 0.15);
      creakRef.current = createAudio(SOUNDS.creak, false, 0.1);
      whisperRef.current = createAudio(SOUNDS.whisper, false, 0.05);

      // Add error listeners
      [ambientRef, clockRef, creakRef, whisperRef].forEach(ref => {
        if (ref.current) {
          ref.current.onerror = (e) => {
            const audio = ref.current;
            if (audio) {
              console.error(`Failed to load sound: ${audio.src} - Error Code: ${audio.error?.code}`);
              setError(`Audio error (Code ${audio.error?.code}). Tap to retry.`);
            }
          };
        }
      });
    } catch (e) {
      console.error('Audio initialization failed:', e);
      setError('Audio system failed to initialize.');
    }
  };

  const unlock = async () => {
    setError(null);
    initAudio();
    
    const tryPlay = async (audio: HTMLAudioElement | null) => {
      if (!audio) return;
      try {
        await audio.play();
        const isRoomView = ['room', 'desk', 'typewriter', 'drawer', 'bookshelf', 'mirror', 'door'].includes(view);
        if (!isRoomView) {
          audio.pause();
        }
      } catch (e) {
        console.warn('Silent play failed during unlock:', e);
      }
    };

    try {
      console.log('Attempting to play audio to unlock...');
      await Promise.all([
        tryPlay(ambientRef.current),
        tryPlay(clockRef.current)
      ]);
      
      onUnlock();
      console.log('Audio system successfully unlocked');
    } catch (e) {
      console.error('Audio unlock failed:', e);
      setError('Unlock failed. Tap to try again.');
    }
  };

  useEffect(() => {
    const isRoomView = ['room', 'desk', 'typewriter', 'drawer', 'bookshelf', 'mirror', 'door'].includes(view);

    if (isRoomView && isUnlocked && !isMuted) {
      ambientRef.current?.play().catch(e => console.warn('Ambient play failed:', e));
      clockRef.current?.play().catch(e => console.warn('Clock play failed:', e));
      
      const creakInterval = setInterval(() => {
        if (Math.random() > 0.7 && !isMuted) {
          creakRef.current?.play().catch(() => {});
        }
      }, 15000);

      const whisperInterval = setInterval(() => {
        if (Math.random() > 0.8 && !isMuted) {
          whisperRef.current?.play().catch(() => {});
        }
      }, 25000);

      return () => {
        clearInterval(creakInterval);
        clearInterval(whisperInterval);
      };
    } else {
      ambientRef.current?.pause();
      clockRef.current?.pause();
    }
  }, [view, isUnlocked, isMuted, retryCount]);

  // Auto-unlock on any interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!isUnlocked) {
        unlock();
      }
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [isUnlocked, view]);

  useEffect(() => {
    return () => {
      [ambientRef, clockRef, creakRef, whisperRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = "";
          ref.current.load();
        }
      });
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col items-end gap-2">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (!isUnlocked || error) {
            setRetryCount(prev => prev + 1);
            unlock();
          } else {
            setIsMuted(!isMuted);
          }
        }}
        className={`p-3 bg-black/80 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-white flex items-center gap-2 group ${error ? 'border-red-500/50' : ''}`}
      >
        {isMuted || !isUnlocked || error ? <VolumeX size={20} /> : <Volume2 size={20} />}
        {(!isUnlocked || error) && (
          <span className="text-[10px] uppercase tracking-widest pr-2 animate-pulse">
            {error ? 'Retry Audio' : 'Enable Sound'}
          </span>
        )}
      </button>
      {error && (
        <div className="bg-red-900/80 border border-red-500/50 p-2 text-[8px] uppercase tracking-widest text-white/70 max-w-[150px] text-right">
          {error}
        </div>
      )}
    </div>
  );
}
