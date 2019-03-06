import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AppService} from '../app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
  };

  constructor(private fb: FormBuilder, private service: AppService) {

  }

  ngOnInit() {

  }

  save() {
    this.error = {
      user: '',
      pass: '',
      rePass: '',
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
}
