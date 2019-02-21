import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private service: AppService) {

  }

  ngOnInit() {

  }

  save() {

  }
}
