import {Component, Input} from '@angular/core';
import {IAccount} from "../../data-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-dropdown',
  templateUrl: './chat-dropdown.component.html',
  styleUrls: ['./chat-dropdown.component.css']
})
export class ChatDropdownComponent {

  @Input()
  private account:IAccount;

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/login']);
  }

  edit() {
  }
}
