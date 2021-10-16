import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

type Coordinate = {
  x: number,
  y: number
}

@Component({
  selector: 't-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-progress.component.html',
  styleUrls: ['./t-progress.component.scss']
})
export class TProgressComponent {

  @Input()
  public progress: number = 0;

  @Input()
  public radius: number = 0;

  @Input()
  color: string = "gray";

  get circleSize() {
    return this.radius * 2;
  }

  get paths() {
    let dest = [];
    let currentPercentage = 0;
    let chunks = this.chunkArc(this.progress);
    for (let i = 0; i < chunks.length; i++) {
      let arc = this.getPath(chunks[i], currentPercentage);

      currentPercentage += chunks[i];
      dest.push(arc);
    }

    return dest;
  }

  getPath(chunkPercent: number, currentPercent:number): string {
    let prevOuter = this.positionFromCurrentPercentage(currentPercent);
    let position = this.positionFromCurrentPercentage(currentPercent + chunkPercent);

    let path = 'M ' + prevOuter.x + ' ' + prevOuter.y +
      ' A ' + this.radius + ' ' + this.radius + ', 0, 0, 1, ' + position.x + ' ' + position.y +
      ' L ' + this.radius + ' ' + this.radius + ' Z'

    return path;
  }

  positionFromCurrentPercentage(percent: number): Coordinate {
    let angle = (Math.PI * percent / 50);
    let x = this.radius * (1 + Math.cos(angle));
    let y = this.radius * (1 + Math.sin(angle));

    return {
      x: Math.round(x),
      y: Math.round(y)
    };
  }

  chunkArc (percent: number, size=20): Array<number> {
    let res = []

    for (let i = 0; i < Math.ceil(percent / size); i++) {
      let arcPercentage;

      if (percent < (i + 1) * size) {
        arcPercentage = percent - i * size;
      } else {
        arcPercentage = size;
      }

      res.push(arcPercentage);
    }

    return res;
  }
}
