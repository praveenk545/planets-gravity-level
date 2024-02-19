import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { BounceBall } from './ball';
import { BallService } from '../ball.service';

const GRAVITY = 0.1;

const COLOR = 'deepskyblue';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.css'],
})
export class BallComponent implements OnInit, OnDestroy {
  @Input() ball: BounceBall | any;
  color!: string;
  gravity!: number;
  isStarted: boolean = false;
  constructor(private ballService: BallService) {}
  getBall() {
    return this.ball;
  }
  ngOnInit() {
    this.ball = this.ballService.getBall(COLOR, GRAVITY);
  }

  start() {
    this.isStarted = true;
    this.move();
  }

  move() {
    this.ball = this.ballService.getBall(this.color, this.gravity);
    this.ball.addStyle();
  }

  stop() {
    this.isStarted = false;
    this.ball.removeStyle();
    this.ball = null;
  }

  ngOnDestroy() {
    this.stop();
  }

  onColorChange(color: string) {
    var el: any | null = document.getElementById('ball');
    el.style.backgroundColor = color;
  }
}
