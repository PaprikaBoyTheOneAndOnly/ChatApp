import {Component, Input} from '@angular/core';
import {IAccount, Icon, IFile} from "../../data-model";
import {DomSanitizer} from "@angular/platform-browser";
import {ChatService} from "../../services/app.chat-service";
import * as fileSaver from 'file-saver';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  @Input() private file: IFile;
  @Input() private account: IAccount;
  private icon = Icon;

  error: string;

  constructor(private sanitizer: DomSanitizer,
              private service: ChatService) {
  }

  wasSent(): string {
    if (this.file.to === this.account.username) {
      return '1';
    } else {
      return '0';
    }
  }

  downloadFile() {
    this.service.downloadFile(
      this.file.filename,
      this.file.originalFilename,
      this.file.mediaType
    ).subscribe(response => {
      const filename = response.headers.get('filename');
      const blob = new Blob([response.body], {type: 'text/csv; charset=utf-8'});
      fileSaver.saveAs(blob, filename);
    }, err => {
      this.parseErrorBlob(err)
    });
  }

  parseErrorBlob(err: HttpErrorResponse) {
    const reader: FileReader = new FileReader();

    new Observable((observer: any) => {
      reader.onloadend = (e) => {
        observer.error(reader.result);
        observer.complete();
      }
    }).subscribe(null, err => this.error = err);
    reader.readAsText(err.error);
  }

  delete() {
    console.log('delete');
    this.service.deleteFile(this.file.filename);
  }
}
