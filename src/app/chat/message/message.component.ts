import {Component, Input} from '@angular/core';
import {IAccount, IMessage} from "../../data-model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() private message: IMessage;
  @Input() private account: IAccount;

  constructor() {
  }

  containsYoutube(): boolean {
    return new RegExp('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\\?v=|\\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?')
      .test(this.message.text);
  }


  wasSent(): string {
    if (this.message.to === this.account.username) {
      return '1';
    } else {
      return '0';
    }
  }


}
