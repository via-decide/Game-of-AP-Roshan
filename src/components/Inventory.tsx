import { Item } from '../types';

interface InventoryProps {
  items: Item[];
}

const itemNames: Record<Item, string> = {
  torn_note: 'Torn Note',
  small_key: 'Small Key',
  glass_shard: 'Glass Shard',
  book_of_regrets: 'Book of Regrets',
  lighter: 'Lighter'
};

export function Inventory({ items }: InventoryProps) {
  if (items.length === 0) return null;

  return (
    <div className="absolute top-8 right-8 z-30 flex flex-col items-end pointer-events-none">
      <h3 className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Inventory</h3>
      <div className="flex flex-col gap-2 items-end">
        {items.map((item, idx) => (
          <div key={idx} className="border border-white/20 px-4 py-2 bg-black/50 backdrop-blur-sm">
            <span className="font-serif text-sm uppercase tracking-widest opacity-80">{itemNames[item]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
