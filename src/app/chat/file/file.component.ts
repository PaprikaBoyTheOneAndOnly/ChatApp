import {Component, Input } from '@angular/core';
import {IAccount, Icon, IFile} from "../../data-model";
import {DomSanitizer} from "@angular/platform-browser";
import {ChatService} from "../../services/app.chat-service";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  @Input() private file: IFile;
  @Input() private account: IAccount;
  private icon = Icon;

  constructor(private sanitizer: DomSanitizer,
              private service: ChatService) { }

  wasSent(): string {
    if (this.file.to === this.account.username) {
      return '1';
    } else {
      return '0';
    }
  }

  downloadFile() {
    this.service.downloadFile({
      load: doc => {
        var blob = new Blob([doc.file], {type: "application/pdf"});
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      }
    }, this.file.filename);
  }

}
