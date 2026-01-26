"use client";

import { createContext, useContext } from "react";
import { Game } from "@/types/games";

const GameContext = createContext<Game | null>(null);

export interface GameContextProviderProps {
  game?: Game;
  children: React.ReactNode;
}

export function GameContextProvider({
  game,
  children,
}: GameContextProviderProps) {
  return (
    <GameContext.Provider value={game || null}>{children}</GameContext.Provider>
  );
}

export function useActiveGame() {
  const game = useContext(GameContext);

  return game;
}
