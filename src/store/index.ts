import { People, Planet, Starship } from "@/utils/types"
import { create } from "zustand"

export interface ResultState {
  result: People | Starship | Planet | null
  setResult: (result: People | Starship | Planet ) => void
}

export const useResultStore = create<ResultState>()((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}))
