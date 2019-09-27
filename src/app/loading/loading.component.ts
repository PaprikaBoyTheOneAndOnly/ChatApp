import {Component, Input, OnInit} from '@angular/core';
import {interval, Observable, Observer, ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  private rotation = 0;
  private canvasSize = 100;
  private growBigger = true;

  @Input()
  private takeUntil: ReplaySubject<boolean>;


  constructor() {
  }

  ngOnInit() {
    interval(10)
      .pipe(takeUntil(this.takeUntil))
      .subscribe(x => {
        this.rotation += 2;
        if (this.rotation == 360) {
          this.rotation = 0;
        }

        if (this.growBigger) {
          this.canvasSize += 1;
        } else {
          this.canvasSize -= 1;
        }
        if (this.canvasSize > 200 || this.canvasSize < 100) {
          this.growBigger = !this.growBigger;
        }
      });
  }

}
