import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {AppService} from "../app.service";

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
  }

  login() {
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;

    if (username && password) {
      this.error = '';
      this.service.validateInput(username, password).subscribe(
        response => {
          if (response) {
            localStorage.setItem('Account', JSON.stringify(response));
            window.location.assign("user")
          } else
            this.error = "Please enter a valid username/password";
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.error = 'Please fill all gaps';
    }
  }

}
