import * as Phaser from "phaser";
import {PlayerCursor} from "./player.cursor";

const handlers = [
    PlayerCursor
]

export type AvailableThings = {
    player : Phaser.Physics.Arcade.Sprite
};
export default function handleAllKeys(cursors : Phaser.Types.Input.Keyboard.CursorKeys , things : AvailableThings) {
    handlers.forEach(thing => {
        new thing(cursors,things)
    })
}