import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("string") id: string = "";
    @type("number") score: number = 0;

    increaseScore() {
        this.score++;
    }
}