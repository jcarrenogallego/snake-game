import { GameObject } from './game-object';

export class Cake extends GameObject {

    constructor(size: number) {
        super(size, 0, 0);
        this.x = this.generate();
        this.y = this.generate();
    }

    generate(): number {
        return Math.floor(Math.random() * 59) * 10;
    }

    relocate(): void {
        this.x = this.generate();
        this.y = this.generate();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
