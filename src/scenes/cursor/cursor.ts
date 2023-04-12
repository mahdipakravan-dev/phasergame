import Phaser from "phaser";
import {AvailableThings} from "./index";

export class CursorHandler {
    constructor(public cursors : Phaser.Types.Input.Keyboard.CursorKeys , public things : AvailableThings) {
        this.handle()
    }

    handle() {}
}