import { GameObject } from './game-object';

export class SnakePart extends GameObject {

    private newPart: SnakePart = null;

    constructor(size: number, xinit: number, yinit: number) {
        super(size, xinit, yinit);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.newPart !== null) {
            this.newPart.draw(ctx);
        }
        ctx.fillStyle = '#0000FF';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    public setX(x: number): void {
        if (this.newPart !== null) {
            this.newPart.setX(this.x);
        }
        super.setX(x);
    }

    public setY(y: number): void {
        if (this.newPart !== null) {
            this.newPart.setY(this.y);
        }
        super.setY(y);
    }

    addNew() {
        if (this.newPart === null) {
            this.newPart = new SnakePart(this.size, this.x, this.y);
        } else {
            this.newPart.addNew();
        }
    }

    get new(): SnakePart {
        return this.newPart;
    }
}
