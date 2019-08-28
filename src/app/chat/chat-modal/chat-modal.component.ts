import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {AccountService} from '../../services/app.account-service';

@Component({
  selector: 'app-add-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent {
  error: string;

  constructor(private dialogRef: MatDialogRef<ChatModalComponent>,
              private service: AccountService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  close(): void {
    this.dialogRef.close();
  }

  addUser(usernameForm: NgForm) {
    if(usernameForm && usernameForm.valid) {
      const username = usernameForm.form.value.username;
      this.service.isExistingAccount(username).subscribe(
        response => {
          if(response) {
            this.dialogRef.close(username);
          } else {
            this.error = 'User not found!'
          }
        }
      );
    }
  }
}
