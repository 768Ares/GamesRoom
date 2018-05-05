import {
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  Component,
  OnInit,
  ViewChild,
  HostListener
} from '@angular/core';
import {
  Statistics
} from '../models/statistics';
import {
  StatisticService
} from '../services/statistics.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, AfterViewInit {

  private canv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private container: any;
  private cw: any;
  private ch: any;
  private gm_seg = 20;
  private board_canv = 30;

  private snake_x = 10;
  private snake_y = 10;
  private direction_x = 1;
  private direction_y = 0;
  private trail = [];
  private snake_segments = 5;
  private snake = this.snake_segments;

  private apple_x = 10;
  private apple_y = 15;

  private h = 0;
  private m = 0;
  private s = 0;
  private hh: string;
  private mm: string;
  private ss: string;

  private eatenApple = 0;
  private time = '00.00.00';
  private myGame: any;

  private statisticsList: Array < Statistics > = [];

  constructor(private statisticService: StatisticService) {
    this.statisticService.getStatisticsListObs().subscribe((statistics: Array < Statistics > ) => {
      this.statisticsList = statistics;
    });
  }

  ngAfterViewInit() {
    this.createCanvas();
    this.myGame = setInterval(() => {
      this.game();
    }, 120);

    setInterval(() => {
      this.timer();
    }, 1000);
    const self = this;
    window.onresize = function (event) {
      self.container = document.getElementById('container');
      try {
        self.container.removeChild(self.canv);
        self.createCanvas();
      } catch {}
    };
  }

  ngOnInit() {}

  createCanvas() {
    this.container = document.getElementById('container');
    this.cw = this.container.clientWidth;
    this.ch = this.container.clientHeight;
    this.canv = document.createElement('canvas');
    this.ctx = this.canv.getContext('2d');
    this.canv.width = this.cw;
    this.canv.height = this.ch;
    this.canv.classList.add('canvasClas');
    this.container.appendChild(this.canv);
    this.gm_seg = this.cw / this.board_canv;
  }

  game() {
    this.snake_x += this.direction_x;
    this.snake_y += this.direction_y;

    this.borderBoard();
    this.drawBoard();
    this.drawSnake();
    this.generateApple();
  }

  gameOver() {
    if (this.eatenApple > 0) {
      if (this.eatenApple > this.statisticsList[0].snakeAple) {
        this.statisticsList[0].snakeAple = this.eatenApple;
        this.statisticService.saveStatisticsListObs();
      }
    }
    this.h = 0;
    this.m = 0;
    this.s = 0;
    this.snake = this.snake_segments;
    this.snake_x = 10;
    this.snake_y = 10;
    this.eatenApple = 0;

  }

  borderBoard() {
    if (this.snake_x < 0) {
      this.direction_x = 1;
      this.direction_y = 0;
      this.gameOver();
    }
    if (this.snake_x > this.board_canv - 1) {
      this.direction_x = -1;
      this.direction_y = 0;
      this.gameOver();
    }
    if (this.snake_y < 0) {
      this.direction_x = 0;
      this.direction_y = 1;
      this.gameOver();
    }
    if (this.snake_y > this.board_canv - 1) {
      this.direction_x = 0;
      this.direction_y = -1;
      this.gameOver();
    }
  }

  drawBoard() {
    this.ctx.fillStyle = '#070707';
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
    }

  drawSnake() {
    // draw body snake
    this.ctx.fillStyle = '#00DD00';
    for (let idx = 0; idx < this.trail.length - 1; idx++) {
      this.ctx.fillRect(this.trail[idx].x * this.gm_seg, this.trail[idx].y * this.gm_seg,
        this.gm_seg - this.gm_seg / 8, this.gm_seg - this.gm_seg / 8);
      if (this.trail[idx].x === this.snake_x && this.trail[idx].y === this.snake_y) {
        this.gameOver();
      }
    }

    // draw head snake
    this.ctx.fillStyle = '#008000';
    const i = this.trail.length - 1;
    if (i >= this.snake - 1) {
      this.ctx.fillRect(this.trail[i].x * this.gm_seg, this.trail[i].y * this.gm_seg,
        this.gm_seg - this.gm_seg / 8, this.gm_seg - this.gm_seg / 8);
      // draw eyes snake
      this.ctx.fillStyle = '#ffffff';
      if (this.direction_x === -1) {
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.55,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.125, this.gm_seg / 4, this.gm_seg / 4);
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.55,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.55, this.gm_seg / 4, this.gm_seg / 4);
      } else if (this.direction_x === 1) {
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.125,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.125, this.gm_seg / 4, this.gm_seg / 4);
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.125,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.55, this.gm_seg / 4, this.gm_seg / 4);
      } else if (this.direction_y === -1) {
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.125,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.55,
          this.gm_seg / 4, this.gm_seg / 4);
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.55,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.55, this.gm_seg / 4, this.gm_seg / 4);
      } else if (this.direction_y === 1) {
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.55,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.125, this.gm_seg / 4, this.gm_seg / 4);
        this.ctx.fillRect(this.trail[i].x * this.gm_seg + this.gm_seg * 0.125,
          this.trail[i].y * this.gm_seg + this.gm_seg * 0.125, this.gm_seg / 4, this.gm_seg / 4);
      }
    }

    this.trail.push({
      x: this.snake_x,
      y: this.snake_y
    });
    while (this.trail.length > this.snake) {
      this.trail.shift();
    }
    }

  generateApple() {
    // random generate x & y apple
    if (this.apple_x === this.snake_x && this.apple_y === this.snake_y) {
      this.snake++;
      this.apple_x = Math.floor(Math.random() * (this.board_canv - 1));
      this.apple_y = Math.floor(Math.random() * (this.board_canv - 1));
      this.eatenApple = this.snake - 5;
    }

    // draw apple
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.apple_x * this.gm_seg, this.apple_y * this.gm_seg, this.gm_seg - 2, this.gm_seg - 2);
  }

  timer() {
    this.s += 1;
    if (this.s >= 60) {
      this.m += 1;
      this.s = 0;
      if (this.m >= 60) {
        this.m = 0;
        this.h += 1;
      }
    }
    if (this.s < 10) {
      this.ss = '0' + this.s;
    } else {
      this.ss = this.s + '';
    }
    if (this.m < 10) {
      this.mm = '0' + this.m;
    } else {
      this.mm = this.m + '';
    }
    if (this.h < 10) {
      this.hh = '0' + this.h;
    } else {
      this.hh = this.h + '';
    }

    this.time = this.hh + ':' + this.mm + ':' + this.ss;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(evt: KeyboardEvent) {
    if (evt.keyCode === 37) {
      if (this.direction_x !== 1) {
        this.direction_x = -1;
        this.direction_y = 0;
      }
    } else if (evt.keyCode === 38) {
      if (this.direction_y !== 1) {
        this.direction_x = 0;
        this.direction_y = -1;
      }
    } else if (evt.keyCode === 39) {
      if (this.direction_x !== -1) {
        this.direction_x = 1;
        this.direction_y = 0;
      }
    } else if (evt.keyCode === 40) {
      if (this.direction_y !== -1) {
        this.direction_x = 0;
        this.direction_y = 1;
      }
    }
  }
}

