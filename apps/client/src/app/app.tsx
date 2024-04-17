import { useGameStore } from "../stores/game.store";
import { GAME_CONTAINER, GameConfig } from "../constants/game.config";
import { Game } from "phaser";
import useNetwork from "@/hooks/useNetwork";
import { useEffect } from "react";

export function App() {
  new Game(GameConfig);

  return (
    <div id={GAME_CONTAINER}>
      <GameUI/>
    </div>
  );
}

const GameUI = () => {
  const incrementScore = useGameStore((state) => state.incrementScore)
  const { createGame } = useNetwork();

  useEffect(() => {
    (async () => {
      const room = await createGame();
      console.log("New Room: ", room);
    })();
  }, [createGame]);

  return (
    <div className="flex justify-between">
      <button onClick={() => incrementScore()}>Click me</button>
      Player score: {useGameStore((state) => state.score)}
    </div>
  )
}

export default App;
