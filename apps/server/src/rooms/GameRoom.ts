import { Room, Client, ClientArray } from "colyseus";
import { GameState, Player, EventTypes } from "@common";
import { Colors, colorize, log } from "../lib/log";

export class GameRoom extends Room<GameState> {

  /*±±±±± Lifecycle events ±±±±±*/

  onCreate() {
    this.setState(new GameState());

    this.onMessage(EventTypes.INCREASE_SCORE, (client, cardId) => this.onIncreaseScore(client, this.state));
  }

  onJoin(client: Client, { username }: { username: string }) {
    const player = new Player();
    player.id = client.sessionId;
    this.state.players.set(client.sessionId, player);
    log(`Player ${player.id} has joined`);
  }

  onLeave(client: Client<this["clients"] extends ClientArray<infer U, any> ? U : never, this["clients"] extends ClientArray<infer _, infer U> ? U : never>, consented?: boolean): void | Promise<any> {
    this.state.players.delete(client.sessionId);
  }

  /*±±±±± Custom events ±±±±±*/

  onIncreaseScore(client: Client, state: GameState) {
    const player = state.players.get(client.sessionId);
    if (!player) return;

    player.increaseScore();
    log(`Player ${player.id} has increased score to ${colorize(player.score, Colors.YELLOW)}`);
  }
}