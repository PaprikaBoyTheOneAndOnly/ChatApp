import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgForm} from '@angular/forms';
import {ChatService} from "../../services/app.chat-service";

@Component({
  selector: 'app-add-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent {
  error: string;

  constructor(private dialogRef: MatDialogRef<ChatModalComponent>,
              private service: ChatService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  close(): void {
    this.dialogRef.close();
  }

  addUser(usernameForm: NgForm) {
    if(usernameForm && usernameForm.valid) {
      this.service.isExistingAccount({
          next: value => {
            this.dialogRef.close(value);
          },
          error: err => {
            this.error = err;
          },
          complete: null
        },
        usernameForm.form.value.username);
    }
  }
}
