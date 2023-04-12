import Phaser from "phaser";
import {CursorHandler} from "./cursor";

export class PlayerCursor extends CursorHandler{

    handle() {
        const {cursors,things : {player}} = this
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown)
        {
            player.setVelocityY(-200);
        }
    }
}