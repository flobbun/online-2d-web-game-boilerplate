import { MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { ClassProperties } from "../types";

export type GameStateProperties = ClassProperties<GameState>;

export class GameState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}