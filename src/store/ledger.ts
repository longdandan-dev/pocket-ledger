import { create } from "zustand";

export interface LedgerItem {
  id: string;
  title: string;
  amountCents: number;
  category: string;
  date: string;
}

interface LedgerState {
  items: LedgerItem[];
  addItem: (item: LedgerItem) => void;
}

export const useLedger = create<LedgerState>()((set) => ({
  items: [
    {
      id: "l1",
      title: "午饭",
      amountCents: -2800,
      category: "餐饮",
      date: "2026-10-11",
    },
    {
      id: "l2",
      title: "地铁",
      amountCents: -400,
      category: "交通",
      date: "2026-10-11",
    },
    {
      id: "l3",
      title: "工资",
      amountCents: 820000,
      category: "工资",
      date: "2026-10-11",
    },
  ],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
