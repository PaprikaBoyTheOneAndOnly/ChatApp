import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group(
    {
      username: new FormControl(''),
      password: new FormControl('')
    });

  error = '';

  constructor(private fb: FormBuilder, private service: AppService) {
  }

  ngOnInit() {
    localStorage.removeItem('account');
  }

  login() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (username && password) {
      this.error = '';
      this.service.validateInput({username, password, loggedIn: null}).subscribe(
        response => {
          if (response) {
            localStorage.setItem('account', JSON.stringify(response));
            window.location.assign('user');
          } else {
            this.error = 'Please enter a valid username/password';
          }
          },
        error => {
          console.log(error);
        }
      );
    } else {
      this.error = 'Please fill all gaps';
    }
  }

  signIn() {
    window.location.assign('sign');
  }
}
