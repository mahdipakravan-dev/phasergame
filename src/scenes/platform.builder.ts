import Phaser from "phaser";

type Platform = Phaser.Physics.Arcade.StaticGroup;
export class PlatformBuilder{
    private _assets ?: string;
    constructor(protected _platform ?: Platform) {
    }
    static clone(physic : Platform) {
        return new PlatformBuilder(physic);
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
        this._platform?.refresh()
        return this._platform;
    }
}
