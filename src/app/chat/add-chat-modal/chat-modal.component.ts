import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent  {

   constructor(private dialogRef: MatDialogRef<ChatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    onNoClick(): void {
      this.dialogRef.close();
  }
}
