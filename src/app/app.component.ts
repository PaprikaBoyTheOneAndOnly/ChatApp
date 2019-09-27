import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getServerPort, IConfigState} from './store/app.configurations';
import {Store} from '@ngrx/store';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isServerResponding: boolean;
  private waitAndLoad = true;
  stopLoading = new ReplaySubject<boolean>();

  constructor(private httpClient: HttpClient,
              private store: Store<IConfigState>) {
  }

// https://tburleson-layouts-demos.firebaseapp.com/#/docs
  ngOnInit(): void {
    let sub$ = new ReplaySubject();
    this.store.select(getServerPort)
      .pipe(takeUntil(sub$))
      .subscribe(port => {
        this.httpClient.get<any>(`//localhost:${port}/healthz`).subscribe(response => {
        }, response => {
          this.isServerResponding = response.error.text !== undefined;
          this.waitAndLoad = false;
          this.stopLoading.next(true);
          this.stopLoading.complete();
          sub$.next(true);
          sub$.complete();
        });
      });
  }

}
