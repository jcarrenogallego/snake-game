import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SnakePart } from './snake';
import { Cake } from './cake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.sass']
})
export class SnakeComponent implements OnInit, AfterViewInit {

  private velocity = 30;
  private sizeObs = 10;
  private snake: SnakePart = new SnakePart(this.sizeObs, 20, 20);
  private cake = new Cake(this.sizeObs);
  private moveInXAxis = true;
  private moveInYaXis = true;
  private xdir = 0;
  private ydir = 0;
  private keyUp = 38;
  private keyDown = 40;
  private keyRigth = 37;
  private keyLeft = 39;

  constructor() { }

  ngOnInit() {
  }

  private main(): (...args: any[]) => void {
    return () => {
      this.drawCanvas();
      this.crashSnakeItSelf();
      this.crashSnakeWitWall();
      this.move();
      if (this.snake.crash(this.cake)) {
        this.cake.relocate();
        this.snake.addNew();
      }
    };
  }

  ngAfterViewInit(): void {
    document.body.onkeydown = this.control();
    this.drawCanvas();
    setInterval( this.main(), this.velocity);
  }

  private control(): (this: GlobalEventHandlers, ev: KeyboardEvent) => any {
    return (ev) => {
      const cod = ev.keyCode;

      this.handlerInXaxisSnakeMovement(cod);

      this.handlerInYAxisSnakeMovement(cod);
    };
  }

  private handlerInYAxisSnakeMovement(cod: number) {
    if (this.moveInYaXis) {
      this.moveSnakeToRigth(cod);
      if (this.keyLeft === cod) {
        this.moveSnakeToLeft();
      }
    }
  }

  private moveSnakeToLeft() {
    this.xdir = this.sizeObs;
    this.moveSnakeInXAxis();
  }

  private moveSnakeToRigth(cod: number) {
    if (this.keyRigth === cod) {
      this.xdir = -this.sizeObs;
      this.moveSnakeInXAxis();
    }
  }

  private moveSnakeInXAxis() {
    this.ydir = 0;
    this.moveInYaXis = false;
    this.moveInXAxis = true;
  }

  private handlerInXaxisSnakeMovement(cod: number) {
    if (this.moveInXAxis) {
      if (this.keyUp === cod) {
        this.moveSnakeToUp();
      }
      if (this.keyDown === cod) {
        this.moveSnakeToDown();
      }
    }
  }

  private moveSnakeToDown() {
    this.ydir = this.sizeObs;
    this.moveSnakeInYAxis();
  }

  private moveSnakeInYAxis() {
    this.xdir = 0;
    this.moveInXAxis = false;
    this.moveInYaXis = true;
  }

  private moveSnakeToUp() {
    this.ydir = -this.sizeObs;
    this.moveSnakeInYAxis();
  }

  private drawCanvas() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.snake.draw(ctx);
    this.cake.draw(ctx);
  }

  move(): void {
    const nx = this.snake.getX() + this.xdir;
    const ny = this.snake.getY() + this.ydir;
    this.snake.setX(nx);
    this.snake.setY(ny);
  }

  crashSnakeItSelf(): void {
    let temp: SnakePart = null;
    if (this.snake.new) {
      temp = this.snake.new.new;
    }
    while (temp) {
      if (this.snake.crash(temp)) {
        this.gameOver();
      } else {
        temp = temp.new;
      }
    }
  }

  crashSnakeWitWall(): void {
    if (this.snake.getX() < 0 || this.snake.getX() > 590 || this.snake.getY() < 0 || this.snake.getY() > 590) {
      this.gameOver();
    }
  }

  gameOver(): void {
    this.velocity = 80;
    this. sizeObs = 10;
    this.snake = new SnakePart(this.sizeObs, 20, 20);
    this. cake = new Cake(this.sizeObs);
    this. moveInXAxis = true;
    this. moveInYaXis = true;
    this. xdir = 0;
    this. ydir = 0;
    alert('you have lost');
  }

}
