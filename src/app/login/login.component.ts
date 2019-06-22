import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {AccountService} from '../services/app.account-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group(
    {
      username: new FormControl(''),
      password: new FormControl('')
    });
  error = '';

  constructor(private fb: FormBuilder,
              private service: AccountService) {
  }

  ngOnInit() {
    localStorage.removeItem('account');
    this.service.subscribe({
      next: value => {
        localStorage.setItem('account', JSON.stringify(value));
        window.location.assign('user');
      },
      error: err => {
        this.error = err;
      },
      complete: () => {
      },
    });
  }

  onLoginClicked() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (username && password) {
      this.error = '';
      this.service.validateLogin({username, password, loggedIn: null, uuid: ''});
    } else {
      this.error = 'Please fill all gaps';
    }
  }

  signIn() {
    window.location.assign('sign');
  }

  ngOnDestroy() {
    console.log('service disconnect: ');
    this.service.disconnect();
  }
}
