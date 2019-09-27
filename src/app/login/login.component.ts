import {Component} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {AccountService} from '../services/app.account-service';
import {Store} from '@ngrx/store';
import {getAccount, IClientState} from '../store/login.reducer';
import {Router} from '@angular/router';
import {LogInUser} from '../store/login.action';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group(
    {
      username: new FormControl(''),
      password: new FormControl('')
    });
  error = '';

  constructor(private fb: FormBuilder,
              private service: AccountService,
              private store: Store<IClientState>,
              private router: Router) {
    let sub = new ReplaySubject<boolean>();
    this.store.select(getAccount)
      .pipe(takeUntil(sub))
      .subscribe(account => {
        if (account) {
          this.router.navigate(['/user']);
          sub.next(true);
          sub.complete();
        }
      });
  }

  onLoginClicked() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (username && password) {
      this.error = '';
      this.service.isValidLogin({username, password, loggedIn: null, chats: null}).subscribe(
        response => {
          this.store.dispatch(new LogInUser(response));
          this.router.navigate(['/user']);
        }, err => {
          this.error = err.error.message;
        });
    } else {
      this.error = 'Please fill all gaps';
    }
  }

  signIn() {
    this.router.navigate(['/sign']);
  }
}
