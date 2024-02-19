import { Injectable } from '@angular/core';
import { BounceBall } from './ball/ball';
// Try uncommenting the line below :)
// import pad from 'left-pad'; alert(pad);

// Set gravity effect on the ball.
// 1 = Earth, .16 = Moon, 2 = Jupiter.

// Bounce the ball!

@Injectable()
export class BallService {
  getBall(color: string, gravity: number): BounceBall {
    return new BounceBall(color ? color : 'indigo', gravity ? gravity : 1);
  }
  constructor() {}
}
