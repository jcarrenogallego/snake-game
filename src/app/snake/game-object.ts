export abstract class GameObject {

    protected size: number;
    protected x: number;
    protected y: number;

    constructor(size: number, xinit: number, yinit: number) {
        this.size = size;
        this.x = xinit;
        this.y = yinit;
    }

    crash(gobj: GameObject): boolean {
        const xdiff = Math.abs(this.x - gobj.x);
        const ydiff = Math.abs(this.y - gobj.y);

        return xdiff >= 0 && xdiff < this.size && ydiff >= 0 && ydiff < this.size;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}
