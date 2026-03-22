import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DialogueBoxProps {
  messages: string[];
}

export function DialogueBox({ messages }: DialogueBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl z-30 pointer-events-none px-4">
      <div 
        ref={containerRef}
        className="h-32 overflow-y-auto flex flex-col gap-2 p-4"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
        }}
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: idx === messages.length - 1 ? 1 : 0.4, y: 0 }}
              className="font-serif text-base md:text-lg text-center tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
