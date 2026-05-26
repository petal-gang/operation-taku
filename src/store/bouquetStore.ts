import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { flowers } from "@/data/flowers";

export type NoteData = {
  to: string;
  message: string;
};

type BouquetState = {
  selectedIds: string[];
  note: NoteData;
  toggleFlower: (id: string) => void;
  setNote: (note: Partial<NoteData>) => void;
  hydrateFromShare: (payload: {
    selectedIds: string[];
    note: NoteData;
  }) => void;
  reset: () => void;
  canBuild: () => boolean;
};

const MAX_FLOWERS = flowers.length;
const MAX_MESSAGE_LENGTH = 280;

const initialNote: NoteData = { to: "", message: "" };

export const useBouquetStore = create<BouquetState>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      note: initialNote,

      toggleFlower: (id) => {
        set((state) => {
          const index = state.selectedIds.indexOf(id);
          if (index >= 0) {
            return {
              selectedIds: state.selectedIds.filter((fid) => fid !== id),
            };
          }
          if (state.selectedIds.length >= MAX_FLOWERS) {
            return state;
          }
          return { selectedIds: [...state.selectedIds, id] };
        });
      },

      setNote: (note) => {
        set((state) => ({
          note: {
            ...state.note,
            ...note,
            message:
              note.message !== undefined
                ? note.message.slice(0, MAX_MESSAGE_LENGTH)
                : state.note.message,
          },
        }));
      },

      hydrateFromShare: (payload) =>
        set({
          selectedIds: payload.selectedIds,
          note: payload.note,
        }),

      reset: () =>
        set({
          selectedIds: [],
          note: initialNote,
        }),

      canBuild: () => {
        const { selectedIds, note } = get();
        return selectedIds.length >= 1 && note.message.trim().length > 0;
      },
    }),
    {
      name: "bouquet-builder-v4",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        selectedIds: state.selectedIds,
        note: state.note,
      }),
    },
  ),
);

export { MAX_FLOWERS, MAX_MESSAGE_LENGTH };
