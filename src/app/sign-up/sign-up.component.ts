import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AccountService} from '../services/app.account-service';
import {LogInUser} from '../store/login.action';
import {IClientState} from '../store/login.reducer';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
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
              private service: AccountService,
              private store: Store<IClientState>,
              private router: Router) {
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
        chats: null,
      }).subscribe(
        response => {
          this.store.dispatch(new LogInUser(response));
          this.router.navigate(['/user'])
        }, error => {
          this.error.exists = error.error.message;
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

  back() {
    this.router.navigate(['/login']);
  }
}
