import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {AppService} from '../app.service';
import {LoginService} from "../services/app.login-service";
import {Observable} from "rxjs";

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
              private service: AppService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    localStorage.removeItem('account');

    this.loginService.connect( response => {
      console.log(response);
    });
  }



  onLoginClicked() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (username && password) {
      this.error = '';
      this.loginService.validateLogin({username, password, loggedIn: null});
    } else {
      this.error = 'Please fill all gaps';
    }
  }

  signIn() {
    window.location.assign('sign');
  }

  ngOnDestroy() {
    console.log("service disconnect: ")
    this.loginService.disconnect();
  }
}
