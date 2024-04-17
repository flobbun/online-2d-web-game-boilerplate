import { Client, Room } from "colyseus.js";
import { create } from "zustand";
import { MapSchema } from "@colyseus/schema";
import { GameState, GameStateProperties } from "@common";

export type GameStore = GameStateProperties & {
    score: number;
    incrementScore: () => void;
}

export const useGameStore = create<GameStore>()((set) => ({
    client: Client,
    room: Room<GameState>,
    players: new MapSchema(),
    score: 0,
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
}))