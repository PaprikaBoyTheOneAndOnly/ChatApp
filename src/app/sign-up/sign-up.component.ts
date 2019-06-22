import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AccountService} from '../services/app.account-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm = this.fb.group(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

  error = {
    user: '',
    pass: '',
    rePass: '',
    exists: '',
  };

  constructor(private fb: FormBuilder,
              private service: AccountService) {

  }

  ngOnInit() {
    this.service.subscribe({
      next: response => {
          localStorage.setItem('account', JSON.stringify(response));
          window.location.assign('user');
      },
      error: err => {
        this.error.exists = err;
      },
      complete: () => {
      }
    });
  }

  save() {
    this.error = {
      user: '',
      pass: '',
      rePass: '',
      exists: '',
    };

    if (this.signUpForm.invalid) {
      if (this.signUpForm.get('username').errors) {
        this.error.user = 'Username must have at least 5 digits';
      }
      if (this.signUpForm.get('password').errors) {
        this.error.pass = 'password must have at least 8 digits';
      }
      if (this.signUpForm.get('rePassword').value !== this.signUpForm.get('password').value) {
        this.error.rePass = 'Both password fields must have the same value';
      }
    } else {
      this.service.createAccount({
        username: this.signUpForm.get('username').value,
        password: this.signUpForm.get('password').value,
        loggedIn: false,
        uuid: '',
        chats: [],
      });
    }
  }

  passChanges(event: any) {
    if (event === 'rePass') {
      this.signUpForm.get('rePassword').markAsTouched();
    }
    if (this.signUpForm.get('rePassword').value !== this.signUpForm.get('password').value && this.signUpForm.get('rePassword').touched) {
      this.error.rePass = 'Both password fields must have the same value';
    } else {
      this.error.rePass = '';
    }
  }

  ngOnDestroy() {
    this.service.disconnect();
  }

  back() {
    window.location.assign('login');
  }
}
