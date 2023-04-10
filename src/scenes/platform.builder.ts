import Phaser from "phaser";

type Physic = Phaser.Physics.Arcade.ArcadePhysics
export class PlatformBuilder{
    private _assets ?: string;
    private _platform ?: Phaser.Physics.Arcade.StaticGroup;
    constructor(protected physic : Physic) {
    }
    static clone(physic : Physic) {
        const instance = new PlatformBuilder(physic);
        instance._platform = physic.add.staticGroup();
        return instance
    }

    setAssets(assets : string) {
        this._assets = assets
        return this;
    }

    add(x : number,y : number,scale = 1) {
        this._platform?.create(x, y, this._assets).setScale(scale)
        return this
    }

    build() {
        return this._platform;
    }
}
