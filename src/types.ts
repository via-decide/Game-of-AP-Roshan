export type View = 'room' | 'desk' | 'typewriter' | 'drawer' | 'bookshelf' | 'mirror' | 'door' | 'intro' | 'outro';
export type Item = 'torn_note' | 'small_key' | 'glass_shard' | 'book_of_regrets' | 'lighter';

export interface GameState {
  view: View;
  inventory: Item[];
  flags: {
    clothRemoved: boolean;
    mirrorBroken: boolean;
    drawerUnlocked: boolean;
    typewriterSolved: boolean;
    doorUnlocked: boolean;
    readNote: boolean;
    readBook: boolean;
    litCandle: boolean;
  };
  messages: string[];
}

export const INITIAL_STATE: GameState = {
  view: 'intro',
  inventory: [],
  flags: {
    clothRemoved: false,
    mirrorBroken: false,
    drawerUnlocked: false,
    typewriterSolved: false,
    doorUnlocked: false,
    readNote: false,
    readBook: false,
    litCandle: false,
  },
  messages: ["The air is stale. You don't remember how you got here."],
};
